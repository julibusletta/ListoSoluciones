'use server'

import { cookies } from 'next/headers'
import clientPromise from '@/lib/mongodb'
import { put } from '@vercel/blob'
import { ObjectId } from 'mongodb'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const user = formData.get('username')
  const pass = formData.get('password')

  const validPass = process.env.ADMIN_PASSWORD || 'listo2025'

  if (user === 'admin' && pass === validPass) {
    const cookieStore = await cookies()
    cookieStore.set('admin_session', 'logged_in_true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })
    return { success: true }
  } else {
    return { error: 'Usuario o contraseña incorrectos.' }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  redirect('/admin/login')
}

export async function getObras() {
  const client = await clientPromise
  const db = client.db("listosoluciones")
  const obras = await db.collection("obras").find({}).toArray()
  // Convert _id to string for Client Components
  return obras.map((obra: any) => ({ ...obra, _id: obra._id.toString() }))
}

export async function getObra(id: string) {
  const client = await clientPromise
  const db = client.db("listosoluciones")
  const obra = await db.collection("obras").findOne({ _id: new ObjectId(id) })
  if (obra) {
    return { ...obra, _id: obra._id.toString() }
  }
  return null
}

export async function saveObra(formData: FormData) {
  const id = formData.get('id')?.toString()
  const titulo = formData.get('titulo')?.toString() || ''
  const descripcion = formData.get('descripcion')?.toString() || ''
  
  // existing images passed as comma-separated string
  const existingImagesStr = formData.get('existingImages')?.toString() || ''
  const imagenes = existingImagesStr ? existingImagesStr.split(',').filter(i => i.trim() !== '') : []

  // handle new file uploads
  const files = formData.getAll('newImages') as File[]
  for (const file of files) {
    if (file.size > 0) {
      // Upload to Vercel Blob
      try {
        const blob = await put(file.name, file, { access: 'public' })
        imagenes.push(blob.url)
      } catch (err) {
        console.error("Error uploading to Blob:", err)
      }
    }
  }

  const client = await clientPromise
  const db = client.db("listosoluciones")
  
  const obraData = {
    titulo,
    descripcion,
    imagenes
  }

  if (id && id !== 'new') {
    await db.collection("obras").updateOne(
      { _id: new ObjectId(id) },
      { $set: obraData }
    )
  } else {
    // get max id to keep the 'id' field in sync (legacy field)
    const all = await db.collection("obras").find({}).sort({id: -1}).limit(1).toArray()
    const newIdNum = all.length > 0 ? (all[0].id || 0) + 1 : 1
    await db.collection("obras").insertOne({
      ...obraData,
      id: newIdNum
    })
  }

  redirect('/admin')
}

export async function deleteObra(id: string) {
  const client = await clientPromise
  const db = client.db("listosoluciones")
  await db.collection("obras").deleteOne({ _id: new ObjectId(id) })
  redirect('/admin')
}

import { getObras, logout, deleteObra } from '@/app/actions'
import Link from 'next/link'

export default async function AdminPage() {
  const obras = await getObras()

  // Sort strictly by id descending to show newest first
  obras.sort((a: any, b: any) => b.id - a.id)

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Panel de Administración - Obras</h2>
        <div>
          <Link href="/admin/editar/new" className="btn btn-success me-2">
            + Nueva Obra
          </Link>
          <form action={logout} style={{ display: 'inline' }}>
            <button type="submit" className="btn btn-outline-danger">Cerrar Sesión</button>
          </form>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Imágenes</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {obras.map((obra: any) => (
              <tr key={obra._id}>
                <td>{obra.id}</td>
                <td>{obra.titulo}</td>
                <td>{obra.imagenes?.length || 0} fotos</td>
                <td className="text-end">
                  <Link href={`/admin/editar/${obra._id}`} className="btn btn-sm btn-primary me-2">
                    Editar
                  </Link>
                  <form action={async () => {
                    'use server'
                    await deleteObra(obra._id)
                  }} style={{ display: 'inline' }}>
                    <button type="submit" className="btn btn-sm btn-danger">
                      Eliminar
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {obras.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4">No hay obras registradas.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

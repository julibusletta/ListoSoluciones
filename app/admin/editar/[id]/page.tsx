import { getObra, saveObra } from '@/app/actions'
import Link from 'next/link'

export default async function EditarObraPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const isNew = id === 'new'
  
  let obra: any = null
  if (!isNew) {
    obra = await getObra(id)
  }

  return (
    <div className="container py-5">
      <div className="mb-4">
        <Link href="/admin" className="btn btn-secondary">&larr; Volver</Link>
      </div>
      <h2>{isNew ? 'Nueva Obra' : 'Editar Obra'}</h2>
      
      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <form action={saveObra}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="existingImages" value={obra?.imagenes?.join(',') || ''} />

            <div className="mb-3">
              <label className="form-label fw-bold">Título</label>
              <input type="text" name="titulo" className="form-control" defaultValue={obra?.titulo} required />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Descripción (opcional, acepta HTML)</label>
              <textarea name="descripcion" className="form-control" rows={4} defaultValue={obra?.descripcion}></textarea>
            </div>

            {obra?.imagenes && obra.imagenes.length > 0 && (
              <div className="mb-3">
                <label className="form-label fw-bold">Imágenes Actuales</label>
                <div className="d-flex flex-wrap gap-2">
                  {obra.imagenes.map((img: string, i: number) => (
                    <img key={i} src={img.startsWith('http') ? img : `/${img}`} alt="img" style={{height: '100px', width: 'auto', objectFit: 'cover', borderRadius: '5px'}} />
                  ))}
                </div>
                <small className="text-muted">Nota: Para eliminar fotos individuales en esta versión simplificada, debes re-subir la obra, o agregaremos un botón individual más adelante.</small>
              </div>
            )}

            <div className="mb-4">
              <label className="form-label fw-bold">Agregar Nuevas Imágenes</label>
              <input type="file" name="newImages" className="form-control" multiple accept="image/*" />
            </div>

            <button type="submit" className="btn btn-primary">Guardar Obra</button>
          </form>
        </div>
      </div>
    </div>
  )
}

import clientPromise from '@/lib/mongodb';
import fs from 'fs';
import path from 'path';

export default async function Home() {
  let obras = [];
  try {
    const client = await clientPromise;
    const db = client.db("listosoluciones");
    const obrasCollection = db.collection("obras");
    obras = await obrasCollection.find({}).toArray();
    
    // Convert ObjectId to string to avoid passing complex objects to Client Components if any, though this is a Server Component.
    obras = obras.map((obra: any) => ({...obra, _id: obra._id.toString()}));
    
    // Sort by id if available to maintain original order
    if (obras.length > 0 && obras[0].id) {
      obras.sort((a: any, b: any) => a.id - b.id);
    }
    
  } catch (mongoError) {
    console.error("MongoDB no configurado o falló. Leyendo fallback local:", mongoError);
    const dataFilePath = path.join(process.cwd(), 'legacy', 'data', 'obras.json');
    try {
      const fileContents = fs.readFileSync(dataFilePath, 'utf8');
      obras = JSON.parse(fileContents);
    } catch (fsError) {
      console.error("Error reading fallback obras:", fsError);
    }
  }

  return (
    <>
      <section className="hero-section hero-section-full-height">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-12 p-0">
              <div id="hero-slide" className="carousel carousel-fade slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="/images/ea8cd3_ec3fdc766c5344bb9bec770cffd7dddd_mv2_d_1920_1281_s_2 (1).jpg" className="carousel-image img-fluid" alt="..." />
                    <div className="carousel-caption custom-caption">
                      <h2>SOLUCIONES PARA EMPRESAS</h2>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img src="/images/ea8cd3_f50505ad2d934cc9ac6507ed9c991f47_mv2.jpg" className="carousel-image img-fluid" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src="/images/COCHES PATRIMONIALES/cochesrestaurados.jpg" className="carousel-image img-fluid" alt="..." />
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#hero-slide" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Anterior</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#hero-slide" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Siguiente</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-bg" id="section_2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="custom-text-box">
                <h2 className="mb-2">Quienes somos</h2>
                <h5 className="mb-3 texto-destacado">
                  Listo Soluciones es una compañía dedicada a brindar servicio y soporte en el área de obras civiles y mantenimiento integral a empresas.
                </h5>
                <p className="mb-0">
                  Posee una estructura flexible y modular que permite adaptarse a las necesidades de cada requerimiento. Respondiendo así en tiempo y forma a las necesidades de cada uno de nuestros clientes.
                  En la empresa trabajamos con profesionales y técnicos de probada experiencia, capaces de aportar conocimientos que permitan implementar los mejores procedimientos para la realización de cada tarea.
                  Nuestro objetivo es brindar un servicio de óptimas prestaciones poniendo la calidad y la seguridad como premisas fundamentales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" id="section_3">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12 text-center mb-4">
              <h2>Servicios</h2>
            </div>
            <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
              <div className="custom-block-wrap">
                <img src="/images/COCHES PATRIMONIALES/2018-01-22-PHOTO-00005378.jpg" className="custom-block-image img-fluid" alt="" />
                <div className="custom-block">
                  <div className="custom-block-body">
                    <h5 className="mb-3">Obras de Recuperación, Restauración y Rescate</h5>
                    <p><strong>·</strong>&nbsp;Conservación, Rescate y Restauraciones<br /><strong>·</strong>&nbsp;Mantenimiento restaurativo<br /><strong>·</strong>&nbsp;Puesta en Valor</p>
                  </div>
                  <div className="custom-btn-placeholder" style={{ height: '48px' }}></div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
              <div className="custom-block-wrap">
                <img src="/images/proyecto bariloche/IMG_6312.JPEG" className="custom-block-image img-fluid" alt="" />
                <div className="custom-block">
                  <div className="custom-block-body">
                    <h5 className="mb-3">Obras Civiles</h5>
                    <p><strong>·</strong>&nbsp;Construcciones en general<br /><strong>·</strong>&nbsp;Reformas de obras<br /><strong>·</strong>&nbsp;Construcciones en seco</p>
                  </div>
                  <div className="custom-btn-placeholder" style={{ height: '48px' }}></div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="custom-block-wrap">
                <img src="/images/ALLIANZ/allianz.png" className="custom-block-image img-fluid" alt="" />
                <div className="custom-block">
                  <div className="custom-block-body">
                    <h5 className="mb-3">Mantenimiento Integral de Empresas</h5>
                    <p><strong>·</strong>&nbsp;Reparación y montaje de cartelería y señalética<br /><strong>·</strong>&nbsp;Pintura<br /><strong>·</strong>&nbsp;Mantenimiento eléctrico y lumínico<br /><strong>·</strong>&nbsp;Limpieza general cartelería e imagen<br /><strong>·</strong>&nbsp;Reparaciones en general<br /><strong>·</strong>&nbsp;Restauración de luminarias y broncería</p>
                  </div>
                  <div className="custom-btn-placeholder" style={{ height: '48px' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding section-bg-gray" id="section_4">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2>Obras</h2>
            </div>
            <div className="galeria-grid">
              {obras.map((obra: any) => (
                <div className="galeria-item" key={obra.id}>
                  <div className="slider gallery-slider" data-index="2">
                    <div className="slider-track">
                      {obra.imagenes && obra.imagenes.map((imagen: string, index: number) => (
                        // Removing the legacy "images/" prefix because the images are now in public/images
                        <img key={index} src={`/${imagen}`} alt={`Imagen de ${obra.titulo}`} loading="lazy" />
                      ))}
                    </div>
                  </div>
                  <h5 className="galeria-titulo">{obra.titulo}</h5>
                  {obra.descripcion && <p dangerouslySetInnerHTML={{ __html: obra.descripcion }}></p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="volunteer-section section-padding" id="section_5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12">
              <h2 className="text-white mb-4">Contacto</h2>
              <form id="contact-form" className="contact-form volunteer-form mb-5 mb-lg-0" action="mailto:administracion@listosoluciones.com.ar" method="GET" encType="text/plain">
                <h3 className="mb-4">Envianos tu consulta</h3>
                <div className="row">
                  <div className="col-lg-6 col-12">
                    <input type="text" name="subject" id="volunteer-name" className="form-control" placeholder="Nombre / Asunto" required />
                  </div>
                  <div className="col-lg-6 col-12">
                    <input type="email" name="email" id="volunteer-email" pattern="[^ @]*@[^ @]*" className="form-control" placeholder="Tu email" required />
                  </div>
                </div>
                <textarea name="body" rows={3} className="form-control" id="volunteer-message" placeholder="Comentarios"></textarea>
                <button type="submit" className="form-control">Abrir Cliente de Correo</button>
              </form>
            </div>
            <div className="col-lg-6 col-12">
              <div className="custom-block-body text-center">
                <h4 className="text-white mt-lg-3 mb-lg-3"></h4>
                <p className="text-white d-flex mb-2">
                  <i className="bi-telephone me-2"></i>
                  <a href="tel:+541159908668" className="site-footer-link">+54 11-5990-8668</a>
                </p>
                <p className="text-white d-flex">
                  <i className="bi-envelope me-2"></i>
                  <a href="mailto:administracion@listosoluciones.com.ar" className="site-footer-link">administracion@listosoluciones.com.ar</a>
                </p>
                <p className="text-white d-flex mt-3">
                  <i className="bi-geo-alt me-2"></i>
                  Buenos Aires, Argentina
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Listo! Soluciones - Inicio",
  description: "Listo Soluciones es una compañía dedicada a brindar servicio y soporte en el área de obras civiles y mantenimiento integral a empresas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/images/logo-listo.ico" type="image/x-icon" />
        <link href="/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/css/bootstrap-icons.css" rel="stylesheet" />
        <link href="/css/templatemo-kind-heart-charity.css" rel="stylesheet" />
      </head>
      <body id="section_1">
        <header className="site-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-12 d-flex flex-wrap">
                <p className="d-flex mb-0 me-4">
                  <i className="bi-envelope me-2"></i>
                  <a href="mailto:administracion@listoluciones.com.ar" className="site-footer-link">
                    administracion@listoluciones.com.ar
                  </a>
                </p>
                <p className="d-flex mb-0">
                  <i className="bi-telephone me-2"></i>
                  <a href="tel:+541159908668" className="site-footer-link">
                    +54 11-5990-8668
                  </a>
                </p>
              </div>
              <div className="col-lg-3 col-12 ms-auto d-lg-block d-none">
                <ul className="social-icon">
                  <li className="social-icon-item">
                    <a href="https://www.instagram.com/listosoluciones?igsh=MTN0eDU2YTVoYWY4aQ==" className="social-icon-link bi-instagram"></a>
                  </li>
                  <li className="social-icon-item">
                    <a href="https://wa.me/5491159908668" className="social-icon-link bi-whatsapp"></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        <nav className="navbar navbar-expand-lg bg-light shadow-lg">
          <div className="container">
            <a className="navbar-brand" href="/">
              <img src="/images/logo-listo.png" className="logo img-fluid" alt="Listo Soluciones" />
              <span><small></small></span>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link click-scroll" href="#top">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link click-scroll" href="#section_2">Nosotros</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link click-scroll" href="#section_3">Servicios</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link click-scroll" href="#section_4">Obras</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link click-scroll" href="#section_5">Contacto</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-12 mb-4">
                <img src="/images/logo-listo.png" className="logo img-fluid" alt="" />
              </div>
              <div className="col-lg-4 col-md-6 col-12 mb-4">
                <h5 className="site-footer-title mb-3">Enlaces rápidos</h5>
                <ul className="footer-menu">
                  <li className="footer-menu-item"><a href="#top" className="footer-menu-link click-scroll">Inicio</a></li>
                  <li className="footer-menu-item"><a href="#section_2" className="footer-menu-link click-scroll">Nosotros</a></li>
                  <li className="footer-menu-item"><a href="#section_3" className="footer-menu-link click-scroll">Servicios</a></li>
                  <li className="footer-menu-item"><a href="#section_4" className="footer-menu-link click-scroll">Obras</a></li>
                  <li className="footer-menu-item"><a href="#section_5" className="footer-menu-link click-scroll">Contacto</a></li>
                </ul>
              </div>
              <div className="col-lg-4 col-md-6 col-12 mx-auto">
                <h5 className="site-footer-title mb-3">Información de contacto</h5>
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
          <div className="site-footer-bottom">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-7 col-12">
                  <p className="copyright-text mb-0">
                    Todos los derechos reservados © 2025 <a href="#">Listo!</a> Soluciones. Design: <a href="https://jbimports.com.ar" target="_blank" rel="noreferrer">JBimports</a>
                  </p>
                </div>
                <div className="col-lg-6 col-md-5 col-12 d-flex justify-content-center align-items-center mx-auto">
                  <ul className="social-icon">
                    <li className="social-icon-item">
                      <a href="https://wa.me/5491159908668" className="social-icon-link bi-whatsapp"></a>
                    </li>
                    <li className="social-icon-item">
                      <a href="https://www.instagram.com/listosoluciones?igsh=MTN0eDU2YTVoYWY4aQ==" className="social-icon-link bi-instagram"></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* JAVASCRIPT FILES */}
        <Script src="/js/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/js/bootstrap.min.js" strategy="beforeInteractive" />
        <Script src="/js/jquery.sticky.js" strategy="lazyOnload" />
        <Script src="/js/click-scroll.js" strategy="lazyOnload" />
        <Script src="/js/counter.js" strategy="lazyOnload" />
        <Script src="/js/custom.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}

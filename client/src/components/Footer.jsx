import React from 'react';

/**
 * Componente Footer
 * Pie de página oficial de Hermanos Jota Furniture:
 * Presenta la identidad de marca de 3 columnas (Filosofía/Certificaciones, Showroom oficial en San Cristóbal y Canales de Contacto directo).
 */
const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Columna 1: Marca & Filosofía */}
        <div className="footer-column footer-brand-column">
          <div className="footer-brand">
            <img
              src="/assets/images/logo.svg"
              alt="Logo Hermanos Jota"
              className="footer-logo-img"
            />
            <h3>HERMANOS JOTA</h3>
          </div>
          <p className="footer-desc">
            Diseño de autor y ebanistería contemporánea. Honrando la nobleza de la madera argentina desde 1968.
          </p>
          <div className="footer-badges">
            <span className="badge">Certificación FSC®</span>
            <span className="badge">Hecho en Buenos Aires</span>
          </div>
        </div>

        {/* Columna 2: Showroom */}
        <div className="footer-column">
          <h4>SHOWROOM</h4>
          <p>Av. San Juan 2847, San Cristóbal, CABA</p>
          <p>Lunes a Viernes: 10:00 - 19:00</p>
          <p>Sábados: 10:00 - 14:00</p>
          <p className="footer-note" style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: 0.8 }}>
            (Previa cita para asesoramiento personalizado)
          </p>
        </div>

        {/* Columna 3: Conéctemos */}
        <div className="footer-column">
          <h4>CONÉCTEMOS</h4>
          <p>
            Instagram:{' '}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="footer-contact-link"
            >
              @hermanosjota_ba
            </a>
          </p>
          <p>
            Email:{' '}
            <a href="mailto:info@hermanosjota.com.ar" className="footer-contact-link">
              info@hermanosjota.com.ar
            </a>
          </p>
          <p>
            Tel:{' '}
            <a href="tel:+541149418822" className="footer-contact-link">
              +54 11 4941-8822
            </a>
          </p>
        </div>
      </div>

      {/* Barra Inferior */}
      <div className="footer-bottom">
        <p>
          © 2026 Hermanos Jota. Todos los derechos reservados. Redescubriendo el arte de habitar desde Buenos Aires.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

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
        <div className="footer-brand-column">
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

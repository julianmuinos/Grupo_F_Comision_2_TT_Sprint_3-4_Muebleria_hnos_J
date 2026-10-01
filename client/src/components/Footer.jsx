import React from 'react';

/**
 * Componente Footer
 * Pie de página oficial de Hermanos Jota Furniture.
 * Presenta la identidad de marca, datos oficiales de la Casa Taller en San Cristóbal
 * y todos los canales de contacto digital directos (sin barra de navegación redundante).
 */
const Footer = () => {
  return (
    <footer className="footer-heritage">
      <div className="footer-heritage-content">
        {/* Identidad de Marca y Filosofía */}
        <div className="footer-col-brand">
          <div className="footer-brand-title">
            <img
              src="/assets/images/logo.svg"
              alt="Logo Hermanos Jota"
              className="footer-logo"
            />
            <span className="footer-brand-text">HERMANOS JOTA</span>
          </div>
          <p className="footer-brand-desc">
            Estética de los 60, calidad eterna. Diseñamos piezas únicas de autor con maderas nativas sustentables, respetando el noble oficio de la ebanistería tradicional argentina.
          </p>
          <div className="footer-cert-tags">
            <span className="footer-pill">Certificación FSC®</span>
            <span className="footer-pill">Hecho en Buenos Aires</span>

          </div>
        </div>

        {/* Barra Inferior */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © 2026 Hermanos Jota. Todos los derechos reservados. Redescubriendo el arte de habitar desde Buenos Aires.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

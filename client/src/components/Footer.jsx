import React from 'react';

/**
 * Componente Footer
 * Basado en la maqueta de diseño oficial Hermanos Jota Heritage.
 * 
 * Props:
 * - onNavigate: Función para cambiar de vista ('inicio', 'catalogo', 'contacto')
 */
const Footer = ({ onNavigate }) => {
  return (
    <footer className="footer-heritage">
      <div className="footer-heritage-content">
        <div className="footer-grid">
          {/* Columna 1: Marca y Filosofía */}
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
              Estética de los 60, calidad eterna. Diseñamos piezas únicas de autor con maderas nativas sustentables, respetando el oficio de la ebanistería tradicional argentina.
            </p>
            <div className="footer-cert-tags">
              <span className="footer-pill">Certificación FSC®</span>
              <span className="footer-pill">Hecho en Buenos Aires</span>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div className="footer-col-nav">
            <h4 className="footer-heading">Navegación</h4>
            <ul className="footer-links-list">
              <li>
                <button
                  type="button"
                  className="footer-nav-link"
                  onClick={() => onNavigate('inicio')}
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-link"
                  onClick={() => onNavigate('catalogo')}
                >
                  Catálogo Oficial
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-nav-link"
                  onClick={() => onNavigate('contacto')}
                >
                  Showroom y Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: Showroom y Contacto */}
          <div className="footer-col-info">
            <h4 className="footer-heading">Showroom</h4>
            <p className="footer-info-line">
              <strong>Dirección:</strong> Av. San Juan 2847, CABA
            </p>
            <p className="footer-info-line">
              <strong>Horario:</strong> Lunes a Viernes 10:00 a 18:00 hs
            </p>
            <p className="footer-info-line">
              <strong>Teléfono:</strong> +54 11 5555-5555
            </p>
            <p className="footer-info-line">
              <strong>Instagram:</strong> @hermanosjota_ba
            </p>
          </div>
        </div>

        {/* Barra Inferior */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © 2026 Hermanos Jota Furniture. Todos los derechos reservados. Redescubriendo el arte de vivir desde Buenos Aires.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

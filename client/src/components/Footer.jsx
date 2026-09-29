import React from 'react';

/**
 * Componente Footer
 * Pie de página oficial de Mueblería Hermanos Jota.
 * Incluye identidad de marca, navegación principal, datos del Showroom en Palermo Soho y canales de contacto.
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
              Estética de los 60, calidad eterna. Diseñamos piezas únicas de autor con maderas nativas sustentables, respetando el noble oficio de la ebanistería tradicional argentina.
            </p>
            <div className="footer-cert-tags">
              <span className="footer-pill">Certificación FSC®</span>
              <span className="footer-pill">Hecho en Buenos Aires</span>
              <span className="footer-pill">Palermo Soho</span>
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

          {/* Columna 3: Showroom Palermo Soho y Contacto */}
          <div className="footer-col-info">
            <h4 className="footer-heading">Showroom Palermo Soho</h4>
            <p className="footer-info-line">
              <strong>Dirección:</strong> Honduras 4920, Palermo Soho, CABA
            </p>
            <p className="footer-info-line">
              <strong>Horario:</strong> Lun a Vie 10:00 a 19:00 hs · Sáb 10:00 a 14:00 hs
            </p>
            <p className="footer-info-line">
              <strong>Teléfono:</strong>{' '}
              <a href="tel:+541155555555" className="footer-contact-link">
                +54 11 5555-5555
              </a>
            </p>
            <p className="footer-info-line">
              <strong>Email:</strong>{' '}
              <a href="mailto:contacto@hermanosjota.com.ar" className="footer-contact-link">
                contacto@hermanosjota.com.ar
              </a>
            </p>
            <p className="footer-info-line">
              <strong>Instagram:</strong>{' '}
              <a
                href="https://instagram.com/hermanosjota_ba"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-link footer-social-tag"
                aria-label="Perfil oficial de Instagram de Hermanos Jota"
              >
                @hermanosjota_ba
              </a>
            </p>
          </div>
        </div>

        {/* Barra Inferior */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © 2026 Hermanos Jota Furniture. Todos los derechos reservados. Redescubriendo el arte de habitar desde Buenos Aires.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

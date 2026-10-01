import React from 'react';
import ContactForm from './ContactForm';

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Av.+San+Juan+2847,+C1232AAB+San+Cristobal,+Ciudad+Autonoma+de+Buenos+Aires,+Argentina';

/**
 * Componente ContactView
 * Presenta la información oficial de la Casa Taller de Hermanos Jota,
 * el mapa de ubicación responsivo interactivo y el formulario de contacto,
 * con alineación vertical perfecta y sincronización horizontal con el formulario.
 */
const ContactView = () => {
  return (
    <section className="contact-section-heritage" aria-labelledby="contact-heading">
      <div className="contact-header-block">
        <span className="section-badge">Atención Personalizada</span>
        <h1 id="contact-heading" className="contact-main-title">
          Hablemos de tu próximo espacio.
        </h1>
        <p className="contact-main-desc">
          Te invitamos a conocer la nobleza de nuestras maderas en persona, coordinar una visita a nuestra Casa Taller o enviarnos tu consulta sobre piezas de autor a medida.
        </p>
      </div>

      <div className="contact-grid-layout">
        {/* Columna Izquierda: Casa Taller y Mapa de Ubicación */}
        <div className="contact-info-column">
          {/* Tarjeta Oficial Casa Taller */}
          <div className="contact-showroom-card">
            <div className="contact-card-header">
              <div className="contact-header-icon" aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div className="contact-header-text">
                <h2 className="contact-card-title">Casa Taller</h2>
                <p className="contact-card-subtitle">
                  Espacio de exhibición y producción artesanal en el corazón de Buenos Aires.
                </p>
              </div>
            </div>

            <div className="contact-card-divider" />

            {/* Filas de Información Estilizadas y Alineadas Verticalmente */}
            <div className="contact-details-list">
              {/* Dirección */}
              <div className="contact-detail-row">
                <div className="contact-detail-icon" aria-hidden="true">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-detail-content">
                  <span className="contact-detail-label">DIRECCIÓN</span>
                  <p className="contact-detail-text">
                    <strong>Av. San Juan 2847</strong><br />
                    C1232AAB — Barrio de San Cristóbal<br />
                    Ciudad Autónoma de Buenos Aires, Argentina
                  </p>
                </div>
              </div>

              {/* Horarios */}
              <div className="contact-detail-row">
                <div className="contact-detail-icon" aria-hidden="true">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="contact-detail-content">
                  <span className="contact-detail-label">HORARIOS DE ATENCIÓN</span>
                  <p className="contact-detail-text">
                    <strong>Lunes a Viernes:</strong> 10:00 — 19:00 hs<br />
                    <strong>Sábados:</strong> 10:00 — 14:00 hs
                  </p>
                </div>
              </div>

              {/* WhatsApp y Contacto */}
              <div className="contact-detail-row">
                <div className="contact-detail-icon" aria-hidden="true">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="contact-detail-content">
                  <span className="contact-detail-label">WHATSAPP Y CONTACTO</span>
                  <div className="contact-detail-links">
                    <a
                      href="https://wa.me/5491145678900"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-action-link"
                    >
                      +54 11 4567-8900
                    </a>
                    <span className="contact-link-sep">·</span>
                    <a href="mailto:info@hermanosjota.com.ar" className="contact-action-link">
                      info@hermanosjota.com.ar
                    </a>
                  </div>
                </div>
              </div>

              {/* Instagram con logo oficial */}
              <div className="contact-detail-row">
                <div className="contact-detail-icon" aria-hidden="true">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </div>
                <div className="contact-detail-content">
                  <span className="contact-detail-label">INSTAGRAM</span>
                  <div className="contact-detail-links">
                    <a
                      href="https://instagram.com/hermanosjota_ba"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-action-link"
                    >
                      @hermanosjota_ba
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bloque: Mapa de Ubicación */}
          <div className="contact-map-section">
            <div className="contact-map-header">
              <h3 className="contact-map-title">Mapa de Ubicación</h3>
              <span className="contact-map-caption">Av. San Juan 2847 · San Cristóbal</span>
            </div>

            {/* Box responsivo del tamaño exacto de la foto para que no se deforme */}
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="location-map-box"
              title="Abrir ubicación en Google Maps (nueva pestaña)"
              aria-label="Abrir mapa de ubicación en Google Maps en una nueva pestaña"
            >
              <div className="location-map-aspect-ratio">
                <img
                  src="/assets/images/mapa-san-juan.png"
                  alt="Captura real del mapa de ubicación en Google Maps de Hermanos Jota Casa Taller en Av. San Juan 2847, San Cristóbal"
                  className="location-map-img"
                  loading="lazy"
                />
                <div className="location-map-badge">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Abrir en Google Maps</span>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Columna Derecha: Formulario de Consulta Controlado */}
        <div className="contact-form-container">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactView;

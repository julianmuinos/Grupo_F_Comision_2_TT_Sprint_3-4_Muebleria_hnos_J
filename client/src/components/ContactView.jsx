import React from 'react';
import ContactForm from './ContactForm';

/**
 * Componente ContactView
 * Vista integral de contacto que presenta la información del Showroom oficial
 * y el formulario controlado ContactForm.
 */
const ContactView = () => {
  return (
    <section className="contact-section-heritage" aria-labelledby="contact-heading">
      <div className="contact-header-block">
        <h1 id="contact-heading" className="contact-main-title">
          Hablemos de tu próximo espacio.
        </h1>
        <p className="contact-main-desc">
          Si tenés consultas sobre una pieza de autor, requerís asesoramiento sobre dimensiones o querés conocer la nobleza de nuestras maderas en persona.
        </p>
      </div>

      <div className="contact-grid-layout">
        {/* Tarjeta de Showroom */}
        <div className="showroom-card-heritage">
          <div className="showroom-img-header" />
          <div className="showroom-body">
            <h2 className="showroom-card-title">Showroom Palermo Soho</h2>
            <p className="showroom-address">
              Honduras 4920, Palermo Soho<br />
              Buenos Aires, Argentina
            </p>
            <div className="showroom-schedule">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Lunes a Viernes 10:00 a 19:00 hs · Sábados 10:00 a 14:00 hs</span>
            </div>

            <div className="showroom-direct-actions">
              <a
                href="tel:+541155555555"
                className="btn btn-secondary-light btn-block"
                aria-label="Llamar a Hermanos Jota"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Llamar (+54 11 5555-5555)
              </a>
              <a
                href="https://maps.google.com/?q=Honduras+4920,+Palermo+Soho,+Buenos+Aires"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary-light btn-block"
                aria-label="Ver indicaciones en Google Maps"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
                Cómo Llegar (Google Maps)
              </a>
            </div>
          </div>
        </div>

        {/* Formulario de Consulta Controlado */}
        <div className="contact-form-container">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactView;

import React, { useState } from 'react';

/**
 * Componente ContactView
 * Basado en la maqueta de diseño oficial Hermanos Jota Heritage (contacto_hermanos_jota_2).
 */
const ContactView = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.email.trim() || !formData.mensaje.trim()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ nombre: '', email: '', mensaje: '' });
    setSubmitted(false);
  };

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
            <h2 className="showroom-card-title">Showroom Buenos Aires</h2>
            <p className="showroom-address">
              Av. San Juan 2847<br />
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
              <span>Lunes a Viernes, 10:00 a 18:00 hs</span>
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
                href="https://maps.google.com/?q=Av.+San+Juan+2847,+Buenos+Aires"
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

        {/* Formulario de Consulta */}
        <div className="contact-form-container">
          {!submitted ? (
            <>
              <h2 className="form-heading">Enviar una consulta</h2>
              <form className="contact-form-heritage" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-nombre">Nombre Completo</label>
                  <input
                    id="contact-nombre"
                    type="text"
                    required
                    placeholder="Ej. María Rossi"
                    className="form-input"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Correo Electrónico</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="maria@ejemplo.com"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-mensaje">Mensaje o Consulta</label>
                  <textarea
                    id="contact-mensaje"
                    required
                    rows="5"
                    placeholder="¿En qué podemos ayudarte? Podés consultarnos por medidas, maderas o tiempos de entrega."
                    className="form-textarea"
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-submit">
                  Enviar Mensaje
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
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </form>
            </>
          ) : (
            <div className="contact-success-heritage" role="alert">
              <div className="success-icon-circle">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--secondary)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3>Mensaje Recibido</h3>
              <p>
                Gracias por comunicarte con <strong>Mueblería Hermanos Jota</strong>. Un asesor de nuestro taller responderá a tu correo a la brevedad.
              </p>
              <button
                type="button"
                className="btn btn-secondary-light"
                onClick={handleReset}
              >
                Enviar otra consulta
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactView;

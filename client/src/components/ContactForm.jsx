import React, { useState } from 'react';

export default function ContactForm({ onSubmitSuccess = () => {} }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'El nombre completo es requerido.';
    } else if (formData.name.trim().length < 3) {
      errs.name = 'El nombre debe contener al menos 3 caracteres.';
    }

    if (!formData.email.trim()) {
      errs.email = 'El correo electrónico es requerido.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Ingresa un correo electrónico válido.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Por favor escribe tu consulta o requerimiento.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'El mensaje debe tener al menos 10 caracteres.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulación de envío exitoso
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onSubmitSuccess(formData);
    }, 600);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <main className="w-full pt-28 pb-20 bg-surface">
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Columna Izquierda: Información de Contacto & Showroom */}
          <section className="flex flex-col space-y-10">
            <div className="space-y-4">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] block">
                Atención Personalizada
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl text-on-surface font-bold uppercase tracking-[0.06em]">
                Estamos aquí.
              </h1>
              <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-md leading-relaxed">
                Visítenos en nuestra Casa Taller para experimentar la calidez de nuestras maderas y acabados en persona, o escríbanos para proyectos especiales a medida.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h2 className="font-sans text-xs text-primary uppercase tracking-widest font-bold">
                  Casa Taller
                </h2>
                <p className="font-sans text-sm text-on-surface-variant flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5" aria-hidden="true">
                    location_on
                  </span>
                  <span>
                    Av. San Juan 2847 <br />
                    C1232AAB — San Cristóbal <br />
                    Buenos Aires, Argentina
                  </span>
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="font-sans text-xs text-primary uppercase tracking-widest font-bold">
                  Horarios de Atención
                </h2>
                <div className="font-sans text-sm text-on-surface-variant flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5" aria-hidden="true">
                    schedule
                  </span>
                  <div>
                    <p>Lunes - Viernes:<br />10:00 - 19:00</p>
                    <p className="mt-1">Sábados:<br />10:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Redes y Canales */}
            <div className="pt-6 border-t border-outline-variant/40">
              <h2 className="font-sans text-xs text-primary uppercase tracking-widest mb-4 font-bold">
                Canales Directos
              </h2>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/541145678900"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  title="WhatsApp"
                >
                  <span className="material-symbols-outlined text-xl" aria-hidden="true">
                    chat
                  </span>
                </a>
                <a
                  href="https://instagram.com/hermanosjota_ba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  title="Instagram"
                >
                  <span className="material-symbols-outlined text-xl" aria-hidden="true">
                    photo_camera
                  </span>
                </a>
                <a
                  href="mailto:info@hermanosjota.com.ar"
                  className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  title="Email"
                >
                  <span className="material-symbols-outlined text-xl" aria-hidden="true">
                    mail
                  </span>
                </a>
              </div>
            </div>

            {/* Foto del Showroom */}
            <div
              className="w-full h-64 md:h-72 rounded-2xl overflow-hidden shadow-md bg-cover bg-center contacto-showroom-bg border border-outline-variant/40"
              role="img"
              aria-label="Showroom Hermanos Jota en San Juan 2847"
            />
          </section>

          {/* Columna Derecha: Formulario de Contacto */}
          <section className="bg-surface-container-lowest p-8 md:p-12 rounded-2xl shadow-xl flex flex-col justify-center relative overflow-hidden border border-outline-variant/30">
            {submitted ? (
              <div className="text-center py-10 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full mx-auto flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl" aria-hidden="true">
                    check_circle
                  </span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-on-surface font-bold">
                  ¡Mensaje Enviado con Éxito!
                </h2>
                <p className="text-sm text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                  Gracias <strong>{formData.name}</strong> por escribirnos. Nuestro equipo se pondrá en contacto contigo a la brevedad al correo <strong>{formData.email}</strong>.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn-secondary px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="font-serif text-2xl md:text-3xl text-on-surface mb-2 font-bold">
                    Ponte en contacto
                  </h2>
                  <p className="font-sans text-sm text-on-surface-variant">
                    Complete el formulario y le responderemos con asesoramiento y cotización personalizada.
                  </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                  {/* Nombre Completo */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-xs uppercase tracking-wider font-semibold text-on-surface block" htmlFor="name">
                      Nombre Completo <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. Juan Pérez"
                      className={`w-full bg-surface px-4 py-3 rounded-lg border focus:outline-none transition-colors font-sans text-sm text-on-surface placeholder:text-on-surface-variant/40 ${
                        errors.name ? 'border-red-500 bg-red-50/50' : 'border-outline-variant/60 focus:border-primary'
                      }`}
                    />
                    {errors.name && <p className="text-red-600 text-xs mt-1 font-medium">{errors.name}</p>}
                  </div>

                  {/* Correo Electrónico */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-xs uppercase tracking-wider font-semibold text-on-surface block" htmlFor="email">
                      Correo Electrónico <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="juan@ejemplo.com"
                      className={`w-full bg-surface px-4 py-3 rounded-lg border focus:outline-none transition-colors font-sans text-sm text-on-surface placeholder:text-on-surface-variant/40 ${
                        errors.email ? 'border-red-500 bg-red-50/50' : 'border-outline-variant/60 focus:border-primary'
                      }`}
                    />
                    {errors.email && <p className="text-red-600 text-xs mt-1 font-medium">{errors.email}</p>}
                  </div>

                  {/* Teléfono (Opcional) */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-xs uppercase tracking-wider font-semibold text-on-surface block" htmlFor="phone">
                      Teléfono / WhatsApp <span className="text-on-surface-variant text-[11px] font-normal">(Opcional)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+54 11 ..."
                      className="w-full bg-surface px-4 py-3 rounded-lg border border-outline-variant/60 focus:border-primary focus:outline-none transition-colors font-sans text-sm text-on-surface placeholder:text-on-surface-variant/40"
                    />
                  </div>

                  {/* Mensaje */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-xs uppercase tracking-wider font-semibold text-on-surface block" htmlFor="message">
                      Mensaje <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="¿En qué pieza o proyecto a medida podemos asesorarle?"
                      className={`w-full bg-surface px-4 py-3 rounded-lg border focus:outline-none transition-colors font-sans text-sm text-on-surface placeholder:text-on-surface-variant/40 resize-none ${
                        errors.message ? 'border-red-500 bg-red-50/50' : 'border-outline-variant/60 focus:border-primary'
                      }`}
                    />
                    {errors.message && <p className="text-red-600 text-xs mt-1 font-medium">{errors.message}</p>}
                  </div>

                  {/* Botón Enviar */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white font-sans text-sm font-semibold uppercase tracking-wider py-4 rounded-xl shadow-md hover:bg-primary-hover hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border-none disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}</span>
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">
                      send
                    </span>
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

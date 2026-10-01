import React, { useState, useRef, useEffect } from 'react';

/**
 * Componente ContactForm
 * Formulario de contacto 100% controlado mediante el hook useState de React.
 * 
 * Características:
 * - Manejo de estado controlado para cada campo (nombre, email, telefono, motivo, mensaje).
 * - Validaciones en tiempo real y al enviar con mensajes de error accesibles.
 * - Soporte para props opcionales (defaultMotivo, onSuccess).
 * - Prevención de fugas de memoria con limpieza del temporizador en desmontaje (useRef + useEffect).
 * - Vista de confirmación y éxito interactiva con opción de reinicio del formulario.
 */
const ContactForm = ({ defaultMotivo = 'asesoramiento', onSuccess }) => {
  // 1. Estado inicial del formulario parametrizable
  const initialFormState = {
    nombre: '',
    email: '',
    telefono: '',
    motivo: defaultMotivo,
    mensaje: '',
  };

  // 2. Estados controlados mediante useState
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Referencia mutable para el temporizador asíncrono
  const timerRef = useRef(null);

  // Limpieza del temporizador ante el desmontaje del componente (evita memory leaks)
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Mapeo descriptivo para motivos de consulta
  const motivoLabels = {
    asesoramiento: 'Asesoramiento de diseño & dimensiones',
    presupuesto: 'Presupuesto formal de piezas',
    personalizacion: 'Personalización de maderas nativas',
    showroom: 'Visita guiada al Showroom Palermo Soho',
    otro: 'Otra consulta general',
  };

  // 3. Función de validación por campo individual
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'nombre':
        if (!value.trim()) {
          error = 'El nombre completo es requerido.';
        } else if (value.trim().length < 3) {
          error = 'El nombre debe tener al menos 3 caracteres.';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(value)) {
          error = 'El nombre solo puede contener letras, espacios, guiones y apóstrofes.';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'El correo electrónico es requerido.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = 'Ingresá un correo electrónico válido (ej. nombre@ejemplo.com).';
        }
        break;

      case 'telefono':
        if (value.trim() && !/^[0-9+\s()-]{7,20}$/.test(value.trim())) {
          error = 'Ingresá un formato telefónico válido (mínimo 7 dígitos).';
        }
        break;

      case 'mensaje':
        if (!value.trim()) {
          error = 'El mensaje o consulta es obligatorio.';
        } else if (value.trim().length < 10) {
          error = 'Por favor ingresá al menos 10 caracteres con el detalle de tu consulta.';
        }
        break;

      default:
        break;
    }

    return error;
  };

  // 4. Manejador de cambios controlado (onChange)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Si el campo ya fue tocado por el usuario, revalidar en tiempo real
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  // 5. Manejador de pérdida de foco (onBlur) para validación progresiva
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  // 6. Validación completa previa al envío
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    return newErrors;
  };

  // 7. Manejador de envío (onSubmit)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Marcar todos los campos como tocados para visibilizar posibles errores
    setTouched({
      nombre: true,
      email: true,
      telefono: true,
      motivo: true,
      mensaje: true,
    });

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Iniciar simulación de envío asíncrono seguro
    setIsSubmitting(true);

    timerRef.current = setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSuccess?.(formData);
    }, 600);
  };

  // 8. Reiniciar formulario para una nueva consulta
  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
  };

  return (
    <div className="contact-form-wrapper">
      {!isSubmitted ? (
        <>
          <div className="form-header-group">
            <h2 className="form-heading">Enviar una consulta</h2>
            <p className="form-subheading">
              Dejanos tu consulta y un ebanista de nuestro taller responderá a la brevedad.
            </p>
          </div>

          <form className="contact-form-heritage" onSubmit={handleSubmit} noValidate>
            {/* Campo: Nombre Completo */}
            <div className={`form-group ${touched.nombre && errors.nombre ? 'has-error' : ''}`}>
              <label htmlFor="contact-nombre" className="form-label">
                Nombre Completo <span className="required-mark">*</span>
              </label>
              <input
                id="contact-nombre"
                name="nombre"
                type="text"
                placeholder="Ej. María Rossi"
                className={`form-input ${touched.nombre && errors.nombre ? 'input-error' : ''}`}
                value={formData.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={touched.nombre && !!errors.nombre}
                aria-describedby={errors.nombre ? 'nombre-error' : undefined}
                required
              />
              {touched.nombre && errors.nombre && (
                <span id="nombre-error" className="field-error" role="alert">
                  {errors.nombre}
                </span>
              )}
            </div>

            {/* Campo: Correo Electrónico */}
            <div className={`form-group ${touched.email && errors.email ? 'has-error' : ''}`}>
              <label htmlFor="contact-email" className="form-label">
                Correo Electrónico <span className="required-mark">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="maria@ejemplo.com"
                className={`form-input ${touched.email && errors.email ? 'input-error' : ''}`}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={touched.email && !!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                required
              />
              {touched.email && errors.email && (
                <span id="email-error" className="field-error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Campo: Teléfono (Opcional) */}
            <div className={`form-group ${touched.telefono && errors.telefono ? 'has-error' : ''}`}>
              <label htmlFor="contact-telefono" className="form-label">
                Teléfono de Contacto <span className="optional-tag">(Opcional)</span>
              </label>
              <input
                id="contact-telefono"
                name="telefono"
                type="tel"
                placeholder="Ej. +54 11 4567-8901"
                className={`form-input ${touched.telefono && errors.telefono ? 'input-error' : ''}`}
                value={formData.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={touched.telefono && !!errors.telefono}
                aria-describedby={errors.telefono ? 'telefono-error' : undefined}
              />
              {touched.telefono && errors.telefono && (
                <span id="telefono-error" className="field-error" role="alert">
                  {errors.telefono}
                </span>
              )}
            </div>

            {/* Campo: Motivo de la consulta */}
            <div className="form-group">
              <label htmlFor="contact-motivo" className="form-label">
                Motivo de la Consulta
              </label>
              <select
                id="contact-motivo"
                name="motivo"
                className="form-input form-select"
                value={formData.motivo}
                onChange={handleChange}
              >
                <option value="asesoramiento">Asesoramiento de diseño & dimensiones</option>
                <option value="presupuesto">Presupuesto formal de piezas</option>
                <option value="personalizacion">Personalización de maderas nativas</option>
                <option value="showroom">Visita guiada al Showroom Palermo Soho</option>
                <option value="otro">Otra consulta general</option>
              </select>
            </div>

            {/* Campo: Mensaje o Consulta */}
            <div className={`form-group ${touched.mensaje && errors.mensaje ? 'has-error' : ''}`}>
              <div className="label-with-counter">
                <label htmlFor="contact-mensaje" className="form-label">
                  Mensaje o Consulta <span className="required-mark">*</span>
                </label>
                <span className="char-counter">
                  {formData.mensaje.length} caracteres (mínimo 10)
                </span>
              </div>
              <textarea
                id="contact-mensaje"
                name="mensaje"
                rows="5"
                placeholder="¿En qué podemos ayudarte? Podés consultarnos por medidas, maderas nativas o tiempos de entrega."
                className={`form-textarea ${touched.mensaje && errors.mensaje ? 'input-error' : ''}`}
                value={formData.mensaje}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={touched.mensaje && !!errors.mensaje}
                aria-describedby={errors.mensaje ? 'mensaje-error' : undefined}
                required
              />
              {touched.mensaje && errors.mensaje && (
                <span id="mensaje-error" className="field-error" role="alert">
                  {errors.mensaje}
                </span>
              )}
            </div>

            {/* Botón de Enviar */}
            <button
              type="submit"
              className="btn btn-primary btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-mini" aria-hidden="true" />
                  Enviando consulta...
                </>
              ) : (
                <>
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
                </>
              )}
            </button>
          </form>
        </>
      ) : (
        /* Vista de Confirmación y Éxito */
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
          <h3 className="success-title">¡Mensaje Recibido!</h3>
          <p className="success-desc">
            Gracias por comunicarte, <strong>{formData.nombre}</strong>. Hemos recibido tu consulta sobre{' '}
            <strong>{motivoLabels[formData.motivo]}</strong>.
          </p>
          <div className="success-receipt-box">
            <div className="receipt-line">
              <span className="receipt-label">Correo registrado:</span>
              <span className="receipt-value">{formData.email}</span>
            </div>
            {formData.telefono && (
              <div className="receipt-line">
                <span className="receipt-label">Teléfono:</span>
                <span className="receipt-value">{formData.telefono}</span>
              </div>
            )}
            <div className="receipt-line">
              <span className="receipt-label">Plazo de respuesta:</span>
              <span className="receipt-value">Dentro de las próximas 24 hs hábiles</span>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-secondary-light btn-reset-contact"
            onClick={handleReset}
          >
            Enviar otra consulta
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactForm;

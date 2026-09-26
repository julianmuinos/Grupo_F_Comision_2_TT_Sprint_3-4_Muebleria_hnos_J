import React, { useState } from 'react';

/**
 * Componente ProductDetail
 * Visualización detallada de un mueble mediante renderizado condicional con:
 * - Botón de volver al catálogo y breadcrumbs
 * - Fotos grandes con badges de estado y categoría
 * - Especificaciones técnicas completas (medidas, materiales, acabados, etc.)
 * - Selector de cantidad y adición al carrito / cotización con feedback visual
 * 
 * Props:
 * - product: Objeto completo del producto seleccionado
 * - onBack: Función callback para regresar al listado del catálogo
 * - onAddToCart: Función callback para añadir cantidad especificada al carrito
 */
const ProductDetail = ({ product, onBack, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  if (!product) {
    return (
      <div className="state-container">
        <h2>Producto no encontrado</h2>
        <p className="section-subtitle">No se seleccionó ningún producto para ver el detalle.</p>
        <button type="button" className="btn btn-primary" onClick={onBack} style={{ marginTop: '1rem' }}>
          ← Volver al catálogo
        </button>
      </div>
    );
  }

  // Formato oficial de moneda en pesos argentinos ($ ARS) sin decimales
  const precioFormateado = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(product.precio ?? product.price ?? 0);

  const hayStock = (product.stock ?? 0) > 0;
  const imagenSrc = product.imagen || product.image || product.foto;
  const nombre = product.nombre || product.title;
  const categoria = product.categoria || product.category || 'Muebles';

  // Manejador para aumentar o disminuir cantidad dentro del stock disponible
  const handleQtyChange = (delta) => {
    setQuantity((prev) => {
      const maxStock = product.stock || 99;
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > maxStock) return maxStock;
      return next;
    });
  };

  // Manejador para agregar al carrito y mostrar notificación temporal
  const handleAdd = () => {
    if (!hayStock) return;
    onAddToCart?.(product, quantity);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2800);
  };

  // Diccionario de etiquetas oficiales de especificaciones según catalogo.pdf
  const specLabels = {
    medidas: 'Medidas',
    materiales: 'Materiales',
    acabado: 'Acabado',
    peso: 'Peso',
    capacidad: 'Capacidad',
    modulares: 'Modulares',
    tapizado: 'Tapizado',
    confort: 'Confort',
    rotacion: 'Rotación',
    garantia: 'Garantía',
    cargaMaxima: 'Carga máxima',
    almacenamiento: 'Almacenamiento',
    caracteristicas: 'Características',
    estructura: 'Estructura',
    relleno: 'Relleno',
    sostenibilidad: 'Sostenibilidad',
    extension: 'Extensión',
    apilables: 'Apilables',
    incluye: 'Incluye',
    cables: 'Cables',
    regulacion: 'Regulación',
    certificacion: 'Certificación',
  };

  // Extraer especificaciones técnicas para mostrarlas fielmente como en el catálogo oficial
  const specs = product.specs || {};
  const standardSpecs = Object.entries(specs).map(([key, value]) => ({
    label: specLabels[key] || key.charAt(0).toUpperCase() + key.slice(1),
    value,
  }));

  // En caso de que no tenga objeto specs pero tenga medidas o materiales directos
  if (standardSpecs.length === 0) {
    if (product.medidas) standardSpecs.push({ label: 'Medidas', value: product.medidas });
    if (product.materiales) standardSpecs.push({ label: 'Materiales', value: product.materiales });
  }

  return (
    <section className="product-detail-section" aria-label={`Detalle de ${nombre}`}>
      {/* Navegación y Breadcrumbs */}
      <nav className="detail-navigation" aria-label="Migas de pan">
        <button
          type="button"
          className="back-link-btn"
          onClick={onBack}
          aria-label="Volver a la vista del catálogo"
        >
          ← Volver al catálogo
        </button>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-category">
          {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
        </span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current" aria-current="page">
          {nombre}
        </span>
      </nav>

      {/* Disposición Principal del Detalle */}
      <div className="product-detail-layout">
        {/* Columna Izquierda: Imagen Grande y Badges */}
        <div className="detail-image-wrapper">
          <img
            src={imagenSrc}
            alt={nombre}
            className="detail-image"
          />

          {/* Badges de producto */}
          {product.destacado && (
            <span className="detail-badge badge-nuevo">Pieza Destacada</span>
          )}
          {!product.destacado && product.materiales && product.materiales.includes('FSC®') && (
            <span className="detail-badge badge-sustentable">Madera FSC®</span>
          )}

          <span className="detail-category-badge">{categoria}</span>
        </div>

        {/* Columna Derecha: Información y Especificaciones */}
        <div className="detail-content">
          <div className="detail-header-group">
            <span className="detail-subtitle">Hermanos Jota · Edición 2026</span>
            <h1 className="detail-title">{nombre}</h1>
          </div>

          {/* Fila de Precio y Disponibilidad de Stock */}
          <div className="detail-price-row">
            <div>
              <span className="price-tagline">Precio de Lista Oficial</span>
              <div className="detail-price">{precioFormateado}</div>
              <span className="detail-installments-badge">3 y 6 Cuotas Sin Interés</span>
            </div>
            <span className={`detail-stock-pill ${hayStock ? 'in-stock' : 'out-of-stock'}`}>
              {hayStock ? `En Stock (${product.stock} disponibles)` : 'Sin Stock Inmediato'}
            </span>
          </div>

          {/* Chips de Sustentabilidad y Atributos de Autor */}
          <div className="detail-sustainability-chips">
            <span className="sustainability-chip">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22v-7"/><path d="M17 12V9c0-2.8-2.2-5-5-5S7 6.2 7 9v3"/><path d="M3 15c0 3.3 3.6 6 8.5 6s9.5-2.7 9.5-6-3.6-6-9-6-9 2.7-9 6Z"/></svg>
              Madera Certificada FSC®
            </span>
            <span className="sustainability-chip">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              Acabado Aceites Naturales
            </span>
            <span className="sustainability-chip">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9"/><path d="M15 13 9 7l4-4 6 6-4 4Z"/></svg>
              Ensamble Artesanal
            </span>
          </div>

          <div className="detail-divider" />

          {/* Descripción del Producto */}
          <div className="detail-block">
            <h3>Descripción de Autor</h3>
            <p className="detail-description">
              {product.descripcionLarga || product.descripcion}
            </p>
          </div>

          <div className="detail-divider" />

          {/* Especificaciones Técnicas */}
          <div className="detail-block">
            <h3>Especificaciones Técnicas</h3>
            <div className="detail-specs-grid">
              {standardSpecs.map((spec, index) => (
                <div key={index} className="spec-card">
                  <span className="spec-label">{spec.label}</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-divider" />

          {/* Acciones de Compra / Cotización */}
          <div className="detail-purchase-actions">
            {hayStock && (
              <div className="quantity-selector">
                <label htmlFor="product-detail-qty">Cantidad:</label>
                <div className="quantity-controls">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => handleQtyChange(-1)}
                    disabled={quantity <= 1}
                    aria-label="Disminuir cantidad"
                  >
                    −
                  </button>
                  <input
                    id="product-detail-qty"
                    type="number"
                    className="qty-input"
                    value={quantity}
                    readOnly
                    aria-label="Cantidad seleccionada"
                  />
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => handleQtyChange(1)}
                    disabled={quantity >= (product.stock || 99)}
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="action-buttons-group">
              <button
                type="button"
                className="btn btn-primary btn-large"
                onClick={handleAdd}
                disabled={!hayStock}
                aria-label={`Agregar ${quantity} unidades de ${nombre} a la cotización`}
              >
                + Agregar a Cotización
              </button>
              <button
                type="button"
                className="btn btn-secondary-light btn-large"
                onClick={onBack}
                aria-label="Volver al catálogo"
              >
                Volver al Catálogo
              </button>
            </div>

            {/* Notificación Toast de Éxito */}
            {showToast && (
              <div className="success-toast" role="alert">
                ¡Se agregaron {quantity} unidad(es) de {nombre} a tu cotización!
              </div>
            )}

            {/* Tarjeta de Confianza y Garantía */}
            <div className="detail-trust-card">
              <div className="trust-item">
                <div className="trust-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <div>
                  <h4 className="trust-title">Garantía Estructural Hermanos Jota</h4>
                  <p className="trust-desc">Cubrimos cualquier defecto estructural de fabricación por 10 años.</p>
                </div>
              </div>
              <div className="trust-divider" />
              <div className="trust-item">
                <div className="trust-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-5l-3-4h-5v10"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
                </div>
                <div>
                  <h4 className="trust-title">Envío Especializado y Cuidado</h4>
                  <p className="trust-desc">Entregado con embalaje reforzado y manipulación artesanal en todo el país.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;

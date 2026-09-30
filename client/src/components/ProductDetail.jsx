import React, { useState } from 'react';
import { formatCurrency, PRODUCTS_DATA } from '../data/products';

export default function ProductDetail({
  product,
  onBack = () => {},
  onAddToCart = () => {},
  onSelectProduct = () => {},
}) {
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  if (!product) return null;

  const {
    title,
    price,
    image,
    desc,
    fullDesc,
    category,
    material,
    badge,
    specs = {},
  } = product;

  const relatedItems = product.relatedProducts?.length
    ? product.relatedProducts
    : PRODUCTS_DATA.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <main className="w-full pt-28 pb-20 max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12 flex-grow">
      {/* Toast de confirmación flotante */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 toast-box">
          <span className="material-symbols-outlined text-secondary" aria-hidden="true">
            check_circle
          </span>
          <span>
            <strong>{title}</strong> (x{quantity}) añadido a tu cotización.
          </span>
        </div>
      )}

      {/* Breadcrumbs / Migas de Pan */}
      <nav
        className="flex items-center gap-2 text-xs uppercase tracking-widest text-on-surface-variant mb-8 overflow-x-auto whitespace-nowrap py-1"
        aria-label="Migas de pan"
      >
        <button
          type="button"
          onClick={onBack}
          className="hover:text-primary transition-colors font-medium bg-transparent border-none p-0 cursor-pointer text-xs uppercase tracking-widest text-on-surface-variant"
        >
          Catálogo
        </button>
        <span className="text-outline-variant">›</span>
        <span className="capitalize font-medium text-on-surface-variant">{category}</span>
        <span className="text-outline-variant">›</span>
        <span className="text-primary font-bold">{title}</span>
      </nav>

      {/* Grilla Principal de Detalle (2 Columnas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
        {/* Columna Izquierda: Imagen Principal */}
        <section className="lg:col-span-6 xl:col-span-7 flex flex-col gap-4 lg:sticky lg:top-28">
          <div className="relative w-full aspect-[4/3] sm:aspect-[5/4] md:aspect-[4/3] bg-surface-container rounded-2xl overflow-hidden shadow-sm product-hero-container flex items-center justify-center p-8 border border-outline-variant/30">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain product-hero-image"
            />
            {badge && (
              <div
                className={`absolute top-4 left-4 backdrop-blur text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider ${
                  badge.class === 'badge-nuevo' ? 'bg-tertiary' : 'bg-secondary'
                }`}
              >
                {badge.text}
              </div>
            )}
          </div>
        </section>

        {/* Columna Derecha: Información, Precio, Acciones y Garantías */}
        <section className="lg:col-span-6 xl:col-span-5 flex flex-col space-y-6">
          {/* Badges de Colección */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="badge-collection-green px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              Colección Oficial 2026
            </span>
            <span className="badge-collection-tan px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider capitalize">
              Madera {material}
            </span>
          </div>

          {/* Título de la Pieza */}
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-on-surface tracking-tight leading-tight">
              {title}
            </h1>
          </div>

          {/* Precio & Facilidades */}
          <div className="pb-3 border-b border-outline-variant/40">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-primary tracking-tight">
              {formatCurrency(price)} <span className="text-sm font-sans font-normal text-on-surface-variant">ARS</span>
            </div>
            <p className="text-xs uppercase tracking-widest text-on-surface-variant font-medium mt-1.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-secondary" aria-hidden="true">
                credit_card
              </span>
              3 y 6 cuotas fijas sin interés con tarjetas bancarias
            </p>
          </div>

          {/* Descripción */}
          <div className="space-y-3 text-on-surface-variant text-sm sm:text-base leading-relaxed">
            <p className="font-medium text-on-surface">{desc}</p>
            <p>{fullDesc || desc}</p>
          </div>

          {/* Píldoras de Sustentabilidad y Manufactura */}
          <div className="flex flex-wrap gap-2 pt-1">
            <div className="feature-pill">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                nature
              </span>
              <span>Madera Certificada FSC®</span>
            </div>
            <div className="feature-pill">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                opacity
              </span>
              <span>Acabado Aceites Naturales</span>
            </div>
            <div className="feature-pill">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                handyman
              </span>
              <span>Ensamble Artesanal</span>
            </div>
          </div>

          {/* Especificaciones Técnicas */}
          {specs && Object.keys(specs).length > 0 && (
            <div className="bg-surface-container/50 rounded-xl p-4 border border-outline-variant/30 space-y-2 text-xs">
              <span className="text-[11px] uppercase tracking-widest font-bold text-on-surface block mb-2">
                Ficha Técnica
              </span>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {specs.medidas && (
                  <div>
                    <span className="text-on-surface-variant block">Dimensiones</span>
                    <strong className="text-on-surface">{specs.medidas}</strong>
                  </div>
                )}
                {specs.materiales && (
                  <div>
                    <span className="text-on-surface-variant block">Materiales</span>
                    <strong className="text-on-surface">{specs.materiales}</strong>
                  </div>
                )}
                {specs.acabado && (
                  <div>
                    <span className="text-on-surface-variant block">Acabado</span>
                    <strong className="text-on-surface">{specs.acabado}</strong>
                  </div>
                )}
                {specs.peso && (
                  <div>
                    <span className="text-on-surface-variant block">Peso</span>
                    <strong className="text-on-surface">{specs.peso}</strong>
                  </div>
                )}
                {specs.capacidad && (
                  <div>
                    <span className="text-on-surface-variant block">Capacidad</span>
                    <strong className="text-on-surface">{specs.capacidad}</strong>
                  </div>
                )}
                {specs.garantia && (
                  <div>
                    <span className="text-on-surface-variant block">Garantía</span>
                    <strong className="text-on-surface">{specs.garantia}</strong>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Selector de Cantidad y Botón de Cotización */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            {/* Control Cantidad */}
            <div className="flex items-center border border-outline-variant/40 rounded-xl bg-surface p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer border-none bg-transparent"
                aria-label="Disminuir cantidad"
              >
                <span className="material-symbols-outlined text-lg" aria-hidden="true">
                  remove
                </span>
              </button>
              <span className="w-10 text-center font-bold text-sm text-on-surface">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer border-none bg-transparent"
                aria-label="Aumentar cantidad"
              >
                <span className="material-symbols-outlined text-lg" aria-hidden="true">
                  add
                </span>
              </button>
            </div>

            {/* Botón Principal */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="btn-add-cart flex-1 w-full py-4 px-6 rounded-xl font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer border-none shadow-md"
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">
                shopping_bag
              </span>
              <span>Añadir a la Cotización</span>
            </button>
          </div>

          {/* Tarjetas de Beneficio y Confianza */}
          <div className="space-y-3 pt-3">
            <div className="benefit-card">
              <div className="benefit-icon-wrapper">
                <span className="material-symbols-outlined text-xl" aria-hidden="true">
                  verified
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface">Garantía Estructural</h3>
                <p className="text-xs text-on-surface-variant mt-0.5 leading-normal">
                  Cada pieza es supervisada por maestros carpinteros, respaldada por garantía de fabricación.
                </p>
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon-wrapper">
                <span className="material-symbols-outlined text-xl" aria-hidden="true">
                  local_shipping
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface">Envío Especializado</h3>
                <p className="text-xs text-on-surface-variant mt-0.5 leading-normal">
                  Embalaje protector a medida y entrega coordinada a domicilio en CABA, GBA y todo el país.
                </p>
              </div>
            </div>
          </div>

          {/* Botón Volver */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onBack}
              className="text-xs uppercase tracking-wider font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer bg-transparent border-none p-0"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">
                arrow_back
              </span>
              Volver al catálogo completo
            </button>
          </div>
        </section>
      </div>

      {/* Piezas Relacionadas / Colección */}
      <section className="mt-20 pt-12 border-t border-outline-variant/30">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-1">
              Colección Hermanos Jota
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-on-surface font-bold">
              Piezas Complementarias
            </h2>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="text-xs uppercase tracking-wider font-semibold text-primary hover:underline bg-transparent border-none cursor-pointer"
          >
            Ver todo ›
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedItems.map((rel) => (
            <div
              key={rel.id}
              onClick={() => onSelectProduct(rel)}
              className="group bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/30 cursor-pointer hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="aspect-square bg-surface-container rounded-lg p-4 mb-3 flex items-center justify-center overflow-hidden">
                <img
                  src={rel.image}
                  alt={rel.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-serif text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                {rel.title}
              </h3>
              <span className="text-xs text-primary font-bold">{formatCurrency(rel.price)}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

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

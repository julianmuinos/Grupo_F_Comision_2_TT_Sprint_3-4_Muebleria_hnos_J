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

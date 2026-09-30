import React from 'react';
import { formatCurrency } from '../data/products';

export default function ProductCard({
  product,
  onSelectProduct = () => {},
  onAddToCart = () => {},
  viewMode = 'grid',
}) {
  if (!product) return null;

  const {
    title,
    price,
    image,
    desc,
    badge,
    category,
    material,
    swatches = [],
    specs = {},
  } = product;

  const handleCardClick = () => {
    onSelectProduct(product);
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  // Render para Vista en Lista
  if (viewMode === 'list') {
    return (
      <article
        onClick={handleCardClick}
        className="group flex flex-col sm:flex-row bg-surface-container-lowest rounded-2xl md:rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer border border-outline-variant/30"
      >
        <div className="relative w-full sm:w-64 md:w-72 aspect-[4/3] sm:aspect-auto shrink-0 overflow-hidden bg-surface-container flex items-center justify-center p-6">
          <img
            className="w-full h-full max-h-56 object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
            alt={title}
            src={image}
            loading="lazy"
          />
          {badge && (
            <div
              className={`absolute top-4 left-4 backdrop-blur text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                badge.class === 'badge-nuevo' ? 'bg-tertiary' : 'bg-secondary'
              }`}
            >
              {badge.text}
            </div>
          )}
        </div>

        <div className="p-5 md:p-6 flex flex-col justify-between flex-grow">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <h2 className="font-serif text-on-surface group-hover:text-primary transition-colors text-xl md:text-2xl font-semibold">
                {title}
              </h2>
              <span className="font-serif text-primary font-bold text-xl md:text-2xl whitespace-nowrap">
                {formatCurrency(price)}
              </span>
            </div>
            <p className="font-sans text-sm text-on-surface-variant mb-4 leading-relaxed">
              {desc}
            </p>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-surface-container/80 text-primary font-semibold px-2.5 py-1 rounded-md text-xs uppercase tracking-wider">
                {category}
              </span>
              <span className="bg-surface-container/80 text-on-surface-variant px-2.5 py-1 rounded-md text-xs capitalize">
                {material}
              </span>
              {specs?.medidas && (
                <span className="inline-flex items-center gap-1.5 bg-surface-container/70 text-on-surface-variant px-2.5 py-1 rounded-md text-xs">
                  <span className="material-symbols-outlined text-[15px] text-primary" aria-hidden="true">
                    straighten
                  </span>
                  {specs.medidas}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30 mt-auto">
            <div className="flex items-center gap-2">
              {swatches.map((color, idx) => (
                <div
                  key={idx}
                  className="w-4 h-4 rounded-full shadow-sm border border-white"
                  style={{ backgroundColor: color }}
                  title="Muestra de material"
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAddClick}
                className="btn-secondary px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                title="Añadir a cotización"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">
                  add_shopping_cart
                </span>
                Cotizar
              </button>
              <span className="inline-flex items-center gap-1 text-sm text-primary font-semibold group-hover:translate-x-1 transition-transform">
                Ver detalle{' '}
                <span className="material-symbols-outlined text-base" aria-hidden="true">
                  arrow_forward
                </span>
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Render para Vista en Cuadrícula (Grid)
  return (
    <article
      onClick={handleCardClick}
      className="group flex flex-col h-full bg-surface-container-lowest rounded-2xl md:rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-outline-variant/30"
    >
      <div className="relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden bg-surface-container flex items-center justify-center p-6">
        <img
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
          alt={title}
          src={image}
          loading="lazy"
        />
        {badge && (
          <div
            className={`absolute top-4 left-4 backdrop-blur text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
              badge.class === 'badge-nuevo' ? 'bg-tertiary' : 'bg-secondary'
            }`}
          >
            {badge.text}
          </div>
        )}
        <span className="absolute bottom-3 left-3 bg-white/90 text-on-surface-variant font-semibold text-[11px] px-2.5 py-0.5 rounded-md uppercase tracking-wider border border-outline-variant/30">
          {category}
        </span>
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h2 className="font-serif text-on-surface group-hover:text-primary transition-colors text-lg md:text-xl font-semibold line-clamp-1">
            {title}
          </h2>
        </div>

        <p className="font-sans text-sm text-on-surface-variant mb-4 flex-grow line-clamp-2 leading-relaxed">
          {desc}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 mt-auto">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-on-surface-variant block -mb-0.5 font-medium">
              Precio ARS
            </span>
            <span className="font-serif text-primary font-bold text-lg md:text-xl">
              {formatCurrency(price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              {swatches.map((color, idx) => (
                <div
                  key={idx}
                  className="w-3.5 h-3.5 rounded-full shadow-sm border border-white"
                  style={{ backgroundColor: color }}
                  title="Muestra"
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddClick}
              className="p-2 rounded-lg bg-surface-container text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer border-none flex items-center justify-center ml-1"
              title="Añadir a Cotización"
              aria-label={`Añadir ${title} a cotización`}
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">
                add_shopping_cart
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

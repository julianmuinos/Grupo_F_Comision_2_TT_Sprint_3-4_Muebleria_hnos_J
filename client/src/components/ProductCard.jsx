import React from 'react';

/**
 * Componente ProductCard
 * Tarjeta individual para presentar un mueble en el catálogo con:
 * - Precio formateado en moneda argentina ($ ARS)
 * - Badges visuales (Destacado / Sustentable) y etiqueta de categoría
 * - Botón de ver detalle y botón para cotizar (+ Cotizar)
 * 
 * Props:
 * - product: Objeto con los datos del producto (id, nombre, precio, imagen, categoria, stock, etc.)
 * - onSelectProduct: Función callback para ver el detalle completo del producto
 * - onAddToCart: Función callback para agregar al carrito / cotización
 */
const ProductCard = ({ product, onSelectProduct, onAddToCart }) => {
  if (!product) return null;

  // Formato oficial de moneda en pesos argentinos ($ ARS) sin decimales
  const precioFormateado = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(product.precio ?? product.price ?? 0);

  const hayStock = (product.stock ?? 0) > 0;
  const imagenSrc = product.imagen || product.image || product.foto;
  const nombre = product.nombre || product.title;

  return (
    <article className="product-card">
      {/* Contenedor de Imagen con Badges y Tag de Categoría */}
      <div
        className="product-image-container"
        onClick={() => onSelectProduct?.(product)}
        role="button"
        tabIndex={0}
        aria-label={`Ver detalles de ${nombre}`}
      >
        <img
          src={imagenSrc}
          alt={nombre}
          className="product-image"
          loading="lazy"
        />

        {/* Badges Condicionales */}
        {product.destacado && (
          <span className="product-badge badge-nuevo">Destacado</span>
        )}
        {!product.destacado && product.materiales && product.materiales.includes('FSC®') && (
          <span className="product-badge badge-sustentable">Sustentable</span>
        )}

        {/* Etiqueta de Categoría */}
        <span className="product-category-tag">{product.categoria || product.category}</span>
      </div>

      {/* Información del Producto */}
      <div className="product-info">
        <div className="product-header-line">
          <h3
            className="product-title"
            onClick={() => onSelectProduct?.(product)}
            title={nombre}
          >
            {nombre}
          </h3>
          {product.material && (
            <span className="product-material-pill">{product.material}</span>
          )}
        </div>

        <p className="product-short-desc">{product.descripcion}</p>

        <div className="product-meta">
          <div>
            <span className="product-price-label">Precio</span>
            <span className="product-price">{precioFormateado}</span>
          </div>
          <span className={`product-stock-status ${!hayStock ? 'out-of-stock' : ''}`}>
            {hayStock ? `${product.stock} en stock` : 'Sin stock'}
          </span>
        </div>

        {/* Acciones de la Tarjeta */}
        <div className="product-card-actions">
          <button
            type="button"
            className="btn btn-secondary-light"
            onClick={() => onSelectProduct?.(product)}
            aria-label={`Ver detalles de ${nombre}`}
          >
            Ver Detalle
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onAddToCart?.(product, 1)}
            disabled={!hayStock}
            aria-label={`Agregar ${nombre} a la cotización`}
          >
            + Cotizar
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

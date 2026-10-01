import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Componente ProductCard
 * Tarjeta individual basada en el diseño oficial de Hermanos Jota:
 * - Soporta vista en cuadrícula (grid) y vista en lista (list)
 * - Badges oficiales (NUEVO, SUSTENTABLE, AGOTADO)
 * - Botón de favorito interactivo (corazón ♡ / ♥)
 * - Muestras de color / swatches y stock disponible
 * - Precio formateado en moneda argentina ($ ARS)
 */
const ProductCard = ({ product, onSelectProduct, onAddToCart, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) return null;

  const precioFormateado = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(product.precio ?? product.price ?? 0);

  const hayStock = (product.stock ?? 0) > 0 && product.inStock !== false;
  const imagenSrc = product.imagen || product.image || product.foto;
  const nombre = product.nombre || product.title;
  const descripcion = product.descripcion || product.desc || '';
  const swatches = product.swatches || [];
  const stockLabel = product.stockLabel || (!hayStock ? 'Agotado' : null);

  // Badge condicional
  const badgeText = !hayStock
    ? 'AGOTADO'
    : product.badge?.text || product.badge || (product.destacado ? 'NUEVO' : null);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    if (hayStock) {
      onAddToCart?.(product, 1);
    }
  };

  const handleSelect = (e) => {
    e?.stopPropagation?.();
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      navigate(`/producto/${product.id}`);
    }
  };

  /* ==========================================
     VISTA EN LISTA (LIST VIEW)
     ========================================== */
  if (viewMode === 'list') {
    return (
      <article
        className="product-card-list"
        onClick={handleSelect}
        role="button"
        tabIndex={0}
        aria-label={`Ver detalles de ${nombre}`}
      >
        <div className="product-list-image-container">
          <img
            src={imagenSrc}
            alt={nombre}
            className="product-list-image"
            loading="lazy"
          />
          {badgeText && (
            <span
              className={`product-badge ${
                badgeText === 'NUEVO'
                  ? 'badge-nuevo'
                  : badgeText === 'SUSTENTABLE'
                  ? 'badge-sustentable'
                  : 'badge-agotado'
              }`}
            >
              {badgeText}
            </span>
          )}
        </div>

        <div className="product-list-info">
          <div className="product-list-header">
            <div className="product-list-title-row">
              <h3 className="product-title">{nombre}</h3>
              <span className="product-price">{precioFormateado}</span>
            </div>
            <p className="product-list-desc">{descripcion}</p>

            <div className="product-list-tags">
              <span className="tag-chip">{product.categoria || product.category}</span>
              {product.material && (
                <span className="tag-chip tag-material">{product.material}</span>
              )}
              {product.medidas && (
                <span className="tag-chip tag-spec">📐 {product.medidas}</span>
              )}
            </div>
          </div>

          <div className="product-list-footer">
            <div className="product-swatches-container">
              {swatches.map((color, idx) => (
                <span
                  key={idx}
                  className="color-swatch-dot"
                  style={{ backgroundColor: color }}
                  title="Tono disponible"
                />
              ))}
              {stockLabel && <span className="stock-label-pill">{stockLabel}</span>}
            </div>

            <div className="product-list-actions">
              <button
                type="button"
                className="favorite-heart-btn"
                onClick={handleFavoriteClick}
                title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
                aria-label="Favorito"
              >
                {isFavorite ? '♥' : '♡'}
              </button>
              <button
                type="button"
                className="btn btn-secondary-light btn-sm"
                onClick={handleSelect}
              >
                Ver detalle →
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleAddClick}
                disabled={!hayStock}
              >
                {hayStock ? '+ Cotizar' : 'Agotado'}
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  /* ==========================================
     VISTA EN CUADRÍCULA (GRID VIEW)
     ========================================== */
  return (
    <article
      className="product-card"
      onClick={handleSelect}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles de ${nombre}`}
    >
      {/* Contenedor de Imagen con Badge y Corazón */}
      <div className="product-image-container">
        <img
          src={imagenSrc}
          alt={nombre}
          className="product-image"
          loading="lazy"
        />

        {/* Badge superior izquierdo */}
        {badgeText && (
          <span
            className={`product-badge ${
              badgeText === 'NUEVO'
                ? 'badge-nuevo'
                : badgeText === 'SUSTENTABLE'
                ? 'badge-sustentable'
                : 'badge-agotado'
            }`}
          >
            {badgeText}
          </span>
        )}

        {/* Botón de Favorito superior derecho */}
        <button
          type="button"
          className={`card-favorite-btn ${isFavorite ? 'is-fav' : ''}`}
          onClick={handleFavoriteClick}
          title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          aria-label="Agregar a favoritos"
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      {/* Información del Producto */}
      <div className="product-info">
        <div className="product-card-title-group">
          <h3 className="product-title" title={nombre}>
            {nombre}
          </h3>
          <p className="product-short-desc">
            {product.specs?.materiales || product.materiales || descripcion}
          </p>
        </div>

        <div className="product-card-bottom-row">
          <span className="product-price">{precioFormateado}</span>

          <div className="product-card-swatches">
            {swatches.map((color, idx) => (
              <span
                key={idx}
                className="color-swatch-dot"
                style={{ backgroundColor: color }}
                title="Tono disponible"
              />
            ))}
            {stockLabel && <span className="stock-label-pill">{stockLabel}</span>}
          </div>
        </div>

        {/* Botón flotante/hover para agregar rápido a cotización */}
        <div className="product-card-quick-actions">
          <button
            type="button"
            className="btn btn-primary btn-quick-cotizar"
            onClick={handleAddClick}
            disabled={!hayStock}
          >
            {hayStock ? '+ Añadir a Cotización' : 'Agotado'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

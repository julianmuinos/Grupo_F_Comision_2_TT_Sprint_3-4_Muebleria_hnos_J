import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';

/**
 * Componente ProductList
 * Renderizado de lista de productos del catálogo con:
 * - Renderizado dinámico usando .map() y keys únicas
 * - Buscador en tiempo real por texto (nombre, descripción, categoría, material)
 * - Filtros por categoría interactivos (Todos, Asientos, Mesas, Almacenaje)
 * 
 * Props:
 * - products: Array de productos obtenidos de la API
 * - onSelectProduct: Función callback para seleccionar un producto y abrir su detalle
 * - onAddToCart: Función callback para añadir al carrito de cotización
 */
const ProductList = ({ products = [], onSelectProduct, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  // Categorías estándar del catálogo de Hermanos Jota
  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'asientos', label: 'Asientos' },
    { id: 'mesas', label: 'Mesas' },
    { id: 'almacenaje', label: 'Almacenaje' },
  ];

  // Filtrado reactivo optimizado con useMemo
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Filtrado por categoría
      const matchesCategory =
        selectedCategory === 'todos' ||
        product.categoria?.toLowerCase() === selectedCategory.toLowerCase() ||
        product.category?.toLowerCase() === selectedCategory.toLowerCase();

      if (!matchesCategory) return false;

      // 2. Filtrado por término de búsqueda
      if (!searchTerm.trim()) return true;

      const term = searchTerm.toLowerCase().trim();
      const matchName = product.nombre?.toLowerCase().includes(term);
      const matchDesc = product.descripcion?.toLowerCase().includes(term);
      const matchCategory = product.categoria?.toLowerCase().includes(term);
      const matchMaterials = product.materiales?.toLowerCase().includes(term);
      const matchMaterial = product.material?.toLowerCase().includes(term);

      return matchName || matchDesc || matchCategory || matchMaterials || matchMaterial;
    });
  }, [products, selectedCategory, searchTerm]);

  return (
    <section className="catalog-section" aria-labelledby="catalog-heading">
      {/* Encabezado del Catálogo con Buscador y Contador */}
      <div className="catalog-header">
        <div>
          <h2 id="catalog-heading" className="section-title">
            Colección de Muebles
          </h2>
          <p className="section-subtitle">
            Mostrando {filteredProducts.length} de {products.length} piezas de autor
          </p>
        </div>

        {/* Buscador en tiempo real */}
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por nombre, material o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Buscar productos en el catálogo"
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
              title="Limpiar búsqueda"
              aria-label="Limpiar campo de búsqueda"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filtros por Categoría */}
      <div className="category-filters" role="tablist" aria-label="Filtro de categorías">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={selectedCategory === cat.id}
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grilla de Productos Renderizada con .map() y keys */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        /* Estado vacío si no hay coincidencias */
        <div className="state-container">
          <div className="error-icon">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-muted)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <h3>No se encontraron muebles</h3>
          <p className="section-subtitle">
            No encontramos ningún producto que coincida con &quot;{searchTerm}&quot; en la categoría seleccionada.
          </p>
          <div style={{ marginTop: '1.25rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('todos');
              }}
            >
              Restablecer filtros
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductList;

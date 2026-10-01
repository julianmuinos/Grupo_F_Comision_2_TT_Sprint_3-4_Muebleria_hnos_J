import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';

/**
 * Componente ProductList
 * Catálogo interactivo de Hermanos Jota con diseño idéntico a la web oficial:
 * - Header superior con título, buscador integrado y chips de filtros rápidos
 * - Barra lateral izquierda con filtros de Categorías, Materiales con muestras de color
 *   y tarjeta de llamada a la acción "Servicio Bespoke"
 * - Barra de herramientas con contador de piezas, selector de ordenamiento y alternador de vista (Grid / List)
 * - Grilla de productos dinámica renderizada con .map() y keys únicas
 * - Paginación interactiva
 */
const ProductList = ({ products = [], onSelectProduct, onAddToCart }) => {
  const [searchInput, setSearchInput] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedMaterials, setSelectedMaterials] = useState(new Set());
  const [activeTag, setActiveTag] = useState(null);
  const [sortBy, setSortBy] = useState('novedades');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Categorías oficiales
  const categoryOptions = [
    { id: 'asientos', label: 'Asientos' },
    { id: 'mesas', label: 'Mesas' },
    { id: 'almacenaje', label: 'Almacenaje' },
    { id: 'accesorios', label: 'Accesorios' },
  ];

  // Materiales oficiales con muestras de color
  const materialOptions = [
    { id: 'nogal', label: 'Nogal', color: '#5c4033' },
    { id: 'roble', label: 'Roble Claro', color: '#d2b48c' },
    { id: 'ebano', label: 'Ébano', color: '#3a2f28' },
  ];

  // Tags rápidos oficiales
  const quickTags = [
    { id: 'madera-maciza', label: 'Madera Maciza' },
    { id: 'enchapados', label: 'Enchapados' },
    { id: 'edicion-limitada', label: 'Edición Limitada' },
  ];

  // Manejadores de filtros de categoría
  const handleCategoryToggle = (catId) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(catId)) next.delete(catId);
      else next.add(catId);
      return next;
    });
    setCurrentPage(1);
  };

  // Manejadores de filtros de material
  const handleMaterialToggle = (matId) => {
    setSelectedMaterials((prev) => {
      const next = new Set(prev);
      if (next.has(matId)) next.delete(matId);
      else next.add(matId);
      return next;
    });
    setCurrentPage(1);
  };

  // Manejador de Quick Tag
  const handleTagToggle = (tagId) => {
    setActiveTag((prev) => (prev === tagId ? null : tagId));
    setCurrentPage(1);
  };

  // Manejador de Búsqueda
  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    setActiveSearch(searchInput.trim());
    setCurrentPage(1);
  };

  // Filtrado y Ordenamiento
  const filteredProducts = useMemo(() => {
    const normalize = (str) =>
      str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : '';

    return products
      .filter((p) => {
        // 1. Filtro por búsqueda de texto
        if (activeSearch) {
          const q = normalize(activeSearch);
          const matchTitle = normalize(p.nombre || p.title).includes(q);
          const matchDesc = normalize(p.descripcion || p.desc).includes(q);
          const matchMat = normalize(p.material || p.materiales).includes(q);
          const matchCat = normalize(p.categoria || p.category).includes(q);
          if (!matchTitle && !matchDesc && !matchMat && !matchCat) return false;
        }

        // 2. Filtro por Categorías
        if (selectedCategories.size > 0) {
          const cat = (p.categoria || p.category || '').toLowerCase();
          if (!selectedCategories.has(cat)) return false;
        }

        // 3. Filtro por Materiales
        if (selectedMaterials.size > 0) {
          const mat = (p.material || '').toLowerCase();
          const mats = (p.materiales || '').toLowerCase();
          let match = false;
          selectedMaterials.forEach((m) => {
            if (mat.includes(m) || mats.includes(m)) match = true;
          });
          if (!match) return false;
        }

        // 4. Filtro por Tag Rápido
        if (activeTag) {
          const tags = p.tags || [];
          if (!tags.includes(activeTag)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'precio-asc') return (a.precio || 0) - (b.precio || 0);
        if (sortBy === 'precio-desc') return (b.precio || 0) - (a.precio || 0);
        if (sortBy === 'alfabetico') {
          return (a.nombre || a.title || '').localeCompare(b.nombre || b.title || '', 'es', {
            sensitivity: 'base',
          });
        }
        // Novedades por defecto
        const aIsNew = a.badge === 'NUEVO' || a.destacado ? 1 : 0;
        const bIsNew = b.badge === 'NUEVO' || b.destacado ? 1 : 0;
        if (aIsNew !== bIsNew) return bIsNew - aIsNew;
        return (a.id || 0) - (b.id || 0);
      });
  }, [products, activeSearch, selectedCategories, selectedMaterials, activeTag, sortBy]);

  // Paginación
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const resetAllFilters = () => {
    setSearchInput('');
    setActiveSearch('');
    setSelectedCategories(new Set());
    setSelectedMaterials(new Set());
    setActiveTag(null);
    setSortBy('novedades');
    setCurrentPage(1);
  };

  return (
    <section className="catalog-page-container" aria-labelledby="catalog-heading">
      {/* =========================================================
          BANNER SUPERIOR: NUESTRA COLECCIÓN & BUSCADOR
          ========================================================= */}
      <div className="catalog-hero-banner">
        <div className="catalog-hero-inner">
          <div className="catalog-hero-title-area">
            <h1 id="catalog-heading" className="catalog-hero-title">
              Nuestra Colección
            </h1>
            <p className="catalog-hero-subtitle">
              Piezas únicas, donde la honestidad del material y la precisión del diseño convergen.
            </p>
          </div>

          <div className="catalog-hero-search-area">
            <form className="catalog-search-form" onSubmit={handleSearchSubmit}>
              <div className="search-bar-unified">
                <svg
                  className="search-icon-svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  className="catalog-search-input"
                  placeholder="Buscar por material, línea o tipo..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  aria-label="Buscar en el catálogo"
                />
                {searchInput && (
                  <button
                    type="button"
                    className="clear-search-x"
                    onClick={() => {
                      setSearchInput('');
                      setActiveSearch('');
                    }}
                    title="Borrar texto"
                  >
                    ✕
                  </button>
                )}
                <button type="submit" className="btn-search-solid">
                  Buscar
                </button>
              </div>
            </form>

            {/* Quick Filters / Tags */}
            <div className="catalog-quick-tags-row">
              {quickTags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  className={`quick-tag-pill ${activeTag === tag.id ? 'active' : ''}`}
                  onClick={() => handleTagToggle(tag.id)}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          ÁREA PRINCIPAL: SIDEBAR + LISTADO DE PRODUCTOS
          ========================================================= */}
      <div className="catalog-content-layout">
        {/* BARRA LATERAL (FILTROS) */}
        <aside className="catalog-sidebar" aria-label="Filtros del catálogo">
          <div className="sidebar-filter-header">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="6" y1="12" x2="18" y2="12" />
              <line x1="8" y1="18" x2="16" y2="18" />
            </svg>
            <span>FILTRAR</span>
          </div>

          {/* Filtro: Categorías */}
          <div className="sidebar-group">
            <h3 className="sidebar-group-title">Categorías</h3>
            <ul className="sidebar-checkbox-list">
              {categoryOptions.map((cat) => {
                const isChecked = selectedCategories.has(cat.id);
                return (
                  <li key={cat.id}>
                    <label className="sidebar-checkbox-label">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCategoryToggle(cat.id)}
                        className="custom-checkbox"
                      />
                      <span className="checkbox-text">{cat.label}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Filtro: Materiales */}
          <div className="sidebar-group">
            <h3 className="sidebar-group-title">Materiales</h3>
            <ul className="sidebar-material-list">
              {materialOptions.map((mat) => {
                const isChecked = selectedMaterials.has(mat.id);
                return (
                  <li key={mat.id}>
                    <label className="sidebar-material-label">
                      <div
                        className={`material-swatch-box ${isChecked ? 'checked' : ''}`}
                        style={{ backgroundColor: mat.color }}
                      >
                        {isChecked && <span className="swatch-check">✓</span>}
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleMaterialToggle(mat.id)}
                        className="sr-only"
                      />
                      <span className="material-text">{mat.label}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL: TOOLBAR + PRODUCTOS + PAGINACIÓN */}
        <div className="catalog-products-column">
          {/* TOOLBAR SUPERIOR */}
          <div className="catalog-toolbar">
            <div className="toolbar-counter">
              Mostrando <strong className="counter-current">{currentItems.length}</strong> de{' '}
              <strong className="counter-total">{totalItems}</strong> piezas
            </div>

            <div className="toolbar-controls-right">
              {/* Dropdown de ordenamiento */}
              <div className="sort-control-wrapper">
                <label htmlFor="sortSelect" className="sort-label">
                  ORDENAR POR:
                </label>
                <select
                  id="sortSelect"
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="novedades">Novedades</option>
                  <option value="precio-asc">Precio: Menor a Mayor</option>
                  <option value="precio-desc">Precio: Mayor a Menor</option>
                  <option value="alfabetico">Nombre A-Z</option>
                </select>
              </div>

              {/* Botones de conmutación de vista (Grid / List) */}
              <div className="view-mode-toggles" role="group" aria-label="Modo de visualización">
                <button
                  type="button"
                  className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Vista en cuadrícula"
                  aria-label="Vista en cuadrícula"
                >
                  {/* Icono Grid 田 */}
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="Vista en lista"
                  aria-label="Vista en lista"
                >
                  {/* Icono List ☰ */}
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* GRILLA / LISTA DE PRODUCTOS */}
          {currentItems.length > 0 ? (
            <div className={viewMode === 'grid' ? 'catalog-grid-3cols' : 'catalog-list-view'}>
              {currentItems.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                  onAddToCart={onAddToCart}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="catalog-empty-state">
              <p className="empty-state-title">No se encontraron piezas</p>
              <p className="empty-state-desc">
                Prueba modificando los filtros o realizando otra búsqueda.
              </p>
              <button type="button" className="btn btn-primary" onClick={resetAllFilters}>
                Limpiar Filtros
              </button>
            </div>
          )}

          {/* PAGINACIÓN OFICIAL */}
          {totalPages > 1 && (
            <nav className="catalog-pagination-bar" aria-label="Paginación del catálogo">
              <button
                type="button"
                className="pagination-arrow-btn"
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                aria-label="Página anterior"
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  className={`pagination-num-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentPage(pageNum);
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  aria-current={currentPage === pageNum ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                className="pagination-arrow-btn"
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                aria-label="Página siguiente"
              >
                ›
              </button>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductList;

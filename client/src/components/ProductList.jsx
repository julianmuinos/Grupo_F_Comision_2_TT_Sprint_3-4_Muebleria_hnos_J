import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS_DATA } from '../data/products';

export default function ProductList({
  products = PRODUCTS_DATA,
  onSelectProduct = () => {},
  onAddToCart = () => {},
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedMaterial, setSelectedMaterial] = useState('todos');
  const [selectedTag, setSelectedTag] = useState(null);
  const [sortBy, setSortBy] = useState('novedades');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtrado y ordenamiento computado
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Búsqueda por texto (insensible a acentos y mayúsculas)
        if (searchQuery.trim()) {
          const normalize = (str) =>
            str
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase();
          const q = normalize(searchQuery.trim());
          const matchTitle = normalize(p.title).includes(q);
          const matchDesc = normalize(p.desc || '').includes(q);
          const matchMaterial = normalize(p.material || '').includes(q);
          const matchCategory = normalize(p.category || '').includes(q);
          if (!matchTitle && !matchDesc && !matchMaterial && !matchCategory) {
            return false;
          }
        }

        // Filtro por categoría
        if (selectedCategory !== 'todas' && p.category !== selectedCategory) {
          return false;
        }

        // Filtro por material
        if (selectedMaterial !== 'todos' && p.material !== selectedMaterial) {
          return false;
        }

        // Filtro por etiqueta rápida
        if (selectedTag && !p.tags?.includes(selectedTag)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'precio-asc') return a.price - b.price;
        if (sortBy === 'precio-desc') return b.price - a.price;
        if (sortBy === 'alfabetico') {
          return a.title.localeCompare(b.title, 'es', { sensitivity: 'base' });
        }
        if (sortBy === 'novedades') {
          const aIsNew = a.badge && a.badge.text === 'NUEVO' ? 1 : 0;
          const bIsNew = b.badge && b.badge.text === 'NUEVO' ? 1 : 0;
          if (aIsNew !== bIsNew) return bIsNew - aIsNew;
          return a.id - b.id;
        }
        return 0;
      });
  }, [products, searchQuery, selectedCategory, selectedMaterial, selectedTag, sortBy]);

  // Paginación
  const totalCount = filteredProducts.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('todas');
    setSelectedMaterial('todos');
    setSelectedTag(null);
    setSortBy('novedades');
    setCurrentPage(1);
  };

  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
    setCurrentPage(1);
  };

  return (
    <section className="w-full bg-surface pt-24 pb-20">
      <div className="flex flex-col w-full">
        {/* Banner Superior con Buscador y Filtros Rápidos */}
        <div className="w-full bg-surface-container py-10 md:py-16 px-4 sm:px-8 md:px-12 rounded-b-2xl shadow-sm mb-12 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -left-32 w-72 h-72 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
            <div className="flex-1 max-w-2xl">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2 block">
                Catálogo Artesanal · 2026
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-on-surface mb-3 font-bold uppercase tracking-[0.08em]">
                Nuestra Colección
              </h1>
              <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
                Piezas únicas donde la honestidad de la madera nativa y la precisión del diseño atemporal convergen.
              </p>
            </div>

            {/* Caja de Búsqueda */}
            <div className="flex-1 w-full max-w-md">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary">
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    search
                  </span>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Buscar por nombre, madera, material..."
                  className="w-full pl-12 pr-12 py-3.5 bg-surface text-on-surface font-sans text-sm rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 border border-outline-variant/40 transition-all placeholder:text-on-surface-variant/60"
                  aria-label="Buscar productos"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-3 flex items-center text-on-surface-variant hover:text-primary cursor-pointer border-none bg-transparent"
                    title="Limpiar búsqueda"
                  >
                    <span className="material-symbols-outlined text-lg" aria-hidden="true">
                      close
                    </span>
                  </button>
                )}
              </div>

              {/* Etiquetas Rápidas (Tags) */}
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { id: 'madera-maciza', label: 'Madera Maciza' },
                  { id: 'enchapados', label: 'Enchapados' },
                  { id: 'edicion-limitada', label: 'Edición Limitada' },
                ].map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleTagClick(tag.id)}
                    className={`font-sans text-xs px-3 py-1 rounded-full shadow-sm cursor-pointer transition-colors border-none ${
                      selectedTag === tag.id
                        ? 'bg-primary text-white font-bold'
                        : 'bg-surface text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    {tag.label}
                  </button>
                ))}
                {selectedTag && (
                  <button
                    type="button"
                    onClick={() => setSelectedTag(null)}
                    className="text-xs text-primary font-bold hover:underline cursor-pointer bg-transparent border-none py-1"
                  >
                    × Quitar tag
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Área Principal: Filtros + Grilla */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12 w-full pb-16">
          {/* Barra de Filtros y Herramientas */}
          <div className="flex flex-col gap-6 mb-8 pb-6 border-b border-outline-variant/30">
            {/* Categorías (Pills) */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                {[
                  { id: 'todas', label: 'Todas las piezas' },
                  { id: 'asientos', label: 'Asientos & Sillones' },
                  { id: 'mesas', label: 'Mesas & Escritorios' },
                  { id: 'almacenaje', label: 'Almacenaje & Bibliotecas' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-surface text-on-surface-variant border-outline-variant/40 hover:bg-surface-container'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Botones de Vista (Grid / List) */}
              <div className="flex items-center gap-1 bg-surface-container p-1 rounded-xl" role="group" aria-label="Modo de visualización">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg cursor-pointer transition-colors border-none ${
                    viewMode === 'grid'
                      ? 'bg-white text-primary shadow-sm'
                      : 'bg-transparent text-on-surface-variant hover:text-primary'
                  }`}
                  title="Vista en cuadrícula"
                  aria-label="Vista en cuadrícula"
                >
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    grid_view
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg cursor-pointer transition-colors border-none ${
                    viewMode === 'list'
                      ? 'bg-white text-primary shadow-sm'
                      : 'bg-transparent text-on-surface-variant hover:text-primary'
                  }`}
                  title="Vista en lista"
                  aria-label="Vista en lista"
                >
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    view_list
                  </span>
                </button>
              </div>
            </div>

            {/* Sub-barra: Materiales, Ordenamiento y Conteo */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-on-surface-variant">
              {/* Filtro de Madera/Material */}
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest font-semibold text-on-surface">
                  Madera:
                </span>
                {[
                  { id: 'todos', label: 'Todas' },
                  { id: 'nogal', label: 'Nogal' },
                  { id: 'roble', label: 'Roble' },
                  { id: 'ebano', label: 'Ébano' },
                ].map((mat) => (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => {
                      setSelectedMaterial(mat.id);
                      setCurrentPage(1);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer border-none ${
                      selectedMaterial === mat.id
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'bg-transparent text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    {mat.label}
                  </button>
                ))}
              </div>

              {/* Ordenar y Total */}
              <div className="flex items-center gap-6">
                <span>
                  Mostrando <strong className="text-on-surface">{Math.min(totalCount, paginatedProducts.length)}</strong> de{' '}
                  <strong className="text-on-surface">{totalCount}</strong> piezas
                </span>

                <div className="flex items-center gap-2">
                  <label htmlFor="sortSelect" className="text-xs uppercase tracking-widest font-semibold text-on-surface">
                    Ordenar:
                  </label>
                  <select
                    id="sortSelect"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-surface border border-outline-variant/40 rounded-lg px-3 py-1.5 text-xs text-on-surface font-medium focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="novedades">Novedades</option>
                    <option value="precio-asc">Precio: Menor a Mayor</option>
                    <option value="precio-desc">Precio: Mayor a Menor</option>
                    <option value="alfabetico">Nombre A-Z</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Estado Vacío */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 px-4 max-w-md mx-auto text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl text-outline-variant mb-4" aria-hidden="true">
                chair
              </span>
              <h2 className="font-serif text-2xl text-on-surface mb-2 font-bold">
                No se encontraron piezas
              </h2>
              <p className="text-sm mb-6 leading-relaxed">
                Prueba ajustando los filtros de categoría, madera o realizando otra búsqueda.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-primary text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-primary-hover transition-colors cursor-pointer border-none shadow-sm"
              >
                Limpiar Filtros
              </button>
            </div>
          ) : (
            <>
              {/* Grilla o Lista de Productos */}
              <div
                className={
                  viewMode === 'list'
                    ? 'flex flex-col gap-6'
                    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'
                }
              >
                {paginatedProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    viewMode={viewMode}
                    onSelectProduct={onSelectProduct}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="mt-14 flex justify-center items-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface border border-outline-variant/40 text-on-surface-variant hover:bg-primary hover:text-white transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                    aria-label="Página anterior"
                  >
                    <span className="material-symbols-outlined text-lg" aria-hidden="true">
                      chevron_left
                    </span>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
                        currentPage === page
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-surface text-on-surface-variant border-outline-variant/40 hover:bg-surface-container'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface border border-outline-variant/40 text-on-surface-variant hover:bg-primary hover:text-white transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                    aria-label="Página siguiente"
                  >
                    <span className="material-symbols-outlined text-lg" aria-hidden="true">
                      chevron_right
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

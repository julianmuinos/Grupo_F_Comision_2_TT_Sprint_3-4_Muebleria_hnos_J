import React, { useState, useEffect } from 'react';
import './App.css';

// URL de la API del Backend (Express)
const API_URL = 'http://localhost:5000/api/productos';

function App() {
  // 1. Estado para almacenar los productos de la API
  const [products, setProducts] = useState([]);

  // 2. Estados para el ciclo de vida de la petición asíncrona
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Conexión asíncrona al backend usando fetch con manejo de carga, éxito y error
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Error en el servidor: Código HTTP ${response.status}`);
      }

      const json = await response.json();

      // Formato esperado: { status: 'success', data: [...] }
      if (json && Array.isArray(json.data)) {
        setProducts(json.data);
      } else if (Array.isArray(json)) {
        setProducts(json);
      } else {
        throw new Error('El formato de datos devuelto por la API no es válido.');
      }
    } catch (err) {
      console.error('Error al obtener productos desde la API:', err);
      setError(
        'No se pudo conectar con el servidor backend en http://localhost:5000. ' +
        'Asegúrate de que la API de Express esté corriendo con "npm start" dentro de /backend.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al montar el componente (useEffect)
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="app-container">
      {/* Header básico de la aplicación */}
      <header className="navbar-container">
        <div className="navbar-content">
          <div className="brand">
            <img src="/assets/images/logo.svg" alt="Hermanos Jota" className="brand-logo-img" />
            <div className="brand-text">
              <span className="brand-name">HERMANOS JOTA</span>
              <span className="brand-tagline">Buenos Aires · 2026</span>
            </div>
          </div>
          <nav className="nav-links">
            <span className="nav-button active">Catálogo</span>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-overlay">
          <div className="hero-text-content">
            <span className="hero-subtitle">Colección 2026 · Diseño de Autor</span>
            <h1 className="hero-title">Muebles que alimentan el alma</h1>
            <p className="hero-description">
              Inspirados en la calidez de los años 60 y la nobleza de las maderas argentinas.
            </p>
          </div>
        </div>
      </section>

      {/* Contenido Principal: Ciclo de vida de la petición fetch */}
      <main className="main-content">
        {/* Estado 1: Cargando */}
        {loading && (
          <div className="state-container loading-container">
            <div className="spinner" />
            <h2>Cargando catálogo de muebles...</h2>
            <p>Conectando con la API REST en {API_URL}</p>
          </div>
        )}

        {/* Estado 2: Error en la conexión */}
        {!loading && error && (
          <div className="state-container error-container">
            <div className="error-icon">⚠️</div>
            <h2>Error de Conexión</h2>
            <p className="error-detail">{error}</p>
            <button type="button" className="btn btn-primary" onClick={fetchProducts}>
              🔄 Reintentar conexión
            </button>
          </div>
        )}

        {/* Estado 3: Éxito en la conexión y datos recibidos */}
        {!loading && !error && (
          <section className="catalog-section">
            <div className="catalog-header">
              <div>
                <h2 className="section-title">Colección de Muebles</h2>
                <p className="section-subtitle">
                  {products.length} productos cargados dinámicamente desde el backend.
                </p>
              </div>
            </div>

            <div className="products-grid">
              {products.map((item) => (
                <article key={item.id} className="product-card">
                  <div className="product-image-container">
                    <img src={item.imagen} alt={item.nombre} className="product-image" />
                    <span className="product-category-tag">{item.categoria}</span>
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{item.nombre}</h3>
                    <p className="product-short-desc">{item.descripcion}</p>
                    <div className="product-meta">
                      <span className="product-price">
                        {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(item.precio)}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;

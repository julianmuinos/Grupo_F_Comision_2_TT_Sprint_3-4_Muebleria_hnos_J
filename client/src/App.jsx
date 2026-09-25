import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CartModal from './components/CartModal';
import './App.css';

// URL de la API del Backend (Express)
const API_URL = 'http://localhost:5000/api/productos';

function App() {
  // 1. Estado para almacenar los productos de la API
  const [products, setProducts] = useState([]);

  // 2. Estados para el ciclo de vida de la petición asíncrona
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Estado global del Carrito de Compras en App.jsx con persistencia en localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('hnosj_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Estado para visibilidad del modal del carrito
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persistir en localStorage ante cualquier modificación del carrito
  useEffect(() => {
    try {
      localStorage.setItem('hnosj_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error al guardar el carrito:', e);
    }
  }, [cart]);

  // 4. Conexión asíncrona al backend usando fetch
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Error en el servidor: Código HTTP ${response.status}`);
      }

      const json = await response.json();

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

  useEffect(() => {
    fetchProducts();
  }, []);

  // 5. Cálculo de cantidad total de artículos para pasar al Navbar vía props
  const cartCount = cart.reduce((total, item) => total + item.cantidad, 0);

  // 6. Funciones inmutables para manipulación del estado del carrito
  const handleAddToCart = (product, quantityToAdd = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        const currentItem = updated[existingIndex];
        const newQty = Math.min(product.stock || 99, currentItem.cantidad + quantityToAdd);
        updated[existingIndex] = { ...currentItem, cantidad: newQty };
        return updated;
      } else {
        return [...prevCart, { ...product, cantidad: Math.min(product.stock || 99, quantityToAdd) }];
      }
    });
  };

  const handleUpdateQuantity = (productId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === productId) {
            const nuevaCantidad = item.cantidad + delta;
            return nuevaCantidad > 0 ? { ...item, cantidad: Math.min(item.stock || 99, nuevaCantidad) } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="app-container">
      {/* Barra de Navegación con contador de carrito vía props */}
      <Navbar
        cartCount={cartCount}
        currentView="catalogo"
        onNavigate={() => {}}
        onOpenCart={() => setIsCartOpen(true)}
      />

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

      {/* Contenido Principal */}
      <main className="main-content">
        {loading && (
          <div className="state-container loading-container">
            <div className="spinner" />
            <h2>Cargando catálogo de muebles...</h2>
            <p>Conectando con la API REST en {API_URL}</p>
          </div>
        )}

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

        {!loading && !error && (
          <section className="catalog-section">
            <div className="catalog-header">
              <div>
                <h2 className="section-title">Colección de Muebles</h2>
                <p className="section-subtitle">
                  {products.length} productos disponibles en catálogo.
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
                    <div className="product-card-actions">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleAddToCart(item, 1)}
                      >
                        + Cotizar 👜
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Modal / Drawer del Carrito */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
    </div>
  );
}

export default App;

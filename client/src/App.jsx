import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import CartModal from './components/CartModal';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
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

  // Estado para el producto seleccionado en el catálogo (para detalle condicional)
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Persistir en localStorage ante cualquier modificación del carrito
  useEffect(() => {
    try {
      localStorage.setItem('hnosj_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error al guardar el carrito:', e);
    }
  }, [cart]);

  // 4. Conexión asíncrona al backend usando fetch
  const fetchProducts = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Error en el servidor: Código HTTP ${response.status}`);
        }
        const json = await response.json();
        if (!ignore) {
          if (json && Array.isArray(json.data)) {
            setProducts(json.data);
          } else if (Array.isArray(json)) {
            setProducts(json);
          } else {
            throw new Error('El formato de datos devuelto por la API no es válido.');
          }
        }
      } catch (err) {
        console.error('Error al obtener productos desde la API:', err);
        if (!ignore) {
          setError(
            'No se pudo conectar con el servidor backend en http://localhost:5000. ' +
            'Asegúrate de que la API de Express esté corriendo con "npm start" dentro de /backend.'
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      ignore = true;
    };
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
        currentView={selectedProduct ? 'detalle' : 'catalogo'}
        onNavigate={(view) => {
          if (view === 'catalogo') {
            setSelectedProduct(null);
          }
        }}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Hero Banner (visible cuando se visualiza el catálogo) */}
      {!selectedProduct && (
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
      )}

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
            <div className="error-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#B91C1C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
            </div>
            <h2>Error de Conexión</h2>
            <p className="error-detail">{error}</p>
            <button type="button" className="btn btn-primary" onClick={fetchProducts}>
              Reintentar conexión
            </button>
          </div>
        )}

        {/* Renderizado condicional: Detalle de Producto o Lista del Catálogo */}
        {!loading && !error && (
          selectedProduct ? (
            <ProductDetail
              product={selectedProduct}
              onBack={() => {
                setSelectedProduct(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onAddToCart={handleAddToCart}
            />
          ) : (
            <ProductList
              products={products}
              onSelectProduct={(product) => {
                setSelectedProduct(product);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onAddToCart={handleAddToCart}
            />
          )
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

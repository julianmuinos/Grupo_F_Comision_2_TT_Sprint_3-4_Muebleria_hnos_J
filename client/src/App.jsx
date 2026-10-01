import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import CartModal from './components/CartModal';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import HomeView from './components/HomeView';
import ContactView from './components/ContactView';
import Footer from './components/Footer';
import './App.css';

// URL de la API del Backend (Express con soporte de variable de entorno)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/productos';

// Función auxiliar para consultar la API de productos
const requestProducts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Error en el servidor: Código HTTP ${response.status}`);
  }
  const json = await response.json();
  if (json && Array.isArray(json.data)) {
    return json.data;
  }
  if (Array.isArray(json)) {
    return json;
  }
  throw new Error('El formato de datos devuelto por la API no es válido.');
};

function App() {
  // 1. Estado para almacenar los productos de la API
  const [products, setProducts] = useState([]);

  // 2. Estados para el ciclo de vida de la petición asíncrona
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Vista actual activa ('inicio' | 'catalogo' | 'contacto')
  const [currentView, setCurrentView] = useState('inicio');

  // 4. Estado global del Carrito de Compras en App.jsx con persistencia en localStorage
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

  // Manejador para reintentar la conexión bajo demanda (evento de usuario)
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await requestProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error al obtener productos desde la API:', err);
      setError(
        `No se pudo conectar con el servidor backend en ${API_URL}. ` +
        'Asegúrate de que la API de Express esté corriendo con "npm start" dentro de /backend.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Carga inicial asíncrona al montar el componente (con control de desmontaje)
  useEffect(() => {
    let ignore = false;

    requestProducts()
      .then((data) => {
        if (!ignore) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.error('Error al obtener productos desde la API:', err);
        if (!ignore) {
          setError(
            `No se pudo conectar con el servidor backend en ${API_URL}. ` +
            'Asegúrate de que la API de Express esté corriendo con "npm start" dentro de /backend.'
          );
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

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

  const handleNavigate = (view) => {
    setSelectedProduct(null);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Barra de Navegación con contador de carrito vía props */}
      <Navbar
        cartCount={cartCount}
        currentView={selectedProduct ? 'detalle' : currentView}
        onNavigate={handleNavigate}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Contenido Principal */}
      <main className={`main-content ${currentView === 'inicio' && !selectedProduct ? 'main-content-home' : ''}`}>
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

        {/* Renderizado condicional según la vista activa */}
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
          ) : currentView === 'inicio' ? (
            <HomeView
              products={products}
              onNavigate={handleNavigate}
              onSelectProduct={handleSelectProduct}
            />
          ) : currentView === 'contacto' ? (
            <ContactView />
          ) : (
            <ProductList
              products={products}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
            />
          )
        )}
      </main>

      {/* Footer Oficial Hermanos Jota Heritage */}
      <Footer onNavigate={handleNavigate} />

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

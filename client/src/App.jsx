import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ContactForm from './components/ContactForm';
import { PRODUCTS_DATA, formatCurrency } from './data/products';
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import CartModal from './components/CartModal';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import HomeView from './components/HomeView';
import ContactView from './components/ContactView';
import Footer from './components/Footer';
import './App.css';

// URL de la API del Backend (Express)
const API_URL = 'http://localhost:5000/api/productos';

function App() {
  const [currentView, setCurrentView] = useState('inicio');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS_DATA[0]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Muestra de notificación toast
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Manejo de agregar a cotización / carrito
  const handleAddToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`"${product.title}" añadido a tu cotización.`);
  };

  // Modificar cantidad en carrito
  const updateCartQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Total de piezas en el carrito
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Total estimado en pesos
  const cartTotalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Navegar a detalle de producto
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView('detalle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navegación general
  const handleNavigate = (view) => {
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

  const handleNavigate = (view) => {
    setSelectedProduct(null);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container min-h-screen flex flex-col justify-between bg-surface text-on-surface">
      {/* NAVBAR */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        cartCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* TOAST GLOBAL */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 toast-box">
          <span className="material-symbols-outlined text-secondary" aria-hidden="true">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL SEGÚN VISTA */}
      <main className="flex-grow">
        {currentView === 'inicio' && (
          <section className="flex flex-col">
            {/* HERO BANNER */}
            <div className="hero-banner relative flex items-center justify-center pt-28 pb-20 md:py-32">
              <div className="hero-overlay w-full max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12">
                <div className="hero-text-content max-w-2xl">
                  <span className="hero-subtitle">
                    Colección 2026 · Diseño de Autor
                  </span>
                  <h1 className="hero-title">
                    Muebles que alimentan el alma
                  </h1>
                  <p className="hero-description">
                    Inspirados en la calidez de los años 60 y la nobleza de las maderas argentinas. Cada pieza es elaborada artesanalmente para trascender generaciones.
                  </p>
                  <div className="hero-actions">
                    <button
                      type="button"
                      onClick={() => handleNavigate('catalogo')}
                      className="btn btn-primary btn-large cursor-pointer shadow-lg"
                    >
                      Explorar Colección
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavigate('contacto')}
                      className="btn btn-secondary-light btn-large cursor-pointer"
                    >
                      Visitar Showroom
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* PIEZAS DESTACADAS EN INICIO */}
            <section className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12 py-16 md:py-24 w-full">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] block mb-2">
                    Destacados de Temporada
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl text-on-surface font-bold uppercase tracking-[0.06em]">
                    Piezas Singulares
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => handleNavigate('catalogo')}
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider hover:underline bg-transparent border-none cursor-pointer p-0"
                >
                  Ver las 11 piezas del catálogo{' '}
                  <span className="material-symbols-outlined text-base" aria-hidden="true">
                    arrow_forward
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS_DATA.slice(0, 4).map((item) => (
                  <article
                    key={item.id}
                    onClick={() => handleSelectProduct(item)}
                    className="group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer border border-outline-variant/30"
                  >
                    <div className="relative aspect-square overflow-hidden bg-surface-container flex items-center justify-center p-6">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      {item.badge && (
                        <span className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {item.badge.text}
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-grow justify-between">
                      <div>
                        <span className="text-[11px] text-on-surface-variant uppercase tracking-wider block mb-1 font-semibold">
                          {item.category}
                        </span>
                        <h3 className="font-serif text-base font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                      </div>
                      <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                        <span className="font-serif text-primary font-bold text-base">
                          {formatCurrency(item.price)}
                        </span>
                        <span className="text-xs text-primary font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center">
                          Ver ›
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* SECCIÓN FILOSOFÍA & SUSTENTABILIDAD */}
            <section className="bg-surface-container py-16 md:py-24 border-y border-outline-variant/30">
              <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                      forest
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-on-surface">Maderas Certificadas</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Trabajamos exclusivamente con nogal, roble y algarrobo provenientes de bosques gestionados de forma sustentable (FSC®).
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                      carpenter
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-on-surface">Herencia de Autor</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Uniones de caja y espiga ensambladas a mano por ebanistas con décadas de oficio en el barrio porteño de San Cristóbal.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                      all_inclusive
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-on-surface">Diseño Atemporal</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Líneas puras y acabados en aceites orgánicos que envejecen con dignidad, adquiriendo mayor belleza con el paso del tiempo.
                  </p>
                </div>
              </div>
            </section>
          </section>
        )}

        {currentView === 'catalogo' && (
          <ProductList
            products={PRODUCTS_DATA}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentView === 'detalle' && (
          <ProductDetail
            product={selectedProduct}
            onBack={() => handleNavigate('catalogo')}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'contacto' && (
          <ContactForm
            onSubmitSuccess={(data) => {
              showToast(`¡Gracias ${data.name}! Consulta recibida correctamente.`);
            }}
          />
        )}
      </main>

      {/* FOOTER */}
      <Footer onNavigate={handleNavigate} />

      {/* DRAWER / MODAL DE CARRITO Y COTIZACIÓN */}
      {isCartOpen && (
        <div
          className="cart-backdrop"
          onClick={() => setIsCartOpen(false)}
          aria-hidden="true"
        >
          <div
            className="cart-drawer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de Cotización"
          >
            <div className="cart-header">
              <div className="cart-title-row">
                <span className="material-symbols-outlined text-2xl text-primary" aria-hidden="true">
                  shopping_bag
                </span>
                <h2>Tu Cotización</h2>
                <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full ml-1">
                  {cartItemCount}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="close-btn"
                aria-label="Cerrar cotización"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  close
                </span>
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty-view">
                <span className="material-symbols-outlined text-6xl text-outline-variant" aria-hidden="true">
                  production_quantity_limits
                </span>
                <h3 className="font-serif text-xl font-bold text-on-surface">Tu cotización está vacía</h3>
                <p className="text-xs text-on-surface-variant max-w-xs">
                  Recorre nuestro catálogo y añade piezas para armar tu presupuesto formal con atención personalizada.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    handleNavigate('catalogo');
                  }}
                  className="btn btn-primary px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider mt-2 cursor-pointer"
                >
                  Ver Catálogo
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items-list">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.title} className="cart-item-image" />
                      <div className="cart-item-details">
                        <h4 className="cart-item-title">{item.title}</h4>
                        <p className="cart-item-price">{formatCurrency(item.price)}</p>
                        <div className="cart-item-controls">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="qty-btn-mini cursor-pointer"
                            aria-label="Restar una unidad"
                          >
                            -
                          </button>
                          <span className="cart-item-qty">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="qty-btn-mini cursor-pointer"
                            aria-label="Sumar una unidad"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, -item.quantity)}
                            className="remove-btn text-xs text-red-600 hover:underline cursor-pointer border-none bg-transparent ml-3"
                          >
                            Quitar
                          </button>
                        </div>
                      </div>
                      <div className="cart-item-total">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-summary-line total-line font-bold">
                    <span>Total Estimado:</span>
                    <span className="total-amount font-serif text-xl">{formatCurrency(cartTotalAmount)}</span>
                  </div>
                  <div className="free-shipping-hint">
                    ✓ Envío y coordinación personalizada incluida para CABA y GBA.
                  </div>
                  <div className="cart-actions-group">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCartOpen(false);
                        handleNavigate('contacto');
                        showToast('Envíanos tu consulta para formalizar el presupuesto.');
                      }}
                      className="btn btn-primary btn-checkout font-semibold uppercase tracking-wider cursor-pointer"
                    >
                      Solicitar Presupuesto Formal
                    </button>
                    <button
                      type="button"
                      onClick={() => setCart([])}
                      className="btn-text text-xs text-on-surface-variant hover:text-red-600 py-1 cursor-pointer bg-transparent border-none text-center"
                    >
                      Vaciar cotización
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
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

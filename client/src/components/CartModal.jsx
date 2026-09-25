import React, { useState } from 'react';

/**
 * Componente CartModal
 * Modal deslizable o ventana emergente que muestra los artículos en el carrito.
 * Props:
 * - isOpen: booleano que indica si el modal está visible
 * - onClose: función para cerrar el modal
 * - cart: array de productos con sus cantidades [{ ...producto, cantidad }]
 * - onUpdateQuantity: (id, delta) => void
 * - onRemoveItem: (id) => void
 * - onClearCart: () => void
 */
const CartModal = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  // Cálculo del subtotal y total
  const subtotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const envioGratis = subtotal >= 100000;
  const costoEnvio = subtotal > 0 && !envioGratis ? 8500 : 0;
  const total = subtotal + costoEnvio;

  const formatoMoneda = (valor) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(valor);
  };

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutComplete(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div className="cart-title-row">
            <span className="cart-icon-large">🛒</span>
            <h2>Tu Carrito de Compras</h2>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Cerrar carrito">
            ✕
          </button>
        </div>

        {checkoutComplete ? (
          <div className="checkout-success-view">
            <div className="success-emoji">🎉</div>
            <h3>¡Pedido confirmado con éxito!</h3>
            <p>Gracias por confiar en <strong>Mueblería Hermanos Jota</strong>. Te hemos enviado un correo con el detalle de entrega y factura.</p>
            <p className="redirect-note">Cerrando el carrito...</p>
          </div>
        ) : cart.length === 0 ? (
          <div className="cart-empty-view">
            <div className="cart-empty-icon">🛋️</div>
            <h3>Tu carrito está vacío</h3>
            <p>Aún no agregaste muebles a tu pedido.</p>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Explorar el catálogo
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.imagen} alt={item.nombre} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{item.nombre}</h4>
                    <p className="cart-item-price">{formatoMoneda(item.precio)} c/u</p>
                    <div className="cart-item-controls">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="qty-btn-mini"
                        title="Restar uno"
                      >
                        -
                      </button>
                      <span className="cart-item-qty">{item.cantidad}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="qty-btn-mini"
                        disabled={item.cantidad >= item.stock}
                        title="Sumar uno"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="remove-btn"
                        title="Eliminar producto"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-total">
                    {formatoMoneda(item.precio * item.cantidad)}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-summary-line">
                <span>Subtotal:</span>
                <span>{formatoMoneda(subtotal)}</span>
              </div>
              <div className="cart-summary-line">
                <span>Envío:</span>
                <span>{envioGratis ? '¡Gratis!' : formatoMoneda(costoEnvio)}</span>
              </div>
              {!envioGratis && (
                <p className="free-shipping-hint">
                  Agrega {formatoMoneda(100000 - subtotal)} más para obtener <strong>Envío Gratis</strong>
                </p>
              )}
              <div className="cart-summary-line total-line">
                <strong>Total a Pagar:</strong>
                <strong className="total-amount">{formatoMoneda(total)}</strong>
              </div>

              <div className="cart-actions-group">
                <button
                  type="button"
                  className="btn btn-primary btn-checkout"
                  onClick={handleCheckout}
                >
                  Confirmar Compra
                </button>
                <button
                  type="button"
                  className="btn btn-text btn-clear"
                  onClick={onClearCart}
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default CartModal;

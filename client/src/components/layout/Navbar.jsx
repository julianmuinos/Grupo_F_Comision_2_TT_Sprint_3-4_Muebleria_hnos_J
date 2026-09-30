import React, { useState } from 'react';

export default function Navbar({
  currentView = 'inicio',
  onNavigate = () => {},
  cartCount = 0,
  onOpenCart = () => {},
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (view) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* HEADER PRINCIPAL */}
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_12px_rgba(74,50,40,0.06)] border-b border-outline-variant/30">
        <div className="h-16 md:h-20 max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Lado Izquierdo: Botón Menú Mobile + Logotipo */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Botón Hamburguesa (Solo Mobile) */}
            <button
              type="button"
              className="w-10 h-10 flex md:hidden items-center justify-center text-primary hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
              aria-label="Abrir menú de navegación"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                menu
              </span>
            </button>

            {/* Logotipo Hermanos Jota */}
            <button
              type="button"
              onClick={() => handleNavClick('inicio')}
              className="flex items-center gap-3 group text-left bg-transparent border-none p-0 cursor-pointer"
            >
              <img
                alt="Logo Circular hj"
                className="h-9 md:h-11 w-auto object-contain transition-transform group-hover:scale-105"
                src="/assets/images/logo.svg"
              />
              <div className="flex flex-col">
                <span className="font-serif text-lg md:text-xl tracking-[0.08em] text-primary font-bold uppercase">
                  Hermanos Jota
                </span>
                <span className="text-[10px] tracking-[0.14em] text-on-surface-variant font-medium uppercase -mt-0.5 hidden sm:block">
                  Buenos Aires · 2026
                </span>
              </div>
            </button>
          </div>

          {/* Navegación Principal (Desktop) */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            <button
              type="button"
              onClick={() => handleNavClick('inicio')}
              className={`font-sans text-sm tracking-[0.08em] uppercase transition-colors font-medium pb-1 border-b-2 cursor-pointer bg-transparent border-none ${
                currentView === 'inicio'
                  ? 'text-primary font-bold border-primary'
                  : 'text-on-surface-variant hover:text-primary border-transparent'
              }`}
            >
              Inicio
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('catalogo')}
              className={`font-sans text-sm tracking-[0.08em] uppercase transition-colors font-medium pb-1 border-b-2 cursor-pointer bg-transparent border-none ${
                currentView === 'catalogo' || currentView === 'detalle'
                  ? 'text-primary font-bold border-primary'
                  : 'text-on-surface-variant hover:text-primary border-transparent'
              }`}
            >
              Catálogo
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contacto')}
              className={`font-sans text-sm tracking-[0.08em] uppercase transition-colors font-medium pb-1 border-b-2 cursor-pointer bg-transparent border-none ${
                currentView === 'contacto'
                  ? 'text-primary font-bold border-primary'
                  : 'text-on-surface-variant hover:text-primary border-transparent'
              }`}
            >
              Contacto
            </button>
          </nav>

          {/* Lado Derecho: Carrito / Cotización */}
          <div className="flex items-center gap-3 md:gap-6">
            <button
              type="button"
              className="relative p-2.5 text-primary hover:text-primary-hover hover:bg-surface-container rounded-full transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center"
              onClick={onOpenCart}
              aria-label="Ver carrito de cotización"
            >
              <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                shopping_bag
              </span>
              <span
                id="cartCountBadge"
                className="absolute top-1 right-1 bg-secondary text-white text-[11px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-bold shadow-sm"
              >
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* DRAWER MENÚ LATERAL (MOBILE) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed top-0 left-0 w-72 max-w-[80vw] h-full bg-surface z-50 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col justify-between p-6 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Menú móvil"
      >
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-outline-variant/40">
            <div className="flex items-center gap-2.5">
              <img alt="Logo" className="h-8 w-auto" src="/assets/images/logo.svg" />
              <span className="font-serif text-lg text-primary font-bold uppercase tracking-wider">
                Hermanos Jota
              </span>
            </div>
            <button
              type="button"
              className="p-1.5 text-on-surface-variant hover:text-primary rounded-lg cursor-pointer bg-transparent border-none"
              aria-label="Cerrar menú"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                close
              </span>
            </button>
          </div>

          <nav className="flex flex-col gap-2 mt-6" aria-label="Navegación móvil">
            <button
              type="button"
              onClick={() => handleNavClick('inicio')}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-bold tracking-[0.08em] uppercase text-xs transition-colors w-full text-left border-none cursor-pointer ${
                currentView === 'inicio'
                  ? 'bg-surface-container text-primary font-bold'
                  : 'bg-transparent text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">
                home
              </span>{' '}
              Inicio
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('catalogo')}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-bold tracking-[0.08em] uppercase text-xs transition-colors w-full text-left border-none cursor-pointer ${
                currentView === 'catalogo' || currentView === 'detalle'
                  ? 'bg-surface-container text-primary font-bold'
                  : 'bg-transparent text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">
                chair
              </span>{' '}
              Catálogo
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contacto')}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-bold tracking-[0.08em] uppercase text-xs transition-colors w-full text-left border-none cursor-pointer ${
                currentView === 'contacto'
                  ? 'bg-surface-container text-primary font-bold'
                  : 'bg-transparent text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">
                mail
              </span>{' '}
              Contacto
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenCart();
              }}
              className="flex items-center justify-between px-3.5 py-3 text-on-surface hover:bg-surface-container rounded-xl font-medium tracking-[0.08em] uppercase text-xs transition-colors text-left cursor-pointer border-none bg-transparent w-full"
            >
              <span className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl" aria-hidden="true">
                  shopping_bag
                </span>
                Cotización
              </span>
              <span className="bg-primary text-white text-[11px] min-w-5 h-5 px-1 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </button>
          </nav>
        </div>

        {/* Info Showroom en Menú Mobile */}
        <div className="pt-5 border-t border-outline-variant/40 space-y-2 text-xs">
          <p className="text-[11px] text-on-surface-variant uppercase tracking-widest font-semibold">
            Casa Taller
          </p>
          <p className="text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-primary" aria-hidden="true">
              location_on
            </span>{' '}
            Av. San Juan 2847, CABA
          </p>
          <p className="text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-primary" aria-hidden="true">
              schedule
            </span>{' '}
            Lun - Vie 10:00 a 19:00 | Sáb 10:00 - 14:00
          </p>
        </div>
      </aside>
    </>
  );
}

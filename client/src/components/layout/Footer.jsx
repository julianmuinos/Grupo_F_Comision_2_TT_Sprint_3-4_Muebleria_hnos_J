import React from 'react';

export default function Footer({ onNavigate = () => {} }) {
  return (
    <footer className="w-full bg-surface-container-high mt-20 py-16 border-t border-outline-variant/40" id="contacto">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Columna 1: Identidad */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img alt="Logo Hermanos Jota" className="h-9 w-auto opacity-90" src="/assets/images/logo.svg" />
              <div>
                <h4 className="font-serif text-xl text-on-surface font-bold">Hermanos Jota</h4>
                <p className="font-sans text-sm text-on-surface-variant">Estética de los 60, calidad eterna.</p>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm">
              Muebles de autor elaborados con maderas nativas certificadas y ensamblados artesanalmente en Buenos Aires para trascender generaciones.
            </p>
            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('inicio')}
                className="text-xs text-primary font-semibold uppercase tracking-wider hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                Inicio
              </button>
              <span className="text-outline-variant">•</span>
              <button
                type="button"
                onClick={() => onNavigate('catalogo')}
                className="text-xs text-primary font-semibold uppercase tracking-wider hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                Colección
              </button>
              <span className="text-outline-variant">•</span>
              <button
                type="button"
                onClick={() => onNavigate('contacto')}
                className="text-xs text-primary font-semibold uppercase tracking-wider hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                Contacto
              </button>
            </div>
          </div>

          {/* Columna 2: Showroom & Casa Taller */}
          <div className="space-y-4">
            <div>
              <h5 className="font-sans text-xs text-primary uppercase tracking-widest mb-4 font-bold">
                Casa Taller & Showroom
              </h5>
              <p className="font-sans text-sm text-on-surface-variant flex items-start gap-2.5 mb-2">
                <span className="material-symbols-outlined text-base text-primary shrink-0 mt-0.5" aria-hidden="true">
                  location_on
                </span>
                <span>Av. San Juan 2847, San Cristóbal, CABA, Argentina</span>
              </p>
              <p className="font-sans text-sm text-on-surface-variant flex items-start gap-2.5">
                <span className="material-symbols-outlined text-base text-primary shrink-0 mt-0.5" aria-hidden="true">
                  schedule
                </span>
                <span>Lun - Vie 10:00 a 19:00 | Sáb 10:00 - 14:00</span>
              </p>
            </div>
          </div>

          {/* Columna 3: Canales de Atención & Redes */}
          <div className="space-y-4">
            <div>
              <h5 className="font-sans text-xs text-primary uppercase tracking-widest mb-4 font-bold">
                Conectemos
              </h5>
              <div className="space-y-2.5 text-sm text-on-surface-variant">
                <a
                  href="https://instagram.com/hermanosjota_ba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base text-primary" aria-hidden="true">
                    share
                  </span>
                  <span>@hermanosjota_ba</span>
                </a>
                <a
                  href="https://wa.me/541145678900"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base text-primary" aria-hidden="true">
                    chat
                  </span>
                  <span>+54 11 4567-8900 (WhatsApp)</span>
                </a>
                <a
                  href="mailto:info@hermanosjota.com.ar"
                  className="flex items-center gap-2.5 hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base text-primary" aria-hidden="true">
                    mail
                  </span>
                  <span>info@hermanosjota.com.ar</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Barra Inferior */}
        <div className="mt-12 pt-8 border-t border-outline-variant/50 text-center">
          <p className="text-xs text-on-surface-variant opacity-75 italic">
            © 2026 Hermanos Jota. Hecho a mano con herencia y modernidad. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

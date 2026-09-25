import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Header Base */}
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
            <span className="nav-button active">Inicio</span>
          </nav>
        </div>
      </header>

      {/* Hero Banner Base */}
      <main className="main-content">
        <section className="hero-banner">
          <div className="hero-overlay">
            <div className="hero-text-content">
              <span className="hero-subtitle">Colección 2026 · Diseño de Autor</span>
              <h1 className="hero-title">Muebles que alimentan el alma</h1>
              <p className="hero-description">
                Inspirados en la calidez de los años 60 y la nobleza de las maderas argentinas. Cada pieza es elaborada artesanalmente para trascender generaciones.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

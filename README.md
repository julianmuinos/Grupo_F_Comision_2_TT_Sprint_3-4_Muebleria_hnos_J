# E-commerce Mueblería Hermanos Jota 🪵
## Trabajo Práctico Integrador — Sprint 3 y 4 | ITBA (Comisión 2 TT · Grupo F)

Repositorio oficial del equipo para el desarrollo de la plataforma e-commerce y cotizador interactivo de **Mueblería Hermanos Jota**, basada en una arquitectura Cliente-Servidor desacoplada con **Node.js + Express** en el backend y **React 19 + Vite** en el frontend.

---

## 👥 Integrantes del Equipo

* **Alexis Fernando Rojas**
* **Emanuel Ramirez**
* **Franco Blanchard**
* **Julian Muiños**
* **Santino Marchesini**

🔗 **Repositorio Sprint 1 y 2 (Vanilla Web Architecture)**: [https://github.com/emanuelrz/Grupo_7_Comision_2_TT_Muebleria_hnos_J](https://github.com/emanuelrz/Grupo_7_Comision_2_TT_Muebleria_hnos_J)

---

## 🌿 Identidad y Manual de Marca

La propuesta estética se inspira en el diseño modernista de los años 60 (*Mid-Century Modern*), la ebanistería tradicional argentina y el compromiso con la sostenibilidad mediante maderas nativas certificadas FSC®.

### Paleta Cromática Oficial
* **Siena Tostado (`#823b18`)**: Color primario de marca que evoca la calidez de la madera noble (nogal, petiribí) y la solidez artesanal.
* **Verde Salvia (`#486730`)**: Color secundario representativo de la naturaleza, la sostenibilidad y la regeneración de bosques nativos.
* **Alabastro (`#fff8f3`)**: Fondo orgánico luminoso que aporta claridad editorial, sofisticación y pureza visual.

---

## 🏛️ Arquitectura del Sistema

La solución adopta una **arquitectura desacoplada en dos capas (Client-Server)**:

```text
┌────────────────────────────────────────┐
│          CLIENTE (Frontend)            │
│  React 19 + Vite + CSS Design Tokens   │
│  Puerto por defecto: http://localhost:5173
└───────────────────┬────────────────────┘
                    │
            Peticiones HTTP (REST API)
            JSON Payloads (CORS habilitado)
                    │
┌───────────────────▼────────────────────┐
│          SERVIDOR (Backend API)        │
│  Node.js + Express (API RESTful)       │
│  Puerto por defecto: http://localhost:5000
├────────────────────────────────────────┤
│  • Logger con timestamp ISO            │
│  • Router /api/productos con querys    │
│  • Catálogo en memoria (11 productos)  │
│  • Manejador 404 y Errores 500         │
└────────────────────────────────────────┘
```

### Características del Backend
* **Servidor RESTful modular**: Desarrollado con Express 4 y CORS global.
* **Middleware de Auditoría y Logging**: Registra método HTTP, URL y timestamp de cada petición entrante.
* **Manejo Centralizado de Errores**: Respuestas uniformes en formato JSON tanto para rutas inexistentes (404) como para excepciones de servidor (500).
* **Catálogo de Productos en Memoria**: 11 piezas oficiales con especificaciones completas (dimensiones, materiales, capacidad de carga, acabados y fotos de alta resolución).

### Características del Frontend
* **Single Page Application (SPA)**: Montada en React 19 y Vite 8 para un desarrollo ágil y compilación ultrarrápida.
* **Sistema de Vistas Reactivo**: Navegación sin recarga entre *Inicio*, *Catálogo Oficial*, *Ficha de Detalle de Producto* y *Showroom / Contacto*.
* **Formulario de Contacto 100% Controlado**: Componente `ContactForm` gestionado íntegramente con `useState`, validaciones sincrónicas por campo (nombre, email, teléfono, motivo, mensaje), bloqueo de envío ante errores, feedback visual accesible y pantalla de confirmación.
* **Carrito y Cotizador Global**: Estado persistido en `localStorage` con cálculo dinámico de subtotales, reglas de envío bonificado (gratis superando $100.000 ARS) y confirmación de compra simulada.
* **Buscador y Filtros en Tiempo Real**: Filtrado reactivo optimizado con `useMemo` por texto multivariado y categorías.

---

## 📐 Estructura del Proyecto

```text
Grupo_F_Comision_2_TT_Sprint_3-4_Muebleria_hnos_J/
├── backend/
│   ├── data/
│   │   └── productos.js          # Base de datos en memoria (11 piezas oficiales)
│   ├── middlewares/
│   │   ├── errorHandler.js       # Manejador 404 y middleware centralizado de errores
│   │   └── logger.js             # Middleware global de registro con timestamp
│   ├── routes/
│   │   └── productos.routes.js   # Router con endpoints GET / y GET /:id
│   ├── index.js                  # Entrada del servidor Express con CORS y parsers
│   ├── package.json              # Dependencias (express, cors) y scripts
│   └── package-lock.json
│
├── client/
│   ├── public/
│   │   ├── assets/images/        # Catálogo de 11 fotos de autor y logotipo SVG
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── CartModal.jsx     # Drawer del carrito con cálculo de envío y cotización
│   │   │   ├── ContactForm.jsx   # Formulario controlado 100% con useState y validaciones
│   │   │   ├── ContactView.jsx   # Vista de contacto y datos del Showroom Palermo Soho
│   │   │   ├── Footer.jsx        # Pie institucional con Showroom y canales de contacto
│   │   │   ├── HomeView.jsx      # Portada editorial con piezas destacadas y pilares
│   │   │   ├── Navbar.jsx        # Barra superior con logo y contador reactivo de carrito
│   │   │   ├── ProductCard.jsx   # Tarjeta de producto con precio en ARS y badges
│   │   │   ├── ProductDetail.jsx # Vista detallada condicional con especificaciones técnicas
│   │   │   └── ProductList.jsx   # Grilla interactiva de catálogo con buscador en vivo
│   │   ├── App.css               # Sistema de diseño con tokens (Siena, Salvia, Alabastro)
│   │   ├── App.jsx               # Gestor de estado global, consumo fetch y enrutamiento
│   │   ├── index.css             # Reseteo base y directivas
│   │   └── main.jsx              # Punto de entrada de React 19
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── package.json              # Dependencias de React 19, Vite, Tailwind CSS y ESLint
│
├── .gitignore
├── .prettierrc
└── README.md                     # Documentación general de entrega
```

---

## 🔌 Endpoints de la API REST

| Método | Endpoint | Parámetros Query | Descripción |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | — | Comprobación de estado del servidor (*Health check*). |
| `GET` | `/api/productos` | `?categoria=asientos`<br>`?destacados=true` | Obtiene el catálogo completo o filtrado por categoría y piezas destacadas. |
| `GET` | `/api/productos/:id` | `:id` (entero positivo) | Obtiene el detalle técnico de un mueble específico por su ID numérico. |

---

## 🛠️ Instalación y Ejecución

### Prerrequisitos
* Node.js v18.0.0 o superior
* npm v9.0.0 o superior

### 1. Iniciar el Servidor Backend
Abrir una terminal en la raíz del proyecto:
```bash
cd backend
npm install
npm start
```
> El servidor quedará escuchando en `http://localhost:5000`. También podés usar `npm run dev` para recarga automática nativa con `node --watch`.

### 2. Iniciar la Aplicación Cliente (React)
En una segunda terminal:
```bash
cd client
npm install
npm run dev
```
> La aplicación se abrirá en `http://localhost:5173` y se conectará automáticamente a la API en el puerto 5000.

---

## 📍 Showroom Oficial

* **Ubicación**: Honduras 4920, Palermo Soho, Ciudad Autónoma de Buenos Aires.
* **Horarios**: Lunes a Viernes de 10:00 a 19:00 hs · Sábados de 10:00 a 14:00 hs.
* **Contacto**: `+54 11 5555-5555` · `contacto@hermanosjota.com.ar`
* **Redes**: `@hermanosjota_ba`
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
* **Siena Tostado (`#823b18`)**: Color primario de marca que evoca la calidez de la madera noble (nogal, petiribí) y la solidez artesanal. Utilizado en acentos principales, botones primarios y badges destacados con tipografía en blanco.
* **Verde Salvia (`#486730`)**: Color secundario representativo de la naturaleza, la sostenibilidad y la regeneración de bosques nativos.
* **Alabastro (`#fff8f3`)**: Fondo orgánico luminoso que aporta claridad editorial, sofisticación y pureza visual.
* **Carbón Artesanal (`#221610`)**: Contraste tipográfico de alta legibilidad y jerarquía visual.

---

## 🏛️ Arquitectura del Sistema

La solución adopta una **arquitectura desacoplada en dos capas (Client-Server)**:

```text
┌────────────────────────────────────────────────────────┐
│                   CLIENTE (Frontend)                   │
│      React 19 + Vite + Tailwind CSS + CSS Tokens       │
│      Puerto por defecto: http://localhost:5173         │
└───────────────────────────┬────────────────────────────┘
                            │
                    Peticiones HTTP (REST API)
                    JSON Payloads (CORS habilitado)
                            │
┌───────────────────────────▼────────────────────────────┐
│                   SERVIDOR (Backend API)               │
│          Node.js + Express 4 (API RESTful)             │
│          Puerto por defecto: http://localhost:5000     │
├────────────────────────────────────────────────────────┤
│  • Logger global con timestamp ISO en consola          │
│  • Router modular /api/productos con query params      │
│  • Catálogo en memoria (11 piezas oficiales completas) │
│  • Manejador de rutas 404 y Middleware de errores 500  │
└────────────────────────────────────────────────────────┘
```

### Características del Backend
* **Servidor RESTful modular**: Desarrollado con Express 4, parser JSON/urlencoded y CORS global habilitado.
* **Middleware de Auditoría y Logging**: Registra método HTTP, URL consultada y timestamp ISO de cada petición entrante.
* **Manejo Centralizado de Errores**: Formato estándar JSON con códigos HTTP adecuados (400 para parámetros inválidos, 404 para recursos no encontrados y 500 para excepciones no controladas).
* **Catálogo de Productos en Memoria**: 11 piezas oficiales con especificaciones técnicas completas (dimensiones, materiales, capacidad, peso, acabados y fotografías de alta resolución).
* **Filtros por Query Params**: Soporte nativo para filtrado por categoría (`?categoria=`) y por piezas destacadas (`?destacados=true`).

### Características del Frontend
* **Single Page Application (SPA)**: Desarrollada con React 19 y Vite 8 para una experiencia fluida sin recargas de página.
* **Sistema de Vistas Reactivo**: Navegación instantánea entre *Inicio*, *Catálogo Oficial*, *Ficha de Detalle de Producto* y *Contacto / Casa Taller*.
* **Navegación Móvil Responsive (MobileSidebar)**: Menú drawer lateral montado con `createPortal` en `document.body`, botón hamburguesa animado en pantallas $\le 768\text{px}$, backdrop con efecto blur, bloqueo de scroll en segundo plano y cierre accesible con tecla Escape o clic exterior.
* **Filtros y Búsqueda en Tiempo Real**: Buscador integrado con icono de lupa embebido y barra de categorías con scroll horizontal táctil optimizado para mobile.
* **Ficha de Detalle de Producto (`ProductDetail`)**: Vista inmersiva con galería fotográfica, selector interactivo de acabados de madera, tabla de especificaciones técnicas, selector de cantidad y agregado directo al cotizador.
* **Carrito y Cotizador Global**: Estado global persistido en `localStorage`, cálculo dinámico de subtotales, regla de bonificación de envío (gratis superando $1.500.000 ARS) y flujo de confirmación de compra simulada.
* **Formulario de Contacto 100% Controlado (`ContactForm`)**: Administrado con `useState`, validaciones sincrónicas en tiempo real por campo (nombre, email, teléfono, motivo y mensaje), bloqueo de submit ante inconsistencias, accesibilidad visual y pantalla de éxito.
* **Vista Institucional de Casa Taller (`ContactView`)**: Información georreferenciada con integración a Google Maps, datos de atención y canales directos vía WhatsApp e Instagram.
* **Footer Limpio e Institucional (`Footer`)**: Pie de página enfocado en identidad de marca, certificación FSC®, producción artesanal argentina y derechos reservados.

---

## 📐 Estructura del Proyecto

```text
Grupo_F_Comision_2_TT_Sprint_3-4_Muebleria_hnos_J/
├── backend/
│   ├── data/
│   │   └── productos.js          # Base de datos en memoria (11 piezas oficiales)
│   ├── middlewares/
│   │   ├── errorHandler.js       # Manejador 404 y middleware centralizado de errores
│   │   └── logger.js             # Middleware global de auditoría con timestamp
│   ├── routes/
│   │   └── productos.routes.js   # Router con endpoints GET / y GET /:id
│   ├── index.js                  # Punto de entrada de Express con CORS y middlewares
│   ├── package.json              # Dependencias (express, cors) y scripts de inicio
│   └── package-lock.json
│
├── client/
│   ├── public/
│   │   ├── assets/images/        # Fotografías de autor y logotipo SVG oficial
│   │   ├── favicon.svg           # Isotipo vectorial de la marca
│   │   └── icons.svg             # Sprite de iconos SVG
│   ├── src/
│   │   ├── components/
│   │   │   ├── CartModal.jsx     # Drawer del carrito/cotizador con cálculo de envío
│   │   │   ├── ContactForm.jsx   # Formulario controlado 100% con useState y validación
│   │   │   ├── ContactView.jsx   # Vista de contacto y datos oficiales de Casa Taller
│   │   │   ├── Footer.jsx        # Pie institucional con certificación FSC® y origen
│   │   │   ├── HomeView.jsx      # Portada editorial con piezas destacadas y pilares
│   │   │   ├── MobileSidebar.jsx # Menú drawer deslizable para mobile con createPortal
│   │   │   ├── Navbar.jsx        # Barra superior con logo, enlaces y botón hamburguesa
│   │   │   ├── ProductCard.jsx   # Tarjeta de producto con precios ARS y badge destacado
│   │   │   ├── ProductDetail.jsx # Ficha detallada con especificaciones técnicas y acabados
│   │   │   └── ProductList.jsx   # Grilla interactiva de catálogo con buscador y filtros
│   │   ├── App.css               # Sistema de diseño con variables CSS y estilos responsive
│   │   ├── App.jsx               # Gestor de estado global, consumo fetch y enrutamiento
│   │   ├── index.css             # Reseteo base y configuración de Tailwind CSS
│   │   └── main.jsx              # Renderizado principal de la aplicación React 19
│   ├── index.html                # Plantilla HTML5 con metadatos y fuentes Google Fonts
│   ├── .env.example              # Plantilla de variables de entorno para el backend API
│   ├── vite.config.js            # Configuración del bundler Vite con plugin de React
│   ├── eslint.config.js          # Reglas de linting y buenas prácticas de código
│   └── package.json              # Dependencias de React 19, Vite, Tailwind CSS y linters
│
├── .gitignore                    # Reglas de exclusión de git (node_modules, dist, etc.)
├── .prettierrc                   # Reglas de formateo de código unificado
└── README.md                     # Documentación integral del proyecto
```

---

## 🔌 Endpoints de la API REST

| Método | Endpoint | Parámetros Query / URL | Descripción | Respuestas HTTP |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | — | Comprobación de estado del servidor (*Health check*). | `200 OK` |
| `GET` | `/api/productos` | `?categoria=asientos`<br>`?destacados=true` | Obtiene el catálogo completo o filtrado por categoría y/o piezas destacadas. | `200 OK`<br>`500 Error interno` |
| `GET` | `/api/productos/:id` | `:id` (entero positivo) | Obtiene el detalle técnico y especificaciones de un mueble según su ID numérico. | `200 OK`<br>`400 ID inválido`<br>`404 No encontrado`<br>`500 Error interno` |

### Formato de Respuestas de la API

* **Respuesta Exitosa (Catálogo General)**:
  ```json
  {
    "success": true,
    "total": 11,
    "data": [ /* listado de productos */ ]
  }
  ```

* **Respuesta Exitosa (Detalle de Producto)**:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "nombre": "Aparador Uspallata",
      "categoria": "almacenaje",
      "precio": 2350000,
      "medidas": "180 × 45 × 75 cm",
      "materiales": "Nogal macizo FSC®, herrajes de latón",
      "destacado": true,
      "specs": {
        "acabado": "Aceite natural ecológico",
        "peso": "68 kg",
        "capacidad": "6 compartimentos interiores"
      }
    }
  }
  ```

* **Respuesta de Error Estandarizada (404 / 400 / 500)**:
  ```json
  {
    "success": false,
    "status": 404,
    "message": "Producto con ID 99 no encontrado en el catálogo."
  }
  ```

---

## 🛠️ Instalación y Ejecución

### Prerrequisitos
* **Node.js**: v18.0.0 o superior (recomendado v20+)
* **npm**: v9.0.0 o superior

### 1. Iniciar el Servidor Backend (Express)
Abrir una terminal en la raíz del repositorio:
```bash
cd backend
npm install
npm start
```
> El servidor quedará disponible en `http://localhost:5000`. Para desarrollo con reinicio automático nativo ante cambios, podés ejecutar:
```bash
npm run dev
```

### 2. Iniciar la Aplicación Cliente (React + Vite)
En una segunda terminal desde la raíz del proyecto:
```bash
cd client
npm install
npm run dev
```
> La aplicación se abrirá en `http://localhost:5173` y se conectará automáticamente a los endpoints del backend en el puerto 5000.

### Scripts Disponibles en el Frontend
* `npm run dev`: Inicia el servidor de desarrollo Vite con Hot Module Replacement (HMR).
* `npm run build`: Genera el bundle optimizado para producción en `client/dist`.
* `npm run preview`: Previsualiza localmente la compilación de producción.
* `npm run lint`: Ejecuta ESLint sobre todo el código fuente de React.
* `npm run lint:fix`: Corrige automáticamente inconsistencias de linting detectables.
* `npm run format`: Formatea el código con Prettier según las reglas del proyecto.

---

## 🔍 Auditoría de Calidad y Refactorizaciones (QA)

Como parte de las mejoras de calidad del Sprint 4, se ejecutó una auditoría técnica orientada a robustez, accesibilidad (a11y) y arquitectura:

1. **Principio DRY en Peticiones HTTP (`App.jsx`)**: Se unificó el consumo asíncrono del catálogo centralizándolo en `fetchProducts`, eliminando la duplicación de lógica en el montaje inicial.
2. **Desacoplamiento de Servidor para Testing (`backend/index.js`)**: Se condicionó `app.listen()` a ejecución directa (`require.main === module`), permitiendo importar la instancia de Express en suites de pruebas automatizadas sin bloquear puertos de red.
3. **Parametrización de Entorno (`.env.example`)**: Se desacopló la URL base del servidor (`API_BASE`) del path del recurso (`/api/productos`), permitiendo configuraciones dinámicas de despliegue mediante `VITE_API_URL`.
4. **Accesibilidad por Teclado (WCAG 2.1 en `Navbar.jsx`)**: Se transformó el isotipo de marca de un `div` pasivo a un `<button type="button">` semántico con `aria-label`, habilitando interacción nativa vía teclado (Enter y Espacio).
5. **Calibración de Regla de Negocio (`CartModal.jsx`)**: Se ajustó el umbral de envío bonificado a `$1.500.000 ARS`, haciendo coherente el cobro de envío ($8.500) y el mensaje interactivo con los valores reales del catálogo de autor.

---

## 📍 Casa Taller Oficial

* **Ubicación**: Av. San Juan 2847, C1232AAB — Barrio de San Cristóbal, Ciudad Autónoma de Buenos Aires, Argentina.
* **Horarios de Atención**: Lunes a Viernes de 10:00 a 19:00 hs · Sábados de 10:00 a 14:00 hs.
* **WhatsApp y Consultas**: `+54 11 4567-8900`
* **Correo Electrónico**: `info@hermanosjota.com.ar`
* **Instagram Oficial**: [`@hermanosjota_ba`](https://instagram.com/hermanosjota_ba)

const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares globales de configuración
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware global de logging
app.use(logger);

// Endpoint base
app.get('/', (req, res) => {
  res.json({
    mensaje: 'Servidor base activo - Mueblería Hermanos Jota (Sprint 3 y 4)',
    estado: 'online'
  });
});

// Middleware para manejo de rutas no encontradas (404)
app.use(notFoundHandler);

// Middleware centralizado de errores
app.use(errorHandler);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor base iniciado en http://localhost:${PORT}`);
});

module.exports = app;

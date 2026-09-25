const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares de configuración base
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint base
app.get('/', (req, res) => {
  res.json({
    mensaje: 'Servidor base activo - Mueblería Hermanos Jota (Sprint 3 y 4)',
    estado: 'online'
  });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor base iniciado en http://localhost:${PORT}`);
});

module.exports = app;

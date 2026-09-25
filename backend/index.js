const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares base
app.use(cors());
app.use(express.json());

// Endpoint base
app.get('/', (req, res) => {
  res.json({
    mensaje: 'Servidor base activo - Mueblería Hermanos Jota (Sprint 3 y 4)',
    estado: 'online'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor base iniciado en http://localhost:${PORT}`);
});

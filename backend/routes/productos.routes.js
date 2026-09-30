const express = require('express');
const router = express.Router();
const productos = require('../data/productos');

/**
 * @route   GET /api/productos
 * @desc    Obtener el listado completo de productos del catálogo
 * @access  Público
 */
router.get('/', (req, res) => {
  try {
    const { categoria, destacados } = req.query;
    let resultado = [...productos];

    // Filtro opcional por categoría si viene por query param
    if (categoria) {
      resultado = resultado.filter(
        (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
      );
    }

    // Filtro opcional por destacados si viene por query param
    if (destacados === 'true') {
      resultado = resultado.filter((p) => p.destacado);
    }

    res.status(200).json({
      success: true,
      total: resultado.length,
      data: resultado
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: 'Error al recuperar los productos del catálogo',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/productos/:id
 * @desc    Búsqueda de producto por ID numérico con validación de error 404
 * @access  Público
 */
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    // Validación: verificar que el ID recibido sea un número entero positivo válido
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'El parámetro "id" debe ser un número entero positivo válido.'
      });
    }

    // Búsqueda del producto por ID
    const producto = productos.find((p) => p.id === id);

    // Validación 404 si el producto no existe
    if (!producto) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: `Producto con ID ${id} no encontrado en el catálogo.`
      });
    }

    // Respuesta exitosa con el producto encontrado
    res.status(200).json({
      success: true,
      data: producto
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: `Error al obtener el producto con ID ${req.params.id}`,
      error: error.message
    });
  }
});

module.exports = router;

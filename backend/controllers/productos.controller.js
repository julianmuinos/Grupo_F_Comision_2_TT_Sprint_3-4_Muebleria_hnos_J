const productos = require('../data/productos');

/**
 * Controlador de Productos - Mueblería Hermanos Jota (Sprint 3 y 4)
 * Implementa el patrón de controladores para separar la lógica de negocio
 * del enrutamiento HTTP según las mejores prácticas de Express y arquitectura MVC.
 */

/**
 * @desc    Obtener el listado completo de productos del catálogo con soporte de filtros
 * @route   GET /api/productos
 * @access  Público
 */
const obtenerProductos = (req, res) => {
  try {
    const { categoria, destacados } = req.query;
    let resultado = [...productos];

    // Filtro opcional por categoría si viene por query param
    if (categoria) {
      resultado = resultado.filter(
        (p) => (p.categoria || p.category || '').toLowerCase() === categoria.toLowerCase()
      );
    }

    // Filtro opcional por destacados si viene por query param
    if (destacados === 'true') {
      resultado = resultado.filter((p) => p.destacado);
    }

    return res.status(200).json({
      success: true,
      total: resultado.length,
      data: resultado,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: 'Error al recuperar los productos del catálogo.',
      error: error.message,
    });
  }
};

/**
 * @desc    Obtener un producto individual por ID numérico
 * @route   GET /api/productos/:id
 * @access  Público
 */
const obtenerProductoPorId = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    // Validación 400: verificar que el ID recibido sea un número entero positivo válido
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'El parámetro "id" debe ser un número entero positivo válido.',
      });
    }

    // Búsqueda del producto por ID
    const producto = productos.find((p) => p.id === id);

    // Validación 404: si el producto no existe en el catálogo
    if (!producto) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: `Producto con ID ${id} no encontrado en el catálogo.`,
      });
    }

    // Respuesta 200 exitosa con el producto encontrado
    return res.status(200).json({
      success: true,
      data: producto,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: `Error al obtener el producto con ID ${req.params.id}.`,
      error: error.message,
    });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
};

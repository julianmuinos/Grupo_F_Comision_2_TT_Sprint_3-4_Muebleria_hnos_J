const mongoose = require('mongoose');
const Producto = require('../models/Producto');

/**
 * Controlador de Productos - Mueblería Hermanos Jota (Sprint 5 y 6)
 * Implementa las operaciones de lectura contra MongoDB Atlas mediante Mongoose,
 * separando la lógica de negocio del enrutamiento HTTP según el patrón MVC.
 */

/**
 * @desc    Obtener el listado completo de productos del catálogo desde MongoDB (con soporte de filtros)
 * @route   GET /api/productos
 * @access  Público
 */
const obtenerProductos = async (req, res) => {
  try {
    const { categoria, destacados } = req.query;
    const filtro = {};

    // Filtro opcional por categoría (insensible a mayúsculas/minúsculas)
    if (categoria) {
      filtro.categoria = categoria.trim().toLowerCase();
    }

    // Filtro opcional por productos destacados
    if (destacados === 'true') {
      filtro.destacado = true;
    }

    const productos = await Producto.find(filtro);

    return res.status(200).json({
      success: true,
      total: productos.length,
      data: productos,
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
 * @desc    Obtener un producto individual por su _id de MongoDB
 * @route   GET /api/productos/:id
 * @access  Público
 */
const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    // Validación 400: verificar que el parámetro recibido sea un ObjectId válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'El parámetro "id" no tiene un formato de ObjectId válido.',
      });
    }

    // Búsqueda del producto por _id en MongoDB
    const producto = await Producto.findById(id);

    // Validación 404: si el producto no existe en la colección
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

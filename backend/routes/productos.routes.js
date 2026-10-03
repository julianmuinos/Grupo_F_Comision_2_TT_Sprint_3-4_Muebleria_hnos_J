const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');

/**
 * Rutas de Productos - Mueblería Hermanos Jota (Sprint 3 y 4)
 * Estructurado con express.Router() siguiendo el patrón de controladores (MVC).
 */

/**
 * @route   GET /api/productos
 * @desc    Obtener el listado completo de productos (con soporte de filtros opcionales)
 * @access  Público
 */
router.get('/', productosController.obtenerProductos);

/**
 * @route   GET /api/productos/:id
 * @desc    Búsqueda de producto por ID numérico con validación de error 404 y 400
 * @access  Público
 */
router.get('/:id', productosController.obtenerProductoPorId);

module.exports = router;

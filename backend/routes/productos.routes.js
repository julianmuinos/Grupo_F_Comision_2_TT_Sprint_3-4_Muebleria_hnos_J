const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');
const {
  validarIdMongo,
  validarCrearProducto,
  validarActualizarProducto,
} = require('../middlewares/validaciones');

/**
 * Rutas de Productos - Mueblería Hermanos Jota
 * Arquitectura modular Express con patrón MVC.
 */

// =========================================================================
// RUTAS DE CONSULTA (GET)
// =========================================================================

/**
 * @route   GET /api/productos
 * @desc    Obtener el listado completo de productos (con soporte de filtros por query params)
 * @access  Público
 */
router.get('/', productosController.obtenerProductos);

/**
 * @route   GET /api/productos/:id
 * @desc    Búsqueda de producto por identificador (_id de MongoDB o numérico legado)
 * @access  Público
 */
router.get('/:id', productosController.obtenerProductoPorId);

// =========================================================================
// RUTAS DE MUTACIONES (POST, PUT, DELETE) - INTEGRANTE 2 (Emanuel Ramirez)
// =========================================================================

/**
 * @route   POST /api/productos
 * @desc    Dar de alta nuevos productos en la base de datos
 * @access  Público / Administrativo
 * @status  201 Created
 */
router.post('/', validarCrearProducto, productosController.crearProducto);

/**
 * @route   PUT /api/productos/:id
 * @desc    Modificar información de productos existentes en la base de datos
 * @access  Público / Administrativo
 * @status  200 OK
 */
router.put(
  '/:id',
  validarActualizarProducto,
  productosController.actualizarProducto
);

/**
 * @route   DELETE /api/productos/:id
 * @desc    Remover un producto de la base de datos
 * @access  Público / Administrativo
 * @status  200 OK
 */
router.delete('/:id', validarIdMongo, productosController.eliminarProducto);

module.exports = router;

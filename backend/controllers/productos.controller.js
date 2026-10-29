const mongoose = require('mongoose');
const Producto = require('../models/Producto');
const productosEnMemoria = require('../data/productos');

/**
 * Controlador de Productos - Mueblería Hermanos Jota
 *
 * Sprint 3 y 4: Endpoints GET con catálogo base.
 * Sprint 5 y 6: Integración con MongoDB Atlas y mutaciones (POST, PUT, DELETE) - Integrante 2.
 */

/**
 * @desc    Obtener el listado completo de productos (con soporte de filtros opcionales)
 * @route   GET /api/productos
 * @access  Público
 */
const obtenerProductos = async (req, res, next) => {
  try {
    const { categoria, destacados } = req.query;

    // Intentar consultar MongoDB Atlas si la conexión está lista
    if (mongoose.connection.readyState === 1) {
      const filtro = {};

      if (categoria) {
        filtro.$or = [
          { categoria: new RegExp(`^${categoria}$`, 'i') },
          { category: new RegExp(`^${categoria}$`, 'i') },
        ];
      }

      if (destacados === 'true') {
        filtro.destacado = true;
      }

      const docs = await Producto.find(filtro).sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        total: docs.length,
        data: docs,
      });
    }

    // Fallback al catálogo en memoria en caso de no disponer de conexión a BD
    let resultado = [...productosEnMemoria];

    if (categoria) {
      resultado = resultado.filter(
        (p) =>
          (p.categoria || p.category || '').toLowerCase() ===
          categoria.toLowerCase()
      );
    }

    if (destacados === 'true') {
      resultado = resultado.filter((p) => p.destacado);
    }

    return res.status(200).json({
      success: true,
      total: resultado.length,
      data: resultado,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @desc    Obtener un producto individual por ID (soporta _id de MongoDB o id numérico legado)
 * @route   GET /api/productos/:id
 * @access  Público
 */
const obtenerProductoPorId = async (req, res, next) => {
  try {
    const { id } = req.params;

    // 1. Si la conexión a MongoDB está activa, buscar por ObjectId o id legado
    if (mongoose.connection.readyState === 1) {
      let producto = null;

      if (mongoose.Types.ObjectId.isValid(id)) {
        producto = await Producto.findById(id);
      }

      // Si no se encontró por _id o no era ObjectId, intentar por id numérico legado
      if (!producto && /^\d+$/.test(id)) {
        producto = await Producto.findOne({ id: Number(id) });
      }

      if (producto) {
        return res.status(200).json({
          success: true,
          data: producto,
        });
      }
    }

    // 2. Fallback a productos en memoria por id numérico legado
    if (/^\d+$/.test(id)) {
      const idNumerico = Number(id);
      const productoMemoria = productosEnMemoria.find(
        (p) => p.id === idNumerico
      );
      if (productoMemoria) {
        return res.status(200).json({
          success: true,
          data: productoMemoria,
        });
      }
    }

    // Validación 404: no encontrado
    return res.status(404).json({
      success: false,
      status: 404,
      message: `Producto con ID "${id}" no encontrado en el catálogo.`,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * =========================================================================
 * MUTACIONES (POST, PUT, DELETE) - INTEGRANTE 2 (Emanuel Ramirez)
 * =========================================================================
 */

/**
 * @desc    Dar de alta un nuevo producto en la base de datos
 * @route   POST /api/productos
 * @access  Público / Administrativo
 * @status  201 Created
 */
const crearProducto = async (req, res, next) => {
  try {
    const {
      nombre,
      title,
      categoria,
      category,
      precio,
      price,
      descripcion,
      descripcionLarga,
      imagen,
      foto,
      image,
      medidas,
      materiales,
      material,
      tags,
      badge,
      swatches,
      stock,
      destacado,
      specs,
    } = req.body;

    // Construcción del nuevo documento siguiendo el modelo Mongoose
    const nuevoProducto = new Producto({
      nombre: nombre || title,
      title: title || nombre,
      categoria: (categoria || category || '').toLowerCase(),
      category: (category || categoria || '').toLowerCase(),
      precio: precio !== undefined ? precio : price,
      price: price !== undefined ? price : precio,
      descripcion,
      descripcionLarga: descripcionLarga || descripcion,
      imagen: imagen || foto || image,
      foto: foto || imagen || image,
      image: image || imagen || foto,
      medidas: medidas || '',
      materiales: materiales || material || '',
      material: material || materiales || '',
      tags: Array.isArray(tags) ? tags : [],
      badge: badge || null,
      swatches: Array.isArray(swatches) ? swatches : [],
      stock: stock !== undefined ? Number(stock) : 0,
      inStock: stock !== undefined ? Number(stock) > 0 : true,
      destacado: Boolean(destacado),
      specs: specs || {},
    });

    const productoGuardado = await nuevoProducto.save();

    return res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente en la base de datos.',
      data: productoGuardado,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @desc    Modificar la información de un producto existente por su ID
 * @route   PUT /api/productos/:id
 * @access  Público / Administrativo
 * @status  200 OK
 */
const actualizarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Buscar el producto existente
    const producto = await Producto.findById(id);

    if (!producto) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: `Producto con ID "${id}" no encontrado para actualizar.`,
      });
    }

    // Campos permitidos para actualización
    const camposPermitidos = [
      'nombre',
      'title',
      'categoria',
      'category',
      'precio',
      'price',
      'descripcion',
      'descripcionLarga',
      'imagen',
      'foto',
      'image',
      'medidas',
      'materiales',
      'material',
      'tags',
      'badge',
      'swatches',
      'stock',
      'destacado',
      'specs',
    ];

    // Aplicar únicamente los campos presentes en req.body
    camposPermitidos.forEach((campo) => {
      if (req.body[campo] !== undefined) {
        producto[campo] = req.body[campo];
      }
    });

    // Guardar para ejecutar validadores y el middleware pre('save') del schema
    const productoActualizado = await producto.save();

    return res.status(200).json({
      success: true,
      message: 'Producto actualizado exitosamente en la base de datos.',
      data: productoActualizado,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @desc    Remover un producto existente de la base de datos por su ID
 * @route   DELETE /api/productos/:id
 * @access  Público / Administrativo
 * @status  200 OK
 */
const eliminarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productoEliminado = await Producto.findByIdAndDelete(id);

    if (!productoEliminado) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: `Producto con ID "${id}" no encontrado para eliminar.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Producto eliminado exitosamente de la base de datos.',
      data: productoEliminado,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};

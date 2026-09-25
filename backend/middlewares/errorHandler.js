/**
 * Middleware para capturar rutas no encontradas (404)
 */
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl || req.url}`
  });
};

/**
 * Middleware centralizado para manejo de errores (500 u otros códigos de error)
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || err.statusCode || 500;
  console.error(`[Error ${statusCode}] - ${err.message || 'Error interno del servidor'}`);

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

errorHandler.notFoundHandler = notFoundHandler;
errorHandler.errorHandler = errorHandler;

module.exports = errorHandler;
module.exports.notFoundHandler = notFoundHandler;
module.exports.errorHandler = errorHandler;

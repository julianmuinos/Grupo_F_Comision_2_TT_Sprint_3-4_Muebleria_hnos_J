/**
 * Middleware para capturar rutas no encontradas (404)
 */
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl || req.url}`,
  });
};

/**
 * Middleware centralizado para manejo de errores
 * Procesa errores de validación de Mongoose, CastError, errores de sintaxis JSON y errores 500.
 */
const errorHandler = (err, req, res, next) => {
  // Error de sintaxis en el body JSON enviado por el cliente (400)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      status: 400,
      message:
        'El cuerpo de la petición contiene un JSON con formato inválido.',
    });
  }

  // Error de validación de esquemas de Mongoose (400)
  if (err.name === 'ValidationError') {
    const mensajes = Object.values(err.errors || {}).map((e) => e.message);
    return res.status(400).json({
      success: false,
      status: 400,
      message: 'Error de validación de datos en la base de datos.',
      errores: mensajes,
    });
  }

  // Error de casteo de Mongoose (e.g. ID inválido de ObjectId) (400)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      status: 400,
      message: `Formato inválido para el campo "${err.path}": valor recibido '${err.value}'.`,
    });
  }

  const statusCode = err.status || err.statusCode || 500;
  console.error(
    `[Error ${statusCode}] - ${err.message || 'Error interno del servidor'}`
  );

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

errorHandler.notFoundHandler = notFoundHandler;
errorHandler.errorHandler = errorHandler;

module.exports = errorHandler;
module.exports.notFoundHandler = notFoundHandler;
module.exports.errorHandler = errorHandler;

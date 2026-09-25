/**
 * Middleware global de logging
 * Registra en consola el método HTTP, la URL solicitada y el timestamp.
 */
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl || req.url}`);
  next();
};

module.exports = logger;

/**
 * Servicio de Productos (Integrante 4 - Catálogo y Detalle)
 * Centraliza las peticiones GET a la API REST de productos.
 */
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const PRODUCTOS_URL = `${API_BASE}/api/productos`;

// Desempaqueta la respuesta: soporta { data: ... } o el recurso directo
const parseResponse = async (response) => {
  let json = null;
  try {
    json = await response.json();
  } catch {
    // Respuesta sin cuerpo JSON
  }

  if (!response.ok) {
    const error = new Error(json?.message || `Error en el servidor (HTTP ${response.status})`);
    error.status = response.status;
    throw error;
  }

  return json && json.data !== undefined ? json.data : json;
};

/** GET /api/productos — devuelve el listado completo */
export const getProductos = async (signal) => {
  const response = await fetch(PRODUCTOS_URL, { signal });
  const data = await parseResponse(response);
  if (!Array.isArray(data)) {
    throw new Error('El formato de datos devuelto por la API no es válido.');
  }
  return data;
};

/** GET /api/productos/:id — devuelve un producto por su _id */
export const getProductoById = async (id, signal) => {
  const response = await fetch(`${PRODUCTOS_URL}/${encodeURIComponent(id)}`, { signal });
  return parseResponse(response);
};

/** Identificador del producto: _id de MongoDB o id numérico legado */
export const getProductoId = (product) => product?._id ?? product?.id;


import { apiClient } from '../services/api';

/**
 * Servicio de Productos (Catálogo y Detalle)
 * Centraliza las peticiones GET a la API REST de productos utilizando la instancia Axios (apiClient).
 */
const RAW_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const API_BASE = RAW_API_URL.replace(/\/api\/?$/, '');
export const PRODUCTOS_URL = `${API_BASE}/api/productos`;

// Desempaqueta la respuesta: soporta { data: ... } o el recurso directo
const unwrapData = (payload) =>
  payload && payload.data !== undefined ? payload.data : payload;

// Normaliza errores de Axios manteniendo compatibilidad con AbortError y códigos HTTP
const normalizeError = (err) => {
  if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') {
    const abortError = new Error('Petición cancelada');
    abortError.name = 'AbortError';
    return abortError;
  }
  const status = err?.response?.status;
  const message =
    err?.response?.data?.message ||
    (status ? `Error en el servidor (HTTP ${status})` : err?.message || 'Error de conexión');
  const error = new Error(message);
  if (status) error.status = status;
  return error;
};

/** GET /api/productos — devuelve el listado completo */
export const getProductos = async (signal) => {
  try {
    const response = await apiClient.get('/productos', { signal });
    const data = unwrapData(response.data);
    if (!Array.isArray(data)) {
      throw new Error('El formato de datos devuelto por la API no es válido.');
    }
    return data;
  } catch (err) {
    throw normalizeError(err);
  }
};

/** GET /api/productos/:id — devuelve un producto por su _id */
export const getProductoById = async (id, signal) => {
  try {
    const response = await apiClient.get(`/productos/${encodeURIComponent(id)}`, { signal });
    return unwrapData(response.data);
  } catch (err) {
    throw normalizeError(err);
  }
};

/** Identificador del producto: _id de MongoDB o id legado */
export const getProductoId = (product) => product?._id ?? product?.id;

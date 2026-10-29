import axios from 'axios';

/**
 * Instancia centralizada de Axios para comunicación con la API del Backend
 * - baseURL: apunta a VITE_API_URL (por defecto http://localhost:5000/api)
 * - timeout: 10000ms (10 segundos)
 * - headers: JSON por defecto
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;


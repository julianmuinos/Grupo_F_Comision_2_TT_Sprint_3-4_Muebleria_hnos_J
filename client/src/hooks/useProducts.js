import { useState, useEffect } from 'react';
import apiClient from '../services/api';

/**
 * Custom Hook useProducts
 * Encapsula la lógica de obtención de la lista completa de muebles desde la API.
 * Realiza una petición GET al endpoint /products utilizando la instancia apiClient (Axios).
 *
 * @returns {{
 *   products: Array,
 *   loading: boolean,
 *   error: string|null
 * }}
 */
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get('/products', {
          signal: controller.signal,
        });

        // Extraer los datos si la respuesta viene empaquetada en { success: true, data: [...] } o directa
        const data = response.data && response.data.data !== undefined ? response.data.data : response.data;
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        // Ignorar cancelaciones intencionales por desmontaje
        if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
          return;
        }

        const mensajeError =
          err.response?.data?.message ||
          err.message ||
          'Error al obtener la lista de productos';

        setError(String(mensajeError));
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  return { products, loading, error };
};

export default useProducts;


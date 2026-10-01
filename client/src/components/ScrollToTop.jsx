import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente utilitario para resetear el scroll de la ventana
 * a la parte superior de forma inmediata al cambiar de ruta.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;

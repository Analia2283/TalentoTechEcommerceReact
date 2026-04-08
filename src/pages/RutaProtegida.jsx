import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from "../context/AuthContext";

function RutaProtegida({ children, soloAdmin = false }) {
  const { usuario, cargando } = useAuthContext();
  const location = useLocation();
 
  if (cargando) {
    return <div>Cargando...</div>;
  }

  if(!usuario) {
    return <Navigate to="/iniciar-sesion" state={{ from: location }} replace />;
  }

  if (soloAdmin && usuario.nombre !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
} export default RutaProtegida;

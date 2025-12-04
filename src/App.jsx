import Header from "./Componentes/Header";
import Footer from "./Componentes/Footer";
import DetalleProducto from "./Componentes/DetalleProducto";
import { Routes, Route } from "react-router-dom";
import Pagar from "./pages/Pagar";
import RutaProtegida from "./pages/RutaProtegida";
import IniciarSesion from "./pages/InicarSesion";
import Dashboard from "./Componentes/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import CarritoPagina from "./Componentes/CarritoPagina";
import Admin from "./Componentes/Admin";
import { ProductProvider } from "./context/ProductoContexto";
import ResultadosBusqueda from "./Componentes/ResultadosBusqueda";
import { SearchProvider } from "./context/BusquedaContext";
import { NotificationProvider } from "./context/NotificacionContext";
import Productos from "./Componentes/Productos";
import Contacto from "./Componentes/Contacto";
import EnConstruccion from "./Componentes/EnConstruccion/EnConstruccion";
import Home from "./Componentes/Home";
function App() {
  return (
    <div>
      <AuthProvider>
        <NotificationProvider>
          <CartProvider>
            <>
              <ProductProvider>
                <SearchProvider>
                  <Header />
                  <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/productos"} element={<Productos />} />
                    <Route
                      path="/categoria/:categoriaId"
                      element={<Productos />}
                    />
                    <Route
                      path={"/producto/:id"}
                      element={<DetalleProducto />}
                    />
                    <Route path="/busqueda" element={<ResultadosBusqueda />} />
                    <Route path={"/carrito"} element={<CarritoPagina />} />
                    <Route path="/ofertas" element={<EnConstruccion />} />
                    <Route path="/nuevosIngresos" element={<EnConstruccion />} />
                    <Route path="/contacto" element={<EnConstruccion />} />
                    <Route
                      path={"/iniciar-sesion"}
                      element={<IniciarSesion />}
                    />
                    <Route
                      path={"/pagar"}
                      element={
                        <RutaProtegida>
                          <Pagar />
                        </RutaProtegida>
                      }
                    />
                    <Route
                      path="/dashboard"
                      element={
                        <RutaProtegida soloAdmin={true}>
                          <Dashboard />
                        </RutaProtegida>
                      }
                    />
                    {/* RUTA PROTEGIDA - Admin */}
                    <Route
                      path="/admin"
                      element={
                        <RutaProtegida soloAdmin={true}>
                          <Admin />
                        </RutaProtegida>
                      }
                    />
                  </Routes>
                </SearchProvider>
              </ProductProvider>
              <Footer />
            </>
          </CartProvider>
        </NotificationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductosApi from "./ProductosApi/ProductosApi";
import Loader from "./Loader/Loader";
import { useCartContext } from "../context/CartContext";
import { useProductContext } from "../context/ProductoContexto";

const Tienda = () => {
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [error, setError] = useState(null);
  const { categoriaId } = useParams();
  const { productos, cargando } = useProductContext();

  const { agregarCarrito, restarCarrito } = useCartContext();

  useEffect(() => {
    if (categoriaId) {
      const productosFiltrados = productos.filter(
        (producto) => producto.categoria === categoriaId
      );
      setProductosFiltrados(productosFiltrados);
    } else {
      setProductosFiltrados(productos);
    }
  }, [categoriaId, productos]);

  if (cargando) {
    return <Loader />;
  }
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <ProductosApi
        productos={productosFiltrados}
        agregarCarrito={agregarCarrito}
        restarCarrito={restarCarrito}
      />
    </>
  );
};

export default Tienda;

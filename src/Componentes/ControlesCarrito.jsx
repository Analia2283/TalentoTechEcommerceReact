import { MdDeleteOutline } from "react-icons/md";
import { useCartContext } from "../context/CartContext";

const ControlesCarrito = ({
  product,
  agregarCarrito,
  restarCarrito,
  eliminarDelCarrito,
  cantidad,
}) => {
  const { getCantidadProducto } = useCartContext();

  const handleAgregar = () => {
    agregarCarrito(product);
  };

  const handleRestar = () => {
    restarCarrito(product);
  };
  const handleEliminarCompletamente = () => {
    eliminarDelCarrito(product.id);
  };

  const esVistaCarrito = !!eliminarDelCarrito;

  return (
    <>
      <button onClick={handleRestar}>-</button>
      <span style={{ margin: "0 10px", fontWeight: "bold" }}>{cantidad}</span>
      <button onClick={handleAgregar}>+</button>
      {esVistaCarrito && (
        <button
          onClick={handleEliminarCompletamente}
          style={{
            backgroundColor: "white",
            color: "red",
            marginLeft: "5px",
          }}
        >
          <MdDeleteOutline 
           />
        </button>
      )}
    </>
  );
};

export default ControlesCarrito;

import "./ProductosApi.css";
import TarjetaProducto from "../TarjetaProducto";
const ProductosApi = ({ productos, agregarCarrito, detalleProducto }) => {
  return (
    <div className="productos-container">
      <h3>Productos</h3>
      <div className="productos-grid">
        {productos.map((prod) => (
          <TarjetaProducto
            key={prod.id}
            product={prod}
            agregarCarrito={agregarCarrito}
            detalleProducto={detalleProducto}
            

          />
        ))}
      </div>
    </div>
  );
};

export default ProductosApi;

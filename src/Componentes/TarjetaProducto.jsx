import { Link } from "react-router-dom";
import ControlesCarrito from "./ControlesCarrito";
import { useCartContext } from "../context/CartContext";
import { Card, Button } from "react-bootstrap";


const TarjetaProducto = ({ product }) => {
  const {
    getCantidadProducto,
    agregarCarrito,
    restarCarrito,
    eliminarDelCarrito,
  } = useCartContext();

  
  const estaEnCarrito = !!eliminarDelCarrito;
  const cantidad = getCantidadProducto(product.id);

  return (
    <Card className="h-100 shadow-sm">
      <Link
        to={`/producto/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
        className="d-flex justify-content-center p-3"
      >
        <Card.Img
          variant="top"
          src={product.imagen}
          alt={product.nombre}
          style={{ maxHeight: "150px", objectFit: "contain", width: "100%" }}
        />
      </Link>

      <Card.Body className="d-flex flex-column">
        <Link
          to={`/producto/${product.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card.Title className="text-truncate" title={product.nombre}>
            {product.nombre}
          </Card.Title>
        </Link>
        <Card.Text className="fw-bold text-dark mt-auto">
          ${product.precio}
        </Card.Text>

        <div className="mt-2 mb-3">
          <ControlesCarrito
            product={product}
            agregarCarrito={agregarCarrito}
            restarCarrito={restarCarrito}
            eliminarDelCarrito={eliminarDelCarrito}
            cantidad={cantidad}
          />
        </div>

        {!estaEnCarrito && (
          <Link to={`/producto/${product.id}`}>
            <Button variant="outline-info" className="w-100">
              Más Detalle
            </Button>
          </Link>
        )}
      </Card.Body>
    </Card>
  );
};

export default TarjetaProducto;

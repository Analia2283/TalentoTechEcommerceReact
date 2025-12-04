import { Container, Row, Col, Button } from "react-bootstrap";
import mujerDeporte from "../../assets/mujer-deporte.jpg";
import { useCartContext } from "../../context/CartContext";

function FeaturedProduct() {
  const product = {
    id: 33,
    nombre: "RUNNING JACKET",
    subtitle: "Descubre tu estilo deportivo.",
    imagen: mujerDeporte,
    precio: 150,
    descuento: 130,
  };
  const { agregarCarrito } = useCartContext();

  return (
    <Container fluid className="py-5">
      <Row className="align-items-center">
       
        <Col md={7} className="bg-light d-flex justify-content-center">
          <img
            src={product.imagen}
            alt={product.nombre}
            className="img-fluid p-4"
          />
        </Col>

       
        <Col md={5} className="p-5">
          <p
            className="text-uppercase text-muted mb-2"
            style={{ letterSpacing: "0.2em" }}
          >
            {product.subtitle}
          </p>
          <h1 className="display-3 fw-bold mb-4">
            {product.nombre.split(" ")[0]} <br /> {product.nombre.split(" ")[1]}
          </h1>
          <div className="d-flex align-items-center mb-4">
            <span className="text-muted text-decoration-line-through me-3">
              ${product.precio.toFixed(3)}
            </span>
            <span className="fs-2 fw-bold text-dark">
              ${product.descuento.toFixed(3)}
            </span>
          </div>
          <Button onClick={() => agregarCarrito(product)} variant="dark" size="sm" className="fw-bold text-uppercase">
            <i className="bi bi-cart-fill me-2"></i> Añadir al Carrito
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default FeaturedProduct;
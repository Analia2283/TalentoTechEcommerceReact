import TarjetaProducto from "./TarjetaProducto";
import { useCartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import "./Carrito.module.css";
const Carrito = () => {
  const { carrito, vaciarCarrito, total } = useCartContext();
  const navigate = useNavigate();

  const irApagar = () => {
    navigate("/pagar");
  };

  return (
    <Container className="my-5">
      <h3 className="text-center fw-bold text-uppercase mb-4 border-bottom pb-2">Carrito de Compras</h3>
      {carrito.length === 0 ? (
        <Alert variant="ligth" className="text-center p-4 border border-dark">
          <Alert.Heading className="fw-bold text-uppercase">¡El Carrito Está Vacío!</Alert.Heading>
          <p className="mb-3">
            Una vez que añadas algo a tu carrito, aparecerá acá. ¿Listo para
            empezar?
          </p>
          <hr />
          <Link to="/productos" style={{ textDecoration: "none" }}>
            <Button variant="dark" className="text-uppercase fw-semibold">Empezar a Comprar</Button>
          </Link>
        </Alert>
      ) : (
        <Card className="border border-dark shadow-sm">
          <Card.Body>
            <Row xs={1} md={2} lg={3} className="g-4">
              {carrito.map((producto, i) => (
                <Col key={producto.id}>
                  <TarjetaProducto product={producto} />
                </Col>
              ))}
            </Row>
          </Card.Body>

          <Card.Footer className="d-flex justify-content-between align-items-center bg-white border-top border-dark">
            <h4 className="mb-0 text-dark">
              Total:{" "}
              <span className="fw-bold ">
                ${Number(total).toFixed(2)}
              </span>
            </h4>

            <div>
              <Button
                variant="outline-dark"
                onClick={vaciarCarrito}
                className="me-2 text-uppercase fw-semibold"
              >
                Vaciar Carrito
              </Button>
              <Button variant="dark" onClick={irApagar} className="text-uppercase fw-semibold">
                Proceder a Pagar
              </Button>
            </div>
          </Card.Footer>
        </Card>
      )}
    </Container>
  );
};

export default Carrito;

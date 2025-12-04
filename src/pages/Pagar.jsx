import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { useState } from "react";
import CompraExitosa from "../Componentes/CompraExitosa";

const Pagar = () => {
  const { usuario, cerrarSesion } = useAuthContext();
  const { carrito, vaciarCarrito } = useCartContext();
  const navigate = useNavigate();
  
  const [mostrarCompraExitosa, setMostrarCompraExitosa] = useState(false);
  
  

  const total = carrito.reduce((suma, producto) => {
    const cantidad = Number(producto.cantidad || 1);
    const precioUnitario = Number(producto.precio || 0);
    return suma + cantidad * precioUnitario;
  }, 0);

  const comprar = () => {
    vaciarCarrito();
    setMostrarCompraExitosa(true);
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Estado de tu carrito</h1>

      <Row>
        <Col md={4} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header as="h5" className="bg-primary text-white">
              Detalles de Usuario
            </Card.Header>
            <Card.Body>
              <Card.Title>Hola, {usuario.nombre}!</Card.Title>
              <Card.Text>Email: {usuario.email}</Card.Text>
            </Card.Body>
            <Card.Footer className="d-grid gap-2">
              <Button variant="outline-secondary" onClick={cerrarSesion}>
                Cerrar sesión
              </Button>
            </Card.Footer>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="shadow-lg h-100">
            <Card.Header as="h5">
              Resumen del Pedido ({carrito.length}{" "}
              {carrito.length === 1 ? "producto" : "productos"})
            </Card.Header>

            <Card.Body>
              {carrito.length > 0 ? (
                <ListGroup variant="flush">
                  {carrito.map((producto) => {
                    const cantidad = Number(producto.cantidad || 1);
                    const precioUnitario = Number(producto.precio || 0);
                    const subtotal = cantidad * precioUnitario;

                    return (
                      <ListGroup.Item
                        key={producto.id}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            width="50"
                            className="me-3 rounded"
                          />
                          <div>
                            <strong>{producto.nombre}</strong>
                            <div className="text-muted small">
                              {cantidad} x ${Number(precioUnitario).toFixed(2)}{" "}
                              c/u
                            </div>
                          </div>
                        </div>

                        <div className="text-end">
                          <strong className="text-success">
                            ${Number(subtotal).toFixed(2)}
                          </strong>
                        </div>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              ) : (
                <p className="text-center text-muted">
                  No hay productos en el carrito.
                </p>
              )}
            </Card.Body>

            {/* Total y Botones de Pago */}
            <Card.Footer className="d-grid gap-2">
              <div className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>${Number(total).toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Envio:</span>
                <span className="text-success">Gratis</span>
              </div>

              <h4 className="d-flex justify-content-between">
                <span>Total a pagar:</span>
                <span className="fw-bold text-danger">
                  ${Number(total).toFixed(2)}
                </span>
              </h4>

              <div className="d-flex justify-content-between">
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate("/")}
                >
                  {carrito.length > 0
                    ? "Seguir Comprando"
                    : "Volver a Productos"}
                </Button>

                {carrito.length > 0 && (
                  <Button variant="success" onClick={comprar}>
                    Confirmar y Pagar
                  </Button>
                )}
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      {mostrarCompraExitosa && (
        <CompraExitosa
          onClose={() => setMostrarCompraExitosa(false)}
          onGoHome={() => navigate("/")}
          onGoProductos={() => navigate("/productos")}
        />
      )}
    </Container>
  );
};

export default Pagar;

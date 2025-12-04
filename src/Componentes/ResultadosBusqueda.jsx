import { useSearch } from "../context/BusquedaContext";
import { useProductContext } from "../context/ProductoContexto";
import { Container, Row, Col } from "react-bootstrap";
import TarjetaProducto from "./TarjetaProducto";

const Busqueda = () => {
  const { busqueda } = useSearch();
  const { productos } = useProductContext();

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
  return (
    <Container className="py-4 py-lg-5">
      <h4 className="mb-4 text-dark fw-bold">
        Resultados de Búsqueda: "{busqueda}"
      </h4>

      <Row className="g-4">
        {productosFiltrados.length > 0 ? (
          <>
            {productosFiltrados.map((producto) => (
              <Col xs={12} sm={6} lg={3} key={producto.id}>
                <TarjetaProducto product={producto} />
              </Col>
            ))}
          </>
        ) : (
          <Col xs={12}>
            <p className="text-center text-muted fs-5 p-5">
              Ups! No hay productos que coincidan con la búsqueda "{busqueda}".
            </p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Busqueda;

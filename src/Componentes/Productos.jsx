import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductoContexto";
import { useState, useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import TarjetaProducto from "./TarjetaProducto";
import Loader from "./Loader/Loader";

const Productos = () => {
  const { productos, isLoading, error } = useProductContext();
  const { agregarCarrito, restarCarrito } = useCartContext();
  const { categoriaId } = useParams();

  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const productosPorPagina = 8;
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    let listaAFiltrar = productos;
    if (categoriaId) {
      listaAFiltrar = productos.filter(
        (producto) => producto.categoria === categoriaId
      );
    }

    setProductosFiltrados(listaAFiltrar);

    setPaginaActual(1);
  }, [categoriaId, productos]);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }
  if (productosFiltrados.length === 0 && !isLoading) {
    return <h2>No hay productos disponibles en esta categoría.</h2>;
  }

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  const totalPaginas = Math.ceil(
    productosFiltrados.length / productosPorPagina
  );
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  const obtenerItemsPaginacion = () => {
    let items = [];
    for (let numero = 1; numero <= totalPaginas; numero++) {
      items.push(
        <Pagination.Item
          key={numero}
          active={numero === paginaActual}
          onClick={() => cambiarPagina(numero)}
          
        >
          {numero}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <Container className="my-5">
      <h4>
        {categoriaId
          ? `Productos en: ${categoriaId.toUpperCase()}`
          : "Todos los Productos"}
      </h4>

      <Row xs={1} md={2} lg={4} className="g-4 mt-3">
        {productosActuales.map((producto) => (
          <Col key={producto.id} className="d-flex">
            <TarjetaProducto product={producto} />
          </Col>
        ))}
      </Row>
      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center my-5">
          <Pagination>
            <Pagination.Prev
              onClick={() => cambiarPagina(paginaActual - 1)}
              disabled={paginaActual === 1}
              
            />
            {obtenerItemsPaginacion()}
            <Pagination.Next
              onClick={() => cambiarPagina(paginaActual + 1)}
              disabled={paginaActual === totalPaginas}
              
            />
          </Pagination>
        </div>
      )}
    </Container>
  );
};

export default Productos;

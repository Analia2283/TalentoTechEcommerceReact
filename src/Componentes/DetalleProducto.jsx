import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ControlesCarrito from "./ControlesCarrito";
import { useCartContext } from "../context/CartContext";
import { Card, Button } from "react-bootstrap";
import Loader from "./Loader/Loader";
const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { agregarCarrito, restarCarrito, getCantidadProducto } =
    useCartContext();
  const cantidad = producto ? getCantidadProducto(producto.id) : 0;

  const URL = `https://6926249226e7e41498f98842.mockapi.io/productos/${id}`;

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Producto con ID ${id} no encontrado.`);
        }
        return res.json();
      })
      .then((data) => {
        if (Object.keys(data).length === 0) {
          throw new Error(`Producto con ID ${id} no existe.`);
        }
        const productoMapeado = {
          id: data.id,
          nombre: data.title,
          descripcion: data.description,
          precio: data.price,
          imagen: data.image,
        };

        setProducto(productoMapeado);
      })
      .catch((error) => {
        console.error("Error al obtener detalle:", error);
        setProducto(null);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !producto) {
    return (
      <>
        <p> {error || "Error al obtener detalle del producto."}</p>
        <Link to="/carrito">
          <Button>Volver a la Tienda</Button>
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-center mt-4 mb-4">
        <Card style={{ width: "25rem" }}>
          <Card.Img
            variant="top"
            src={producto.imagen}
            alt={producto.nombre}
            style={{
              maxHeight: "250px",
              objectFit: "contain",
              padding: "10px",
            }}
          />
          <Card.Body>
            <Card.Title>{producto.nombre}</Card.Title>

            <Card.Text>{producto.descripcion}</Card.Text>
            <p className="card-text fs-5 fw-bold">Precio: ${producto.precio}</p>

            <Link to={"/productos"} className="me-2">
              <Button variant="secondary">Volver</Button>
            </Link>

            <ControlesCarrito
              product={producto}
              agregarCarrito={agregarCarrito}
              restarCarrito={restarCarrito}
              cantidad={cantidad}
            />
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default DetalleProducto;

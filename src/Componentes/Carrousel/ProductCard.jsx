import { Card, Button } from "react-bootstrap";
import { useCartContext } from "../../context/CartContext";

function ProductCard({ id, title, image, price, discount, category }) {
  const { agregarCarrito } = useCartContext();
  const handleAddToCart = () => {
    const producto = {
      id,
      nombre: title,
      precio: discount,
      imagen: image,
      category,
    };
    agregarCarrito(producto);
  };

  return (
    <Card className="text-center border-0">
      <Card.Img
        variant="top"
        src={image}
        alt={title}
        className="mx-auto d-block"
        style={{ width: "200px", height: "200px", objectFit: "cover" }}
      />
      <Card.Body className="px-2">
        <Card.Title className="fs-6 fw-bold">{title}</Card.Title>
        <Card.Text className="text-muted small">{category}</Card.Text>
        <Card.Text>
          <strong className="text-dark">${discount.toLocaleString()}</strong>
        </Card.Text>
        <Button
          onClick={handleAddToCart}
          variant="dark"
          size="sm"
          className="text-uppercase"
        >
          Añadir al Carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;

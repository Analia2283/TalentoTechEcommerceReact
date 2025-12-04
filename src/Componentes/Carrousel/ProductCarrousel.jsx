import { Carousel, Container, Button } from "react-bootstrap";
import ProductCard from "./ProductCard";

function ProductCarousel() {
  const products = [
    {
      title: "ZAPATILLAS SL 72 RS",
      category: "Originals",
      image:
        "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/942e51bce8d84b32ac08866e2f57fe7b_9366/SAMBA_OG_Azul_IH6827_01_00_standard.jpg",
      price: 149999,
      discount: 149999,
      id: 40,
    },
    {
      title: "SAMBA OG",
      category: "Originals",
      image:
        "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/942e51bce8d84b32ac08866e2f57fe7b_9366/SAMBA_OG_Azul_IH6827_01_00_standard.jpg",
      price: 189999,
      discount: 189999,
      id: 41,
    },
    {
      title: "Zapatillas RESPONSE RUNNER 2",
      category: "Performance",
      image:
        "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/7666f89c54fd4627b4a8d798a81ae842_9366/Zapatillas_RESPONSE_RUNNER_2_Negro_KJ1737_HM1.jpg",
      price: 89999,
      discount: 89999,
      id: 42,
    },
    {
      title: "ADIDAS MINECRAFT PRO JÓVENES",
      category: "Sportswear",
      image:
        "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/9808ad97eb674f609fbaa0209488f28b_9366/ZAPATILLAS_ADIDAS_MINECRAFT_PRO_PARA_JOVENES_Negro_JR1966_01_00_standard.jpg",
      price: 109999,
      discount: 109999,
      id: 43,
    },
  ];

  return (
    <section className="bg-light py-3">
      <Container>
        <div className="text-center mb-4">
          <h4 className="fw-bold">CONOCÉ NUESTROS PRODUCTOS</h4>
        </div>

        <Carousel>
          {products.map((product, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center py-4">
                <ProductCard {...product} />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}

export default ProductCarousel;

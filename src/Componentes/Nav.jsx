import { Link } from "react-router-dom";
import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap";
import { MdShoppingBasket } from "react-icons/md";
import { TbNut } from "react-icons/tb";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import BarraDeBusqueda from "./BarraDeBusqueda";
import "./Nav.module.css";
const NavBarra = () => {
  const { usuario, cerrarSesion, isAuthenticated } = useAuthContext();
  const { carrito } = useCartContext();

  const esAdmin = isAuthenticated && usuario.nombre === "admin";

  return (
    <Navbar expand="lg" className="bg-white border-bottom border-light py-3 navbar-mobile-fixed">
      <Container fluid className="px-5">
        <Navbar.Brand
          as={Link}
          to={""}
          className="text-dark fw-bolder fs-4 me-4"
        >
          <span
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              border: "1px solid #000",
              padding: "0.4rem 0.75rem",
              userSelect: "none",
            }}
          >
            ARENA SPORT
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" className="border-0" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto text-uppercase fw-semibold" navbarScroll>
            {/* Links principales */}
            <Nav.Link as={Link} to={"/"} className="text-dark mx-3">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/productos"} className="text-dark mx-3">
              Shop
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/categoria/ropa-mujer"}
              className="text-dark mx-3"
            >
              Mujer
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/categoria/ropa-hombre"}
              className="text-dark mx-3"
            >
              Hombre
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/categoria/calzado"}
              className="text-dark mx-3"
            >
              Calzado
            </Nav.Link>
            <NavDropdown
              title="Más Opciones"
              id="navbarScrollingDropdown"
              className="text-dark mx-3"
            >
              <NavDropdown.Item as={Link} to={"/ofertas"}>
                Ofertas
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/nuevosIngresos"}>
                Nuevos ingresos
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to={"/contacto"}>
                Contacto
              </NavDropdown.Item>
            </NavDropdown>

            {/* ENLACE DASHBOARD solo para admin */}
            {esAdmin && (
              <Nav.Link
                as={Link}
                to="/dashboard"
                className="text-dark d-flex align-items-center mx-3"
              >
                <span className="me-1 fs-5" style={{ lineHeight: "1" }}>
                  <TbNut />
                </span>{" "}
                Dashboard
              </Nav.Link>
            )}
          </Nav>

          <Nav
            className="d-flex align-items-center ms-auto"
            style={{ gap: "1rem" }}
          >
            <BarraDeBusqueda className="d-none d-lg-block me-3 d-flex align-items-center" />
            {isAuthenticated ? (
              <NavDropdown
                title={
                  <span className="text-dark fs-5" style={{ lineHeight: "1" }}>
                    👤
                  </span>
                }
                id="userDropdown"
                align="end"
                className="d-none d-lg-block"
              >
                <NavDropdown.Header>Hola, {usuario.nombre}!</NavDropdown.Header>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/perfil">
                  Perfil
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/" onClick={cerrarSesion}>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              // Si NO está autenticado, muestra el ícono de Ingreso
              <>
                <Nav.Link
                  as={Link}
                  to="/iniciar-sesion"
                  className="text-dark p-0 d-none d-lg-block "
                >
                  <span className="fs-5 text-dark" style={{ lineHeight: "1" }}>
                    👤
                  </span>
                </Nav.Link>
              </>
            )}

            <div
              className="d-none d-lg-block"
              style={{ height: "20px", width: "1px", backgroundColor: "#ccc" }}
            ></div>

            <Nav.Link
              as={Link}
              to={"/carrito"}
              className="position-relative text-dark p-0"
            >
              <span className="fs-5 text-dark" style={{ lineHeight: "1" }}>
                <MdShoppingBasket />
              </span>

              <span
                className="position-absolute translate-middle badge rounded-pill bg-dark"
                style={{ fontSize: "0.65rem", top: "10%", left: "90%" }}
              >
                {carrito.length}
              </span>
            </Nav.Link>

            {/* Botones de Login/Logout para MÓVIL */}
            {isAuthenticated ? (
              <Nav.Link as={Link} to="/" className="d-lg-none">
                <Button onClick={cerrarSesion} variant="outline-dark" size="sm">
                  Cerrar Sesión
                </Button>
              </Nav.Link>
            ) : (
              <Nav.Link
                as={Link}
                to="/iniciar-sesion"
                className="d-lg-none text-dark"
              >
                Ingresa
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarra;

import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

const Footer = () => {

  return (
    <>
   <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link as={Link} to={"/"} style={{textDecoration: "none", color: "black"}}>Mi Tienda</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={"/categoria/ropa-mujer"} style={{textDecoration: "none", color: "black"}}>Mujer</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={"/categoria/ropa-hombre"} style={{textDecoration: "none", color: "black"}}>Hombre</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={"/categoria/calzado"} style={{textDecoration: "none", color: "black"}}>Calzado</Nav.Link>
        </Nav.Item>
      </Nav>
    <div style = {{fontSize: "11px", textAlign: "center", color: "black" }} >
     &copy; 2025 {" "} <a href="https://github.com/Analia2283"  target="_blank" style={{textDecoration: "none", color: "black"}}>Analia Isla</a>.
     <p>Todos los Derechos Reservados</p>
    </div>
    
      
    </>
  )
}

export default Footer



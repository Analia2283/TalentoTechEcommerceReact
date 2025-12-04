import { useSearch } from "../context/BusquedaContext";
import { useNavigate } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
const BarraDeBusqueda = () => {
  const { busqueda, setBusqueda } = useSearch();
  const navigate = useNavigate();

  const manejarBusqueda = (evento) => {
    const valor = evento.target.value;
    setBusqueda(valor);

    if (valor.trim()) {
      navigate("/busqueda");
    }
  };

  return (
    <Form className="d-flex me-3">
      <InputGroup>
        <InputGroup.Text id="basic-addon1">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="search"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={manejarBusqueda}
          className="me-2"
          aria-label="Search"
        />
      </InputGroup>
    </Form>
  );
};

export default BarraDeBusqueda;

import { useState, useEffect } from "react";
import { useProductContext } from "../context/ProductoContexto";
import { useLocation } from "react-router-dom";
import styles from "./GestionProducto.module.css";
import CirclePlus from "../assets/CirclePlus";
import SquarePen from "../assets/SquarePen";
import TrashIcon from "../assets/TrashIcon";
import FormularioProducto from "./FormularioProducto";

const GestionProductos = () => {
  
  const { productos, eliminarProducto } = useProductContext();
  const location = useLocation();
  
  const [mostrarForm, setMostrarForm] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("agregar"); 
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accion = params.get("action");

    if (accion === "agregar") {
      setModoFormulario("agregar");
      setProductoSeleccionado({
        nombre: "",
        precio: "",
        descripcion: "",
        categoria: "",
        imagen: "",
      });
      setMostrarForm(true);
    }
  }, [location.search]);

  // Abrir formulario para AGREGAR
  const abrirFormularioAgregar = () => {
    setModoFormulario("agregar");
    setProductoSeleccionado({
      nombre: "",
      precio: "",
      descripcion: "",
      categoria: "",
      imagen: "",
    });
    setMostrarForm(true);
  };

  // Abrir formulario para EDITAR
  const abrirFormularioEditar = (producto) => {
    setModoFormulario("editar");
    setProductoSeleccionado(producto); // Pasar el producto a editar
    setMostrarForm(true);
  };

  // Cerrar formulario
  const cerrarFormulario = () => {
    setMostrarForm(false);
    setProductoSeleccionado(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.panel}>

        {!mostrarForm && ( 
          <>
        <div className={styles.cabecera}>
          <h3>Lista de Productos</h3>
          {/* Botón para agregar producto */}
          <button
            onClick={abrirFormularioAgregar}
            className={styles.botonAgregar}
          >
            <CirclePlus />
            <p>Agregar Producto</p>
          </button>
        </div>
        {/* Lista de productos */}
        <div>
          {productos.length === 0 ? (
            <p>No hay productos</p>
          ) : (
            <div style={{ display: "grid", gap: "5px" }}>
              {productos.map((producto) => (
                <div key={producto.id} className={styles.productoItem}>
                  <img
                    className={styles.imagen}
                    src={producto.imagen}
                    alt={producto.nombre}
                  />
                  <h3>{producto.nombre}</h3>
                  <p>Precio: ${producto.precio}</p>
                  {/* Botones para editar y eliminar este producto */}
                  <button
                    className={styles.boton}
                    onClick={() => abrirFormularioEditar(producto)}
                  >
                    <SquarePen />
                  </button>
                  <button
                    className={styles.boton}
                    onClick={() => eliminarProducto(producto.id)}
                  >
                    <TrashIcon />
                  </button>
                </div>
             ) )}
            </div>
           
          )}
        </div>
         </>
        )}

        {mostrarForm && (
          <>
            <FormularioProducto
              productoInicial={productoSeleccionado || {}}
              modo={modoFormulario}
              OnCerrar={cerrarFormulario}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default GestionProductos;

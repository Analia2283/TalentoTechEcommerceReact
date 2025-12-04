import { useState, useEffect } from "react";
import Loader from "./Loader/Loader";

const EditarProducto = ({productoSeleccionado, onActualizar} ) => {
    const [producto, setProducto] = useState(productoSeleccionado || {
        nombre: "",
        precio: "",
        imagen: "",
        categoria: "",
        descripcion: ""
    });

    const API ="https://6926249226e7e41498f98842.mockapi.io/productos/"; 
   
    useEffect(()=>{
        if(productoSeleccionado)
            setProducto(productoSeleccionado)

    }, [productoSeleccionado] );

    const manejarCambio = (e) => {
        const [name, value] = e.target;
        setProducto ({...producto, [name]: value });
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await fetch (`{API}/${producto.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(producto),
            });

            if(!respuesta.ok) throw new Error("Error al actualizar el prodcuto");

            const data = await respuesta.json();
            onActualizar(datos);
            alert("Huno un error al actualizar un producto");
        } catch (error) {
            
        }
    };

  return (
    <>
    <form
      onSubmit={manejarSubmit}
      style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2>Editar Producto</h2>

          {/* Campo Nombre */}
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Nombre: *
            </label>
            <input
              type="text"
              name="nombre"
              value={producto.nombre || '' }
              onChange={manejarCambio}
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "8px",
                border: `1px solid ${errores.nombre ? "red" : "#ccc"}`,
                borderRadius: "4px",
              }}
              placeholder="Ingrese el nombre del producto"
            />
            {errores.nombre && (
              <p style={{ color: "red", margin: "5px 0", fontSize: "14px" }}>
                {errores.nombre}
              </p>
            )}
          </div>

          {/* Campo Precio */}
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Precio: *
            </label>
            <input
              type="number"
              name="precio"
              value={producto.precio || ''}
              onChange={manejarCambio}
              disabled={isLoading}
              placeholder="Ej: 40.000 o 40.000,50"
              inputMode="decimal"
              style={{
                width: "100%",
                padding: "8px",
                border: `1px solid ${errores.precio ? "red" : "#ccc"}`,
                borderRadius: "4px",
              }}
            />
            <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
              Formato argentino: punto para miles, sin decimales.
            </div>
            {errores.precio && (
              <p style={{ color: "red", margin: "5px 0", fontSize: "14px" }}>
                {errores.precio}
              </p>
            )}
          </div>

          {/* Campo Categoría */}
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Categoría:
            </label>
            <input
              type="text"
              name="categoria"
              value={producto.categoria || ''}
              onChange={manejarCambio}
              disabled={isLoading}
              placeholder="Ej: Electrónica, Ropa, Hogar, etc."
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          {/* Campo imagen URL */}
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Imagen (URL):
            </label>
            <input
              type="text"
              name="imagen"
              value={producto.imagen || ''}
              onChange={manejarCambio}
              disabled={isLoading}
              placeholder="https://ejemplo.com/avatar.jpg"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            {errores.imagen && <p style={{color:'red'}} >{errores.imagen}</p>}
          </div>

          {/* Campo Descripción */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Descripción: *
            </label>
            <textarea
              name="descripcion"
              value={producto.descripcion || ''}
              onChange={manejarCambio}
              rows="4"
              disabled={isLoading}
              maxLength="200"
              placeholder="Mínimo 10 caracteres, máximo 200 caracteres"
              style={{
                width: "100%",
                padding: "8px",
                border: `1px solid ${errores.descripcion ? "red" : "#ccc"}`,
                borderRadius: "4px",
                resize: "vertical",
              }}
            />
            <div
              style={{
                fontSize: "12px",
                color: producto.descripcion.length > 200 ? "red" : "#666",
                marginTop: "5px",
              }}
            >
              {producto.descripcion.length}
            </div>
            {errores.descripcion && (
              <p style={{ color: "red", margin: "5px 0", fontSize: "14px" }}>
                {errores.descripcion}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: isLoading ? "#ccc" : "darkolivegreen",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Actualizar..." : "Actualizar Producto"}
          </button>
          <p>(*) Campos obligatorios</p>
        </>
      )}
    </form>

      
    </>
  )
}

export default EditarProducto;

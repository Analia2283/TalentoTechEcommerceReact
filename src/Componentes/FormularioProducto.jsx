import React, { useState, useEffect } from "react";

import { useProductContext } from "../context/ProductoContexto";
import styles from "./FormularioProducto.module.css";
import Loader from "./Loader/Loader";
import X from "../assets/X";

const FormularioProducto = ({
  productoInicial = {},
  modo = "agregar",
  OnCerrar,
}) => {
  const [producto, setProducto] = useState(productoInicial);
  const [errores, setErrores] = useState({}); //
  const { agregarProducto, editarProducto, isLoading } = useProductContext();

  useEffect(() => {
    setProducto(productoInicial);
    setErrores({}); 
  }, [productoInicial, modo]);

  
  const manejarOnChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value })); 

    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: "" }));
    }
  };

 
  const validarFormulario = () => {
    const errorDeCarga = {}; 

    if (!producto.nombre || !producto.nombre.trim()) {
      errorDeCarga.nombre = "El nombre es obligatorio.";
    } 

    if (
      !producto.imagen ||
      !producto.imagen.trim() ||
      producto.imagen.length < 6
    ) {
      errorDeCarga.imagen = "Debes subir la Url de una imagen válida.";
    } 
    

    if (!producto.precio || !String(producto.precio).trim()) {
      errorDeCarga.precio = "El precio es obligatorio.";
    } else {
      
      const precioNormalizado = String(producto.precio).replace(",", ".");
      const precioNumerico = parseFloat(precioNormalizado);

      
      if (!/^(\d+([.,]\d+)?)$/.test(String(producto.precio))) {
        errorDeCarga.precio =
          "Formato de precio no válido (ej: 40000 o 40000.50).";
      }
      
      else if (isNaN(precioNumerico) || precioNumerico <= 0) {
        errorDeCarga.precio = "El precio debe ser un número válido mayor a 0.";
      }
    } 

    if (!producto.descripcion || !producto.descripcion.trim()) {
      errorDeCarga.descripcion = "La descripción es obligatoria.";
    } else if (producto.descripcion.length < 10) {
      errorDeCarga.descripcion = "Mínimo 10 caracteres.";
    } else if (producto.descripcion.length > 200) {
      errorDeCarga.descripcion = "Máximo 200 caracteres.";
    }

    setErrores(errorDeCarga);
    return Object.keys(errorDeCarga).length === 0;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
      if (modo === "agregar") {
        await agregarProducto(producto);
      } else {
        await editarProducto(producto);
      }

      setProducto(productoInicial);
      setErrores({});
      OnCerrar();
    } catch (error) {
      console.error(`Error al ${modo}:`, error);
    }
  };

  return (
    <div className={styles.modalOverlay} aria-modal="true" role="dialog">
      <div className={styles.modalContainer}>
       
        <div className={styles.modalContent}>
          
          <div className={styles.modalHeader}>
            <h3 className={styles.modalHeaderTitle}>
              {modo === "agregar" ? "Agregar Producto" : "Editar Producto"}
            </h3>
            <button
              type="button"
              onClick={OnCerrar}
              className={styles.closeButton}
              disabled={isLoading} 
            >
              <X />
            </button>
          </div>
         
          {isLoading ? (
            <div style={{ padding: "40px", textAlign: "center" }}>
              <Loader />
              <p>
                {modo === "agregar"
                  ? "Agregando Producto..."
                  : "Actualizando Producto..."}
              </p>
            </div>
          ) : (
            <form onSubmit={manejarEnvio}>
              <div className={styles.formGrid}>
               

                {/* Campo Nombre */}
                <div className={styles.colSpan2}>
                  <label className={styles.formLabel}>Nombre: *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={producto.nombre || ""}
                    onChange={manejarOnChange}
                    disabled={isLoading}
                    className={`${styles.formInputBase} ${
                      errores.nombre ? styles.inputError : ""
                    }`}
                    placeholder="Ingrese el nombre del producto"
                  />
                  {errores.nombre && (
                    <p className={styles.errorText}>{errores.nombre}</p>
                  )}
                </div>

                {/* Campo Precio */}
                <div className={`${styles.colSpan2} ${styles.smColSpan1}`}>
                  <label className={styles.formLabel}>Precio: *</label>
                  <input
                    type="text"
                    name="precio"
                    value={producto.precio || ""}
                    onChange={manejarOnChange}
                    disabled={isLoading}
                    className={`${styles.formInputBase} ${
                      errores.precio ? styles.inputError : ""
                    }`}
                    placeholder="Ej: 40000 o 40000.50"
                    inputMode="decimal"
                    step="any"
                  />
                  {errores.precio && (
                    <p className={styles.errorText}>{errores.precio}</p>
                  )}
                </div>

                {/* Campo Categoría */}
                <div className={`${styles.colSpan2} ${styles.smColSpan1}`}>
                  <label className={styles.formLabel}>Categoría:</label>
                  <input
                    type="text"
                    name="categoria"
                    value={producto.categoria || ""}
                    onChange={manejarOnChange}
                    disabled={isLoading}
                    className={styles.formInputBase}
                    placeholder="Ej: Electrónica, Ropa, Hogar, etc."
                  />
                </div>

                {/* Campo URL de Imagen */}
                <div className={styles.colSpan2}>
                  <label className={styles.formLabel}>Imagen (URL): *</label>
                  <input
                    type="text"
                    name="imagen"
                    value={producto.imagen || ""}
                    onChange={manejarOnChange}
                    disabled={isLoading}
                    className={`${styles.formInputBase} ${
                      errores.image ? styles.inputError : ""
                    }`}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                  {errores.imagen && (
                    <p className={styles.errorText}>{errores.imagen}</p>
                  )}
                </div>

                {/* Campo Descripción */}
                <div className={styles.colSpan2}>
                  <label className={styles.formLabel}>Descripción: *</label>
                  <textarea
                    name="descripcion"
                    value={producto.descripcion || ""}
                    onChange={manejarOnChange}
                    rows="4"
                    disabled={isLoading}
                    maxLength="200"
                    className={`${styles.formInputBase} ${
                      errores.descripcion ? styles.inputError : ""
                    }`}
                    placeholder="Mínimo 10 caracteres, máximo 200 caracteres"
                  ></textarea>
                  <div className={styles.charCount} style={{ color: producto.descripcion.length > 200 ? "red" : "inherit" }}
>
                    {producto.descripcion.length || 0} / 200
                  </div>
                  {errores.descripcion && (
                    <p className={styles.errorText}>{errores.descripcion}</p>
                  )}
                </div>
              </div>

              {/* Botones de Accion */}
              <div className={styles.modalActions}>
                {/* Boton Primario */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`${styles.btnBase} ${styles.btnPrimary}`}
                >
                  {modo === "agregar"
                    ? "Agregar Producto"
                    : "Actualizar Producto"}
                </button>
                {/* Boton Secundario o de cancelar */}
                <button
                  type="button"
                  onClick={OnCerrar}
                  disabled={isLoading}
                  className={`${styles.btnBase} ${styles.btnSecondary}`}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormularioProducto;

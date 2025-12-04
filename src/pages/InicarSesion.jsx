import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import styles from "./IniciarSesion.module.css";

const IniciarSesion =()=>{
  const { iniciarSesion } = useAuthContext();
  const navigate = useNavigate();
  const ubicacion = useLocation();

  //const { setIsAuthenticated, setUsuario } = useAppContext();
 
  const [formulario, setFormulario] = useState({ nombre: '', email: '' });

  const manejarEnvio = (e) => {
    e.preventDefault();
    
    // Verificar credenciales (admin/1234@admin)
    if (formulario.nombre === "admin" && formulario.email === "1234@admin") {
      // Guarda el email ingresado y pasa nombre para el token admin
      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion("admin");
      navigate("/dashboard");
    }
    // Lógica para usuarios normales - si NO es admin
    else if (
      formulario.nombre &&
      formulario.email &&
      formulario.nombre !== "admin"
    ) {
  // Guarda el email ingresado y pasa nombre para el token user
  localStorage.setItem("authEmail", formulario.email);
  iniciarSesion(formulario.nombre);

      // Si venía del carrito, redirige a pagar
      if (ubicacion.state?.carrito) {
        navigate("/pagar", { state: { carrito: ubicacion.state.carrito } });
      } else {
        navigate("/");
      }
    } else {
      alert(
        "Credenciales de administrador incorrectas. Usa: admin / 1234@admin"
      );
    }
  };

 

  return (
    <div className={styles.wrapper}>
      <main className={styles.card}>
        <h1 className={styles.title}>Inicia sesión para continuar</h1>
        <hr className={styles.rule} />
        <form onSubmit={manejarEnvio} className={styles.form}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={formulario.nombre}
            onChange={(e) =>
              setFormulario({ ...formulario, nombre: e.target.value })
            }
            required
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={formulario.email}
            onChange={(e) =>
              setFormulario({ ...formulario, email: e.target.value })
            }
            required
            className={styles.input}
          />
          <div className={styles.actions}>
            <button type="submit" className={styles.button}>
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className={styles.buttonOutline}
            >
              Cancelar
            </button>
          </div>
        </form>
        <p className={styles.note}>
          <strong>Credenciales de prueba para Dashboard:</strong>
          <br />
          Nombre: admin
          <br />
          Email: 1234@admin
        </p>
      </main>
    </div>
);
}

export default IniciarSesion;

import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { usuario, cerrarSesion } = useAuthContext();

  // Obtener el token actual
  const tokenActual = localStorage.getItem("authToken");

  return (
     <div className={styles.wrapper}>
      <main className={styles.card}>
        <h1 className={styles.title}>Dashboard Administrativo</h1>
        <hr className={styles.rule} />

        <p className={styles.text}>
          <strong>Iniciaste sesión como:</strong> {usuario.nombre}
        </p>

        {/* SECCIÓN DEL TOKEN */}
        <div className={styles.tokenBox}>
          <strong>Token de autenticación:</strong>
          <br />
          <code>{tokenActual}</code>
        </div>

        {/* SECCIÓN DE ACCIONES ADMIN */}
        <div className={styles.actions}>
          <h3 className={styles.subtitle}>Acciones</h3>
          <div className={styles.links}>
            <Link to="/admin?action=agregar" className={styles.button}>
              Agregar Nuevo Producto
            </Link>
            <Link to="/admin" className={styles.buttonOutline}>
              Ver Todos los Productos
            </Link>
          </div>
        </div>

        <hr className={styles.rule} />

        {/* BOTÓN CERRAR SESIÓN */}
        <button onClick={cerrarSesion} className={styles.buttonDanger}>
          Cerrar sesión
        </button>
      </main>
    </div>
     );
};

export default Dashboard;




































{/* <div style={{ padding: "20px", minHeight: "60vh" }}>
      <h1>Dashboard Administrativo - Panel de control</h1>
      <div
        style={{ background: "#f5f5f5", padding: "20px", borderRadius: "8px" }}
      >
        <p>
          <strong>Iniciaste sesión como: </strong> {usuario.nombre}
        </p> */}

        {/* SECCIÓN DEL TOKEN */}
        {/* <div
          style={{
            background: "#e9ecef",
            padding: "10px",
            borderRadius: "4px",
            margin: "10px 0",
            fontSize: "14px",
          }}
        >
          <strong>Token de autenticación:</strong>
          <br />
          <code>{tokenActual}</code>
        </div> */}

        {/* SECCIÓN DE ACCIONES ADMIN */}
        {/* <div style={{ margin: "20px 0" }}>
          <h3>Acciones:</h3>
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "10px",
            }}
          >
            <Link
              to="/admin?action=agregar"
              style={{
                padding: "10px 20px",
                background: "#28a745",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
                display: "inline-block",
              }}
            >
              Agregar Nuevo Producto
            </Link>

            <Link
              to="/admin"
              style={{
                padding: "10px 20px",
                background: "#17a2b8",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
                display: "inline-block",
              }}
            >
              Ver Todos los Productos
            </Link>
          </div>
        </div>
        <hr></hr> */}

        {/* BOTÓN CERRAR SESIÓN */}
    //      <button
    //       onClick={cerrarSesion}
    //       style={{
    //         padding: "10px 20px",
    //         background: "#dc3545",
    //         color: "white",
    //         border: "none",
    //         borderRadius: "4px",
    //         cursor: "pointer",
    //         marginTop: "10px",
    //       }}
    //     >
    //       Cerrar sesión
    //     </button>
    //   </div>
    // </div> 
 

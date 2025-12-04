import GestionProductos from "../Componentes/GestionProductos";

const Admin = () => {
  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",   
        justifyContent: "flex-start",
        minHeight: "100vh",
        padding: "2rem",
        backgroundColor: "#f9f9f9", 
      }}
>
      <h1 style={{
          fontSize: "2rem",
          fontWeight: "600",
          color: "#222",
          marginBottom: "2rem",
          textAlign: "center",   
          letterSpacing: "0.5px",
        }} >Gestión de Productos</h1>
      <GestionProductos />
    </div>
  );
};

export default Admin;

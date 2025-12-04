import React from "react";

const CompraExitosa = ({ onClose, onGoHome, onGoProductos }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)", // fondo oscuro translúcido
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "2rem",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ marginBottom: "1rem", color: "#000" }}>✅ Compra exitosa</h2>
        <p style={{ marginBottom: "2rem", color: "#333" }}>
          Tu pedido fue procesado correctamente.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button
            onClick={onGoHome}
            style={{
              background: "#000",
              color: "#fff",
              padding: "0.6rem 1.2rem",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Volver al inicio
          </button>
          <button
            onClick={onGoProductos}
            style={{
              background: "#fff",
              color: "#000",
              padding: "0.6rem 1.2rem",
              borderRadius: "8px",
              border: "1px solid #000",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Ver productos
          </button>
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: "1.5rem",
            background: "transparent",
            border: "none",
            color: "#555",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default CompraExitosa;
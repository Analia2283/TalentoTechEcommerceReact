import { createContext, useContext, useState } from "react";
import { useNotification } from "./NotificacionContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const { showToast } = useNotification();

  const agregarCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productosExistentes = prevCarrito.find(
        (item) => item.id === producto.id
      );
      if (productosExistentes) {
        showToast({
            title: "Añadido al Carrito",
            message: `Una unidad más de ${producto.nombre} agregada.`,
            variant: "success",
        });
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      } else {
        showToast({
            title: "Añadido al Carrito",
            message: `${producto.nombre} agregado al carrito.`,
            variant: "success",
        });
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  const restarCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoEncontrado = prevCarrito.find(
        (item) => item.id === producto.id
      );

      if (productoEncontrado) {
        showToast({
                title: "Removido",
                message: `Una unidad de ${producto.nombre} ha sido removida.`,
                variant: "info",
            });
        if (productoEncontrado.cantidad > 1) {
          return prevCarrito.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad - 1 }
              : item
          );
        } else {
          showToast({
                title: "Eliminado del Carrito",
                message: `${producto.nombre} eliminado del carrito.`,
                variant: "danger",
            });
          return prevCarrito.filter((item) => item.id !== producto.id);
        }
      }
      return prevCarrito;
    });
  };

  const getCantidadProducto = (productId) => {
    const productoEnCarrito = carrito.find((item) => item.id === productId);
    return productoEnCarrito ? productoEnCarrito.cantidad : 0;
  };

  const total = carrito.reduce((suma, producto) => {
    const cantidad = Number(producto.cantidad || 1);
    const precioUnitario = Number(producto.precio || 0);
    return suma + cantidad * precioUnitario;
  }, 0);

  const eliminarDelCarrito = (idAEliminar) => {
    const itemAEliminar = carrito.find((item) => item.id === idAEliminar);
    setCarrito((prevCarrito) =>
      prevCarrito.filter((item) => item.id !== idAEliminar)
    );
  
    if (itemAEliminar) {
        showToast({
            title: "Eliminado del Carrito",
            message: `${itemAEliminar.nombre} removido completamente del carrito.`,
            variant: "danger",
        });
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const cerrarSesion = () => {
    setIsAuthenticated(false);
    setUsuario({ nombre: "", email: "" });
    vaciarCarrito();
  };

  const value = {
    cerrarSesion,

    //Carrito
    carrito,
    agregarCarrito,
    restarCarrito,
    vaciarCarrito,
    eliminarDelCarrito,
    getCantidadProducto,
    total,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de CartProvider");
  }
  return context;
}

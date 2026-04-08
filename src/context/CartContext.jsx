import { createContext, useContext, useEffect, useState } from "react";
import { useNotification } from "./NotificacionContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [cargaCompleta, setCargaCompleta] = useState(false); // flag o bandera
  const { showToast } = useNotification();

  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito"); //traiga del local storage el carrito guardado
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
    setCargaCompleta(true);
  }, []);

  //cada vez que el carrito cambie, se va a guardar en el local storage, pero solo si la carga inicial ya se completo, para evitar sobreescribir el carrito con un estado vacio al inicio
  useEffect(() => {
    if (cargaCompleta) {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  }, [carrito, cargaCompleta]);

  const agregarCarrito = (producto) => {
    let mensaje = null;

    setCarrito((prevCarrito) => {
      const productosExistentes = prevCarrito.find(
        (item) => item.id === producto.id,
      );
      if (productosExistentes) {
        mensaje = {
          title: "Añadido al Carrito",
          message: `Una unidad más de ${producto.nombre} agregada.`,
          variant: "success",
        };
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item,
        );
      } else {
        mensaje = {
          title: "Añadido al Carrito",
          message: `${producto.nombre} agregado al carrito.`,
          variant: "success",
        };
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });

    if (mensaje) showToast(mensaje);
  };

  const restarCarrito = (producto) => {
    let mensaje = null;

    setCarrito((prevCarrito) => {
      const productoEncontrado = prevCarrito.find(
        (item) => item.id === producto.id,
      );
      if (productoEncontrado) {
        if (productoEncontrado.cantidad > 1) {
          mensaje = {
            title: "Removido",
            message: `Una unidad de ${producto.nombre} ha sido removida.`,
            variant: "info",
          };
          return prevCarrito.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad - 1 }
              : item,
          );
        } else {
          mensaje = {
            title: "Eliminado del Carrito",
            message: `${producto.nombre} eliminado del carrito.`,
            variant: "danger",
          };
          return prevCarrito.filter((item) => item.id !== producto.id);
        }
      }
      return prevCarrito;
    });

    if (mensaje) showToast(mensaje);
  };

  const eliminarDelCarrito = (idAEliminar) => {
    let mensaje = null;
    const itemAEliminar = carrito.find((item) => item.id === idAEliminar);

    setCarrito((prevCarrito) =>
      prevCarrito.filter((item) => item.id !== idAEliminar),
    );

    if (itemAEliminar) {
      mensaje = {
        title: "Eliminado del Carrito",
        message: `${itemAEliminar.nombre} removido completamente del carrito.`,
        variant: "danger",
      };
    }

    if (mensaje) showToast(mensaje);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    showToast({
      title: "Carrito vacío",
      message: "Todos los productos fueron eliminados.",
      variant: "info",
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

  const value = {
    carrito,
    agregarCarrito,
    restarCarrito,
    eliminarDelCarrito,
    vaciarCarrito,
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


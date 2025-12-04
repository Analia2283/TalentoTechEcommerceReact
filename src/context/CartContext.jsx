import { createContext, useContext, useState } from "react";
import { useNotification } from "./NotificacionContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const { showToast } = useNotification();

  const agregarCarrito = (producto) => {
    let mensaje = null;

    setCarrito((prevCarrito) => {
      const productosExistentes = prevCarrito.find((item) => item.id === producto.id);
      if (productosExistentes) {
        mensaje = {
          title: "Añadido al Carrito",
          message: `Una unidad más de ${producto.nombre} agregada.`,
          variant: "success",
        };
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
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
      const productoEncontrado = prevCarrito.find((item) => item.id === producto.id);
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
              : item
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

    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== idAEliminar));

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






























// import { createContext, useContext, useState, useEffect, useRef } from "react";
// import { useNotification } from "./NotificacionContext";

// export const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [carrito, setCarrito] = useState([]);
//   const { showToast } = useNotification();


//   const pendingToast = useRef(null);

//   const agregarCarrito = (producto) => {
//     setCarrito((prevCarrito) => {
//       const productosExistentes = prevCarrito.find(
//         (item) => item.id === producto.id
//       );
//       if (productosExistentes) {
//         pendingToast.current = {
//           title: "Añadido al Carrito",
//           message: `Una unidad más de ${producto.nombre} agregada.`,
//           variant: "success",
//         }
//         return prevCarrito.map((item) =>
//           item.id === producto.id
//             ? { ...item, cantidad: (item.cantidad || 1) + 1 }
//             : item
//         );
//       } else {
//         pendingToast.current = {
//             title: "Añadido al Carrito",
//             message: `${producto.nombre} agregado al carrito.`,
//             variant: "success",
//         };
//         return [...prevCarrito, { ...producto, cantidad: 1 }];
//       }
//     });
//   };

//   const restarCarrito = (producto) => {
//     setCarrito((prevCarrito) => {
//       const productoEncontrado = prevCarrito.find(
//         (item) => item.id === producto.id
//       );

//       if (productoEncontrado) {
//         pendingToast.current ={
//                 title: "Removido",
//                 message: `Una unidad de ${producto.nombre} ha sido removida.`,
//                 variant: "info",
//             };
//         if (productoEncontrado.cantidad > 1) {
//           return prevCarrito.map((item) =>
//             item.id === producto.id
//               ? { ...item, cantidad: item.cantidad - 1 }
//               : item
//           );
//         } else {
//           pendingToast.current ={
//                 title: "Eliminado del Carrito",
//                 message: `${producto.nombre} eliminado del carrito.`,
//                 variant: "danger",
//             };
//           return prevCarrito.filter((item) => item.id !== producto.id);
//         }
//       }
//       return prevCarrito;
//     });
//   };

//   const getCantidadProducto = (productId) => {
//     const productoEnCarrito = carrito.find((item) => item.id === productId);
//     return productoEnCarrito ? productoEnCarrito.cantidad : 0;
//   };

//   const total = carrito.reduce((suma, producto) => {
//     const cantidad = Number(producto.cantidad || 1);
//     const precioUnitario = Number(producto.precio || 0);
//     return suma + cantidad * precioUnitario;
//   }, 0);

//   const eliminarDelCarrito = (idAEliminar) => {
//     const itemAEliminar = carrito.find((item) => item.id === idAEliminar);
//     setCarrito((prevCarrito) =>
//       prevCarrito.filter((item) => item.id !== idAEliminar)
//     );
  
//     if (itemAEliminar) {
//         pendingToast.current ={
//             title: "Eliminado del Carrito",
//             message: `${itemAEliminar.nombre} removido completamente del carrito.`,
//             variant: "danger",
//         };
//     }
//   };

//   const vaciarCarrito = () => {
//     setCarrito([]);
//   };

//   useEffect(() => {
//     if (pendingToast.current) {
//       showToast(pendingToast.current);
//       pendingToast.current = null;
//     }
//   }, [carrito, showToast]);



//   const cerrarSesion = () => {
//     setIsAuthenticated(false);
//     setUsuario({ nombre: "", email: "" });
//     vaciarCarrito();
//   };

//   const value = {
//     cerrarSesion,
//     carrito,
//     agregarCarrito,
//     restarCarrito,
//     vaciarCarrito,
//     eliminarDelCarrito,
//     getCantidadProducto,
//     total,
//   };
//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// }

// export function useCartContext() {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCartContext debe usarse dentro de CartProvider");
//   }
//   return context;
// }

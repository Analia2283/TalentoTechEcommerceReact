import React, { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState();
  const API = "https://6926249226e7e41498f98842.mockapi.io/productos";

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(API);

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const data = await response.json();
      const productosParaEstado = data.map((p) => ({
        id: p.id,
        nombre: p.title,
        precio: p.price,
        descripcion: p.description,
        categoria: p.category,
        imagen: p.image,
      }));
      setProductos(productosParaEstado);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setError(error.message || "Error al cargar el producto");
    } finally {
      setIsLoading(false);
    }
  };

  //FN para agregar productos.
  const agregarProducto = async (producto) => {
    setIsLoading(true);
    setError(null);
    try {
      const productoEnviar = {
        title: producto.nombre,
        price: parseFloat(String(producto.precio).replace(",", ".")),
        description: producto.descripcion,
        category: producto.categoria,
        image: producto.imagen,
      };

      //Post - Create
      const respuesta = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoEnviar),
      });

      if (!respuesta.ok) {
        throw new Error("Hubo un problema al agregar el producto.");
      }

      const nuevoProductoApi = await respuesta.json();

      const productoParaEstado = {
        id: nuevoProductoApi.id,
        nombre: nuevoProductoApi.title,
        precio: nuevoProductoApi.price,
        descripcion: nuevoProductoApi.description,
        categoria: nuevoProductoApi.category,
        imagen: nuevoProductoApi.image,
      };

      setProductos((prevProductos) => [...prevProductos, productoParaEstado]);

      alert("Producto agregado correctamente");

      return productoParaEstado;
    } catch (error) {
      console.error("Error al agregar:", error);
      const mensajeError = "Hubo un problema al agregar el producto.";
      setError(mensajeError);
    } finally {
      setIsLoading(false);
    }
  };

  //Fn para editar productos
  const editarProducto = async (producto) => {
    try {
      setIsLoading(true);
      setError(null);

      const productoAEnviar = {
        id: producto.id,
        title: producto.nombre,
        price: parseFloat(String(producto.precio).replace(",", ".")),
        description: producto.descripcion,
        category: producto.categoria,
        image: producto.imagen,
      };

      const respuesta = await fetch(`${API}/${producto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoAEnviar),
      });

      if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

      const productoActualizadoApi = await respuesta.json();

      const productoActualizado = {
        id: productoActualizadoApi.id,
        nombre: productoActualizadoApi.title,
        precio: productoActualizadoApi.price,
        descripcion: productoActualizadoApi.description,
        categoria: productoActualizadoApi.category,
        imagen: productoActualizadoApi.image,
      };

      setProductos
        ((prevProductos) =>
      prevProductos.map((p) =>
        p.id === productoActualizado.id ? productoActualizado : p
      )
    );

      alert("Producto editado correctamente");
    } catch (error) {
      console.error("Error al editar:", error);
      const mensajeError = "Hubo un problema al editar el producto.";
      setError(mensajeError);
    } finally {
      setIsLoading(false);
    }
  };

  //Fn para eliminar el producto

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar?");
    if (confirmar) {
      try {
        const respuesta = await fetch(`${API}/${id}`, {
          method: "DELETE",
        });
        if (!respuesta.ok) throw new Error("Error al eliminar");
        //filtra y genera un nuevo array pero sin el producto eliminado
        setProductos(productos.filter((prod) => prod.id !== id));
      } catch (error) {
        console.error(error.message);
        const mensajeError = "Hubo un problema al eliminar el producto.";
        setError(mensajeError);
      }
    }
  };

  // El valor que se expone a los componentes
  const contextValue = {
    productos,
    isLoading,
    cargarProductos,
    error,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    setProductos,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
      {/*children es mi aplicacion*/}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};

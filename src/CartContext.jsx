import { createContext, useContext, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  // obtiene el estado almacenado en localStorage al cargar el componente
  const storedProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
  const storedTotal = localStorage.getItem('cartTotal') || 0;

  const [allProducts, setAllProducts] = useState(storedProducts);
  const [total, setTotal] = useState(storedTotal);
  const [countProducts, setCountProducts] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // actualizar el localStorage
    localStorage.setItem('cartProducts', JSON.stringify(allProducts));
    localStorage.setItem('cartTotal', total);
  }, [allProducts, total]);


  const toggleActive = () => {
    setActive((prevState) => !prevState);
  };

  const addToCart = (product) => {
    const isProductInCart = allProducts.some((item) => item.id === product.id);

    if (isProductInCart) {
      const updatedProducts = allProducts.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.precio, subtotal: (item.quantity + 1) * item.precio }
          : item
      );

      setAllProducts(updatedProducts);
      setTotal(calculateTotalPrice(updatedProducts));
      toast.success('Producto agregado al carrito');
    } else {
      const newProduct = { ...product, quantity: 1, total: product.precio, subtotal: product.precio };
      setAllProducts([...allProducts, newProduct]);
      setTotal(calculateTotalPrice([...allProducts, newProduct]));
      toast.success('Producto agregado al carrito');
    }
  };

  const calculateTotalPrice = (products) => {
    const total = products.reduce((acc, product) => {
      const productTotal = parseFloat(product.total);

      // verifica si productTotal es un número válido
      if (!isNaN(productTotal)) {
        return acc + productTotal;
      }

      return acc;
    }, 0);

    return total.toFixed(2);
  };

  const removeFormCart = (productId) => {
    const updatedCart = allProducts.map((productCard) =>
      productCard.id === productId
        ? {
            ...productCard,
            quantity: productCard.quantity > 1 ? productCard.quantity - 1 : 0,
            total: productCard.quantity > 1 ? productCard.total - productCard.precio : 0,
            subtotal: productCard.quantity > 1 ? (productCard.quantity - 1) * productCard.precio : 0,
          }
        : productCard
    );

    const newCart = updatedCart.filter((productCard) => productCard.quantity > 0);

    // actualiza el total sumando los totales de todos los productos
    const newTotal = calculateTotalPrice(newCart);

    setAllProducts(newCart);
    setTotal(newTotal);
  };

  return (
    <CartContext.Provider value={{ allProducts, setAllProducts, total, setTotal, countProducts, setCountProducts, active, toggleActive, addToCart, removeFormCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext debe usarse dentro de un proveedor HeaderContext');
  }
  return context;
};
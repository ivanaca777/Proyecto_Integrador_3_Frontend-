import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHeaderFooterContext } from './headerFooterContext';
import hobbies from './Images/hobbies-final.png';
import barsIcon from './Images/bars-solid.svg';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaCartShopping } from 'react-icons/fa6';
import { useCartContext } from './CartContext';
import { FaRegTrashAlt } from "react-icons/fa";

const Header = () => {
  const { isMenuOpen, toggleMenu } = useHeaderFooterContext();
  const [isCartModalOpen, setCartModalOpen] = useState(false);

  const { allProducts, total, removeFormCart } = useCartContext();

  const handleCartClick = () => {
    setCartModalOpen(!isCartModalOpen);
  };

  const handleEscKey = (e) => {
    if (e.key === 'Escape') {
      setCartModalOpen(false);
    }
  };

  const handleOutsideClick = (e) => {
    const cartModal = document.querySelector('.cart-modal');

    if (cartModal && !cartModal.contains(e.target)) {
      setCartModalOpen(false);
    }
  };

  useEffect(() => {
    if (isCartModalOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isCartModalOpen]);

  return (
    <header>
      <div className="encabezado">
        <button onClick={toggleMenu} className="barra">
          <img src={barsIcon} alt="Icono de menú" />
        </button>
        <div className="logo">
          <img src={hobbies} alt="logo de la tienda con nombre hobbies" />
        </div>
        <button onClick={handleCartClick} className="carrito">
          {isCartModalOpen ? (
            <>
              <FaCartShopping className="cerrar" onClick={() => setCartModalOpen(false)} />
            </>
          ) : (
            <span className="carrito-icon">
              <FaCartShopping />
            </span>
          )}
        </button>
      </div>
      <ul className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/alta">Alta</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/nosotros">Nosotros</Link></li>
      </ul>
      {isCartModalOpen && (
        <>
          <div className="cart-modal">
            <div className='carritoheader'>
              <h2>Carrito de compras</h2>
              <IoMdCloseCircleOutline className='cerrar' onClick={() => setCartModalOpen(false)} />
            </div>
            {allProducts.map(product => (
              <div key={product.id} className="cart-item">
                <img src={product.imagen} alt={product.personaje} />
                <div>
                  <p>{product.personaje}</p>
                  <p>Precio: ${product.subtotal}</p>
                  <p>Cantidad: {product.quantity}</p>
                </div>
                <FaRegTrashAlt className='eliminar' onClick={() => removeFormCart(product.id)} />
              </div>
            ))}
            <p className='total'>Total: ${total}</p>
          </div>
          <div className="modal-overlay" onClick={() => setCartModalOpen(false)}></div>
        </>
      )}
      <form id="buscarform" action="" method="">
        <input type="text" id="search-input" name="buscar" placeholder="Buscar..." />
        <button type="submit" id="buscar">Buscar</button>
      </form>
      {isCartModalOpen && <div className="modal-overlay"></div>}
    </header>
  );
};

export default Header;

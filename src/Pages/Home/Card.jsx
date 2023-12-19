import React, { useState, useEffect } from 'react';
import { useCartContext } from '../../CartContext';


// crea la card para los productos bajando los datos desde mockapi
const Card = () => {
  const [products, setProducts] = useState([]);

  const { addToCart } = useCartContext();

  useEffect(() => {
    fetch("http://localhost:5000/api/productos") // Pide los datos de prodcutos al servidor Express en el puerto 5000 / Que luego el servidor envia por enrutador al controlador y metodo correspondiente
    .then(response => {
      if (!response.ok) { // Valida si la respuesta del servidor es correcta
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setProducts(data || []);
    })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <main>
      <section>
        {products.map(product => (
          <article key={product._id}>
            <img src={product.imagen} alt={product.personaje} />
            <div>
              <h3>{`${product.personaje} - ${product.franquicia}`}</h3>
              <p className="datos">{`escala ${product.escala})`}</p>
              <p className="precio">{`$${product.precio || 0}`}</p>
              <button className="boton" onClick={() => addToCart(product)}>AGREGAR!</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Card;


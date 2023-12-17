import React, { useState, useEffect } from 'react';
import { useCartContext } from '../../CartContext';


// crea la card para los productos bajando los datos desde mockapi
const Card = () => {
  const [products, setProducts] = useState([]);

  const { addToCart } = useCartContext()

  useEffect(() => {
    fetch('https://657b9eee394ca9e4af148a16.mockapi.io/api/Product')
      .then(response => response.json())
      .then(data => {
        setProducts(data || []);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <main>
      <section>
        {products.map(product => (
          <article key={product.id}>
            <img src={product.imagen} alt={product.personaje} />
            <div>
              <h3>{`${product.personaje} - ${product.franquicia}`}</h3>
              <p className="datos">{`escala ${product.escala})`}</p>
              <p className="precio">{`$${product.precio || 0}`}</p>
              <button className="boton" onClick={ () => addToCart(product)}>AGREGAR!</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Card;


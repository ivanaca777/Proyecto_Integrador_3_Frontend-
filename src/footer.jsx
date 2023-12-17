import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <p>Debido a la naturaleza puramente coleccionista de nuestros productos y de la existencia de algunas piezas o accesorios que los acompañan, se recomienda mantener a los mismos fuera del alcance de niños menores a 6 años.</p>
      <Link to="/contacto">
        Contactanos!
      </Link>
    </footer>
  );
};

export default Footer;

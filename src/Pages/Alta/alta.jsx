import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// limpia un valor y le da mayúscula
const limpiar = (inputValue) => {
  let valorLimpio = inputValue.trim();

  if (valorLimpio === '') {
    return valorLimpio;
  }

  if (valorLimpio[0] === valorLimpio[0].toUpperCase()) {
    return valorLimpio;
  } else {
    let valorReconstruido = '';
    for (let i = 0; i < valorLimpio.length; i++) {
      if (i === 0) {
        valorReconstruido += valorLimpio[i].toUpperCase();
      } else {
        valorReconstruido += valorLimpio[i].toLowerCase();
      }
    }
    return valorReconstruido;
  }
};

// valida el precio
const validarPrecio = (inputValue) => {
  const valorLimpio = inputValue.trim();
  return valorLimpio.match(/^[1-9][0-9]*$/) ? true : false;
};

// valida el stock
const validarStock = (inputValue) => {
  const valorLimpio = inputValue.trim();
  return valorLimpio.match(/^[1-9][0-9]?$/) ? true : false;
};

const Alta = () => {
  // crea los valores seteables de cada elemento del futuro objeto
  const [personaje, setPersonaje] = useState('');
  const [franquicia, setFranquicia] = useState('');
  const [marca, setMarca] = useState('');
  const [escala, setEscala] = useState('Elija una opción');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');

  // crea los valores seteables de los errores
  const [errorPersonaje, setErrorPersonaje] = useState('');
  const [errorFranquicia, setErrorFranquicia] = useState('');
  const [errorMarca, setErrorMarca] = useState('');
  const [errorEscala, setErrorEscala] = useState('');
  const [errorPrecio, setErrorPrecio] = useState('');
  const [errorStock, setErrorStock] = useState('');
  const [errorDescripcion, setErrorDescripcion] = useState('');
  const [errorImagen, setErrorImagen] = useState('');

  const [intentoFallido, setIntentoFallido] = useState(false);

  // setea los mensajes de errores de ser necesario
  useEffect(() => {
    setErrorPersonaje(
      intentoFallido && personaje === '' ? 'Por favor complete el campo' : ''
    );
  }, [personaje, intentoFallido]);

  useEffect(() => {
    setErrorFranquicia(
      intentoFallido && franquicia === '' ? 'Por favor complete el campo' : ''
    );
  }, [franquicia, intentoFallido]);

  useEffect(() => {
    setErrorMarca(intentoFallido && marca === '' ? 'Por favor complete el campo' : '');
  }, [marca, intentoFallido]);

  useEffect(() => {
    setErrorEscala(
      intentoFallido && escala === 'Elija una opción' ? 'Debe elegir una opción' : ''
    );
  }, [escala, intentoFallido]);

  useEffect(() => {
    setErrorPrecio(
      intentoFallido && (precio === '' || !validarPrecio(precio))
        ? 'Ingrese un precio válido'
        : ''
    );
  }, [precio, intentoFallido]);

  useEffect(() => {
    setErrorStock(
      intentoFallido && (stock === '' || !validarStock(stock))
        ? 'Ingrese un stock válido'
        : ''
    );
  }, [stock, intentoFallido]);

  useEffect(() => {
    setErrorDescripcion(
      intentoFallido && descripcion === '' ? 'Ingrese la descripción del producto' : ''
    );
  }, [descripcion, intentoFallido]);

  useEffect(() => {
    setErrorImagen(
      intentoFallido && imagen === '' ? 'Agregue la imagen del producto' : ''
    );
  }, [imagen, intentoFallido]);


  // maneja el
  const handleSubmit = async (event) => {
    event.preventDefault();

    const personajeLimpio = limpiar(personaje);
    const franquiciaLimpia = limpiar(franquicia);
    const marcaLimpia = limpiar(marca);
    const descripcionLimpia = limpiar(descripcion);

    const errors = {
      personaje: personajeLimpio === '' ? 'Por favor complete el campo' : '',
      franquicia: franquiciaLimpia === '' ? 'Por favor complete el campo' : '',
      marca: marcaLimpia === '' ? 'Por favor complete el campo' : '',
      escala: escala === 'Elija una opción' ? 'Debe elegir una opción' : '',
      precio: !validarPrecio(precio) ? 'Ingrese un precio válido' : '',
      stock: !validarStock(stock) ? 'Ingrese un stock válido' : '',
      descripcion: descripcionLimpia === '' ? 'Ingrese la descripción del producto' : '',
      imagen: imagen === '' ? 'Agregue la imagen del producto' : '',
    };

    // verifica si hay errores
    const hasErrors = Object.values(errors).some((error) => error !== '');

    // actualiza los errores si es que hay
    if (hasErrors) {
      setErrorPersonaje(errors.personaje);
      setErrorFranquicia(errors.franquicia);
      setErrorMarca(errors.marca);
      setErrorEscala(errors.escala);
      setErrorPrecio(errors.precio);
      setErrorStock(errors.stock);
      setErrorDescripcion(errors.descripcion);
      setErrorImagen(errors.imagen);
    } else {
      try {
        // agrega el producto a mockapi
        const response = await fetch(
          'https://657b9eee394ca9e4af148a16.mockapi.io/api/Product/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({
              personaje: personajeLimpio,
              franquicia: franquiciaLimpia,
              marca: marcaLimpia,
              escala,
              precio,
              stock,
              descripcion: descripcionLimpia,
              imagen,
            }),
          }
        );

        // verifica la respuesta de mockapi
        if (response.ok) {
          toast.success('El producto fue cargado exitósamente');
          // limpia los campos y errores después de agregar
          setPersonaje('');
          setFranquicia('');
          setMarca('');
          setEscala('');
          setPrecio('');
          setStock('');
          setDescripcion('');
          setImagen('');
          setIntentoFallido(false);
          
        } else {
          toast.error('Error al agregar el producto a la API');
        }
      } catch (error) {
        toast.error('Error en la llamada a la API', error);
      }
    }
  };

  return (//formulario completo

    <main className="principala">

      <h2>Agregar producto nuevo</h2>

      <form name="formularioAlta" onSubmit={handleSubmit}>

        <label className="label" htmlFor="personaje">
          Nombre personaje:
          <input
            name="personaje"
            type="text"
            value={personaje}
            onChange={(e) => setPersonaje(e.target.value)}
          />
        </label>

        <div className="errorPersonaje">{errorPersonaje}</div>

        <label className="label" htmlFor="franquicia">
          Franquicia/Serie:
          <input
            name="franquicia"
            type="text"
            value={franquicia}
            onChange={(e) => setFranquicia(e.target.value)}
          />
        </label>

        <div className="errorFranquicia">{errorFranquicia}</div>

        <label className="label" htmlFor="marca">
          Marca:
          <input
            name="marca"
            type="text"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
        </label>

        <div className="errorMarca">{errorMarca}</div>

        <label className="label" htmlFor="escala">
          Escala: <br />
          <select
            name="escala"
            className="select"
            value={escala}
            onChange={(e) => setEscala(e.target.value)}
          >
            <option value="Elija una opción">Elija una opción</option>
            <option value="1/5">1/5</option>
            <option value="1/10">1/10</option>
            <option value="1/20">1/20</option>
          </select>
        </label>

        <div className="errorEscala">{errorEscala}</div>

        <label className="label" htmlFor="precio">
          Precio (solo números):
          <input
            name="precio"
            type="text"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </label>

        <div className="errorPrecio">{errorPrecio}</div>

        <label className="label" htmlFor="stock">
          Unidades agregadas a Stock (solo números):
          <input
            name="stock"
            type="text"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </label>

        <div className="errorStock">{errorStock}</div>

        <label className="label" htmlFor="descripcion">
          Descripción:
          <textarea
            className="descripcion"
            name="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </label>

        <div className="errorDescripcion">{errorDescripcion}</div>

        <label className="label" htmlFor="imagen">
          Imagen (URL):
          <input
            name="imagen"
            type="text"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />
        </label>

        <div className="errorImagen">{errorImagen}</div>

        <input className="agregar" type="submit" value="Agregar" />

      </form>
    </main>
  );
};

export default Alta;




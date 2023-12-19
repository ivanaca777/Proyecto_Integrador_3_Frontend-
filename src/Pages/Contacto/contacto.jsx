import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contacto = () => {
  // setea las elementos del objeto para gestionarlos luego
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [mail, setMail] = useState('');
  const [tipoConsulta, setTipoConsulta] = useState('Elija una opción');
  const [descripcion, setDescripcion] = useState('');

  // setea los errores del formulario para utilizarlos en caso de no validar el campo
  const [errorNombre, setErrorNombre] = useState('');
  const [errorApellido, setErrorApellido] = useState('');
  const [errorMail, setErrorMail] = useState('');
  const [errorTipoConsulta, setErrorTipoConsulta] = useState('');
  const [errorConsulta, setErrorConsulta] = useState('');

  const [intentoFallido, setIntentoFallido] = useState(false);

  useEffect(() => {
    setErrorNombre(
      intentoFallido && nombre === '' ? 'Por favor complete el campo' : ''
    );
  }, [nombre, intentoFallido]);

  useEffect(() => {
    setErrorApellido(
      intentoFallido && apellido === '' ? 'Por favor complete el campo' : ''
    );
  }, [apellido, intentoFallido]);

  useEffect(() => {
    setErrorMail(
      intentoFallido && (mail === '' || !validarMail(mail))
        ? 'Ingrese un correo válido'
        : ''
    );
  }, [mail, intentoFallido]);

  useEffect(() => {
    setErrorTipoConsulta(
      intentoFallido && tipoConsulta === 'Elija una opción'
        ? 'Debe elegir una opción'
        : ''
    );
  }, [tipoConsulta, intentoFallido]);

  useEffect(() => {
    setErrorConsulta(
      intentoFallido && descripcion === '' ? 'Ingrese su mensaje' : ''
    );
  }, [descripcion, intentoFallido]);

      // valida el mail
  const validarMail = (inputValue) => {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(inputValue);
  };


  // limpia el string y le da mayuscula
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

  // sube los datos a la api si no hay errores en el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    const nombreLimpio = limpiar(nombre);
    const apellidoLimpio = limpiar(apellido);
    const mailLimpio = limpiar(mail);

    const errors = {
      nombre: nombreLimpio === '' ? 'Por favor complete el campo' : '',
      apellido: apellidoLimpio === '' ? 'Por favor complete el campo' : '',
      mail: !validarMail(mailLimpio) ? 'Ingrese un correo válido' : '',
      tipoConsulta:
        tipoConsulta === 'Elija una opción' ? 'Debe elegir una opción' : '',
      consulta: descripcion === '' ? 'Ingrese su mensaje' : '',
    };

    const hasErrors = Object.values(errors).some((error) => error !== '');

    if (hasErrors) {
      setErrorNombre(errors.nombre);
      setErrorApellido(errors.apellido);
      setErrorMail(errors.mail);
      setErrorTipoConsulta(errors.tipoConsulta);
      setErrorConsulta(errors.consulta);

    } else {
      try {
        const response = await fetch(
          'http://localhost:5000/api/contacto',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nombre: nombreLimpio,
              apellido: apellidoLimpio,
              mail: mailLimpio,
              tipoConsulta,
              descripcion,
            }),
          }
        );

        if (response.ok) {
          //avisa el exito del envío de la consulta
          toast.success('Consulta enviada exitosamente');
          // limpia los campos y errores al enviar con éxito
          setNombre('');
          setApellido('');
          setMail('');
          setTipoConsulta('');
          setDescripcion('');
          setIntentoFallido(false);
        } else {
          toast.error('Error al enviar la consulta');
        }
      } catch (error) {
        toast.error('Error en la llamada a la API', error);
      }
    }
  };

  return (
    <>
      <main className="principalc">
        <h2>Realiza tu consulta:</h2>
        <form name="formularioConsulta" onSubmit={handleSubmit}>
          <label className="label" id="nombre" htmlFor="Nombre">
            Nombre:
            <input
              name="Nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </label>
          <div className="errorNombre">{errorNombre}</div>

          <label className="label" htmlFor="Apellido">
            Apellido:
            <input
              name="Apellido"
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </label>
          <div className="errorApellido">{errorApellido}</div>

          <label className="label" htmlFor="Mail">
            Mail:
            <input
              name="Mail"
              type="text"
              placeholder="ejemplo@gmail.com"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </label>
          <div className="errorMail">{errorMail}</div>

          <label className="label" htmlFor="tipoconsulta">
            Motivo de su consulta:
            <br />
            <select
              name="tipoconsulta"
              className="select"
              value={tipoConsulta}
              onChange={(e) => setTipoConsulta(e.target.value)}
            >
              <option value="Elija una opción">Elija una opción</option>
              <option value="Formas de pago">Formas de pago</option>
              <option value="Garantía">Garantía</option>
              <option value="Productos">Productos</option>
              <option value="Envío">Envío</option>
              <option value="Otros">Otros</option>
            </select>
          </label>
          <div className="errorTipoConsulta">{errorTipoConsulta}</div>

          <label className="label" htmlFor="descripcion">
            Comentarios:
            <br />
            <textarea
              className="descripcion"
              name="descripcion"
              placeholder="Ingrese su mensaje"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
          </label>
          <div className="errorConsulta">{errorConsulta}</div>

          <input className="enviar" type="submit" value="Enviar" />
        </form>
      </main>
    </>
  );
};

export default Contacto;




 

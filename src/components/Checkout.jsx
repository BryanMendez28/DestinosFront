import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_DESTINOS } from '../store';
import './DestinosList.css'; // Importa tu archivo de estilos CSS

/**
 * Componente funcional que muestra un resumen de destinos seleccionados y recopila información del usuario para completar la compra.
 * @returns {JSX.Element} Componente de la página de pago.
 */
const Checkout = () => {
  // Acciones y estados del Redux
  const selectedDestinos = useSelector(state => state.selectedDestinos) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Reemplaza useHistory con useNavigate de react-router-dom
  const [isCompraExitosa, setCompraExitosa] = useState(false);

  /**
   * Maneja la lógica de completar la compra.
   * @param {Object} e - Evento del formulario.
   */
  const handleCheckout = (e) => {
    e.preventDefault();

    // Puedes realizar aquí cualquier lógica necesaria antes de redirigir
    // por ejemplo, enviar la información al servidor
    // ...

    // Después del procesamiento, actualiza el estado para mostrar el mensaje
    setCompraExitosa(true);

    // Después de un tiempo (por ejemplo, 2 segundos), restablece el estado y redirige
    setTimeout(() => {
      setCompraExitosa(false);
      // Redirige a la página principal usando el hook useNavigate
      navigate('/');
      // También, puedes limpiar los destinos seleccionados en el estado de Redux
      dispatch({ type: CLEAR_DESTINOS });
    }, 2000); // 2000 milisegundos = 2 segundos
  };

  // Renderizado del componente
  return (
    <div className="checkout-container">
      <h2>Resumen de Destinos Seleccionados</h2>
      <ul>
        {selectedDestinos.map((destino) => (
          <li key={destino.ID}>
            {destino.Nombre}; {destino.Pais}
          </li>
        ))}
      </ul>

      <h2>Información del Usuario</h2>
      <form onSubmit={handleCheckout}>
        <label className="black-text">
          Nombre:
          <input type="text" name="nombre" required />
        </label>
        <br />
        <label className="black-text">
          Ciudad de Origen:
          <input type="text" name="ciudad" required />
        </label>
        <br />
        <label className="black-text">
          Estado de Origen:
          <input type="text" name="estado" required />
        </label>
        <br />
        <button type="submit">Completar Compra</button>
      </form>

      {isCompraExitosa && (
        <p className="success-message">Su compra ha sido realizada con éxito. Redirigiendo a la página principal...</p>
      )}

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Checkout;

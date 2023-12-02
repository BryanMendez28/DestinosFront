import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_DESTINO, REMOVE_DESTINO, CLEAR_DESTINOS } from '../store';
import './DestinosList.css'; // Importa tu archivo de estilos CSS

/**
 * Componente funcional que muestra una lista de destinos y permite al usuario seleccionar destinos.
 * @returns {JSX.Element} Componente de la lista de destinos.
 */
const DestinoList = () => {
  // Estado local del componente
  const [destinos, setDestinos] = useState([]);

  // Acciones y estados del Redux
  const dispatch = useDispatch();
  const selectedDestinos = useSelector((state) => state.selectedDestinos) || [];
  const destinosEnCheckout = useSelector((state) => state.destinosEnCheckout) || [];

  // Obtener destinos desde la API al cargar el componente
  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const response = await axios.get('http://localhost:5001/destinos');
        setDestinos(response.data);
      } catch (error) {
        console.error('Error al obtener destinos:', error);
      }
    };

    fetchDestinos();
  }, []);

  /**
   * Maneja el cambio en la selección de un destino.
   * @param {Object} destino - Objeto que representa un destino.
   */
  const toggleDestino = (destino) => {
    const isSelected = selectedDestinos.some((selectedDestino) => selectedDestino.ID === destino.ID);

    if (isSelected) {
      dispatch({ type: REMOVE_DESTINO, destino });
    } else {
      if (!destinosEnCheckout.some((checkoutDestino) => checkoutDestino.ID === destino.ID)) {
        dispatch({ type: ADD_DESTINO, destino });
      }
    }
  };

  /**
   * Maneja el clic en el botón para borrar destinos seleccionados.
   */
  const clearLocalStorage = () => {
    try {
      dispatch({ type: CLEAR_DESTINOS });
      console.log('Datos del estado global borrados correctamente.');
    } catch (error) {
      console.error('Error al borrar datos del estado global:', error);
    }
  };

  // Renderizado del componente
  return (
    <div className="destino-list-container">
      <h2>Destinos Disponibles</h2>
      {destinos.length > 0 ? (
        <ul className="destino-list">
          {destinos.map((destino) => (
            <li key={destino.ID}>
              <label className="destino-label">
                <input
                  type="checkbox"
                  checked={selectedDestinos.some((selectedDestino) => selectedDestino.ID === destino.ID)}
                  onChange={() => toggleDestino(destino)}
                />
                {destino.Nombre}
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay destinos disponibles.</p>
      )}
      <div className="button-container">
        <Link to="/checkout">
          <button className="checkout-button">Ir al Checkout</button>
        </Link>
        <button className="clear-button" onClick={clearLocalStorage}>
          Borrar Destinos
        </button>
      </div>
    </div>
  );
};

export default DestinoList;

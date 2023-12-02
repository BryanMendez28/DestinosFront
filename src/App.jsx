// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DestinoList from './components/DestinoList';
import Checkout from './components/Checkout';

const App = () => {
  // Estado local para almacenar los destinos seleccionados
  const [selectedDestinos, setSelectedDestinos] = useState([]);

  // Manejador de evento para el proceso de checkout
  const handleCheckout = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del formulario y los destinos seleccionados al backend
    // Por ahora, solo cambiamos la página a 'checkout'
    // setCurrentPage('checkout'); // No necesitas setCurrentPage si usas React Router
  };

  return (
    <Router>
      <div>
        {/* Configuración de las rutas utilizando React Router */}
        <Routes>
          {/* Ruta para la página principal */}
          <Route
            path="/"
            element={<DestinoList onSelectDestino={(destinos) => setSelectedDestinos(destinos)} />}
          />
          {/* Ruta para la página de checkout */}
          <Route
            path="/checkout"
            element={<Checkout selectedDestinos={selectedDestinos} onCheckout={handleCheckout} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

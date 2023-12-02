import React from 'react';
import { createRoot } from 'react-dom/client';  // Actualiza la importación aquí
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

// Crea un "root" React para renderizar la aplicación en el punto de entrada del DOM
const root = createRoot(document.getElementById('root'));

// Renderiza la aplicación dentro del "root" con el uso de Provider para Redux
root.render(
  <Provider store={store}>
    {/* App es el componente principal de la aplicación */}
    <App />
  </Provider>
);

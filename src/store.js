import { createStore } from 'redux';

// Acciones
export const ADD_DESTINO = 'ADD_DESTINO';
export const REMOVE_DESTINO = 'REMOVE_DESTINO';
export const CLEAR_DESTINOS = 'CLEAR_DESTINOS';

// Reductor
const rootReducer = (state = { selectedDestinos: [], destinosEnCheckout: [] }, action) => {
  switch (action.type) {
    case ADD_DESTINO:
      // Agrega un destino al array de destinos seleccionados
      return {
        ...state,
        selectedDestinos: [...state.selectedDestinos, action.destino],
      };
    case REMOVE_DESTINO:
      // Elimina un destino del array de destinos seleccionados
      return {
        ...state,
        selectedDestinos: state.selectedDestinos.filter(destino => destino.ID !== action.destino.ID),
      };
    case CLEAR_DESTINOS:
      // Limpia los arrays de destinos seleccionados y destinos en el checkout
      return {
        ...state,
        selectedDestinos: [],
        destinosEnCheckout: [],
      };
    default:
      return state;
  }
};

// Almacenamiento global
const store = createStore(rootReducer);

export default store;

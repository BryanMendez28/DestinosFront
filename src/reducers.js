import { ADD_DESTINO, REMOVE_DESTINO } from './store';

export const selectedDestinosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_DESTINO:
      // Agrega un destino al array de destinos seleccionados
      return [...state, action.destino];
    case REMOVE_DESTINO:
      // Elimina un destino del array de destinos seleccionados
      return state.filter(destino => destino !== action.destino);
    default:
      return state;
  }
};

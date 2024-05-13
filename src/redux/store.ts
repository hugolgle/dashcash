import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// Création du store sans persistance
export const store = configureStore({
    reducer: rootReducer,
    devTools: true, // Vous pouvez spécifier si vous souhaitez activer ou désactiver les outils de développement Redux ici
});

export default store;

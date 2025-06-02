import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';

import reducers from './reducers';

const store = configureStore({
    reducer: reducers,
    devTools: true,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

const persister = persistStore(store);

export { store, persister };

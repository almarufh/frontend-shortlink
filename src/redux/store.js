import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/es/storage';

import authReducer from './slice/auth.js';

const authPersistConfig = {
  key: 'token',
  storage,
  whitelist: ['token'],
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

export const persistor = persistStore(store);

export default store;

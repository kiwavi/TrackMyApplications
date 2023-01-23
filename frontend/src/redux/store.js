import {configureStore} from '@reduxjs/toolkit';
import loggedReducer from './logged';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';


const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig,loggedReducer);

export const store = configureStore({
    reducer: persistedReducer,
});


export const persistor = persistStore(store);

import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../../Slices/authSlice';

const combined_reducer = combineReducers({
  auth: authReducer,
});

import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persist_reducer = persistReducer(persistConfig, combined_reducer);

const store = configureStore({
  reducer: persist_reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export default store;

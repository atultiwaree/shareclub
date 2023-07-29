import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../../Slices/authSlice';
import headerReducer from '../../Slices/headerSlice';
import pinReducer from '../../Slices/pinSlice';
import searchReducer from '../../Slices/searchSlice';

//QueryRTK

import {getlistedProductsApi} from '../../Slices/rtkQuerySlices/listedProductsRtkSlice';
import {viewProductsApi} from '../../Slices/rtkQuerySlices/viewProducts';
import {searchProdcutApi} from '../../Slices/rtkQuerySlices/searchRtkSlice';
import {singleProductDetailApi} from '../../Slices/rtkQuerySlices/singleProductDetailRtkSlice';
import {setupListeners} from '@reduxjs/toolkit/dist/query';

const combined_reducer = combineReducers({
  auth: authReducer,
  header: headerReducer,
  pin: pinReducer,
  search: searchReducer,
  [getlistedProductsApi.reducerPath]: getlistedProductsApi.reducer,
  [viewProductsApi.reducerPath]: viewProductsApi.reducer,
  [searchProdcutApi.reducerPath]: searchProdcutApi.reducer,
  [singleProductDetailApi.reducerPath]: singleProductDetailApi.reducer,
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
    getDefaultMiddleware({serializableCheck: false}).concat(
      getlistedProductsApi.middleware,
      viewProductsApi.middleware,
      searchProdcutApi.middleware,
      singleProductDetailApi.middleware,
    ),
});

export default store;
setupListeners(store.dispatch);

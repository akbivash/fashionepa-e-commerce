import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from './slices/cartSlice'
import userReducer from './slices/userSlice'
import modalReducer from './slices/modalSlice'
import productReducer from './slices/productsSlice'
import componentsReducer from './slices/componentsSlice'
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,

} from 'redux-persist'
const rootReducers = combineReducers({
  user: userReducer,
  cart: cartReducer,
  modal: modalReducer,
  products: productReducer,
  components:componentsReducer

})
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user', 'cart', 'modal'],
}

const persistedReducer = persistReducer(persistConfig, rootReducers)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
      {
        serializableCheck: false

      }
    )
})
export let persistor = persistStore(store)

// export const resetState = () => {
//   store.dispatch(cartReducer.actions.reset());
//   store.dispatch(productReducer.actions.reset())
// };
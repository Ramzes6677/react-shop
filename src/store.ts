import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./pages/favorites/slices";
import productsReducer from "./pages/main/slices";
import cartReducer from "./pages/cart/slices";
import productReducer from "./pages/product/slices";
import registrationReducer from "./components/login/slices";
import { apiSlice } from "./services/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
    product: productReducer,
    registration: registrationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

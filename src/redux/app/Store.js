
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../feacture/cartSlice";

export const Store = configureStore({
  reducer: { cart: cartReducer },
});


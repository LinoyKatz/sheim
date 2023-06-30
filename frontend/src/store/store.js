import { createContext, useReducer } from "react";
import { cartReducer, reducer } from "./reducers";

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem("sheim-userInfo")
    ? JSON.parse(localStorage.getItem("sheim-userInfo"))
    : null,

  cart: {
    cartItems: localStorage.getItem("sheim-cartItems")
      ? JSON.parse(localStorage.getItem("sheim-cartItems"))
      : [],
    shippingAddress: localStorage.getItem("sheim-shippingAddress")
      ? JSON.parse(localStorage.getItem("sheim-shippingAddress"))
      : {},
    paymentMethod: localStorage.getItem("sheim-paymentMethod")
      ? localStorage.getItem("sheim-paymentMethod")
      : "",
  },
};

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

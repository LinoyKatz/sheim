export const reducer = (state, action) => {
  switch (action.type) {
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "ITEM_FETCH_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "ITEM_FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item._id === existingItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("sheim-cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("sheim-cartItems", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_CLEAR":
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };

    case "USER_LOGIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {} },
      };

    case "USER_UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "USER_UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "USER_UPDATE_FAIL":
      return { ...state, loadingUpdate: false };

    case "USER_ORDERS_FETCH_REQUEST":
      return { ...state, loading: true };
    case "USER_ORDERS_FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "USER_ORDERS_FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "ORDER_CREATE_REQUEST":
      return { ...state, loading: true };
    case "ORDER_CREATE_SUCCESS":
      return { ...state, loading: false };
    case "ORDER_CREATE_FAIL":
      return { ...state, loading: false };

    case "ADD_FAV_ITEM":
      const newFavItem = action.payload;
      const existingFavItem = state.favItems.find(
        (item) => item._id === newFavItem._id
      );
      const items = existingFavItem
        ? state.favItems.map((item) =>
            item._id === existingFavItem._id ? newFavItem : item
          )
        : [...state.favItems, newFavItem];
      localStorage.setItem("sheim-fav", JSON.stringify(items));
      return { ...state, favItems: [...items] };

    case "REMOVE_FAV_ITEM": {
      const favs = state.favItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("sheim-fav", JSON.stringify(favs));
      return { ...state, favItems: [...favs] };
    }

    default:
      return state;
  }
};

export default function orderReducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false };

    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };

    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false };

    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };

    default:
      return state;
  }
}

// export const productsReducer = (state, action) => {
//   switch (action.type) {
//     case "FETCH_REQUEST":
//       return { ...state, loading: true };
//     case "FETCH_SUCCESS":
//       return { ...state, loading: false, products: action.payload };
//     case "FETCH_FAIL":
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const productsItemReducer = (state, action) => {
//   switch (action.type) {
//     case "FETCH_REQUEST":
//       return { ...state, loading: true };
//     case "FETCH_SUCCESS":
//       return { ...state, loading: false, product: action.payload };
//     case "FETCH_FAIL":
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const cartReducer = (state, action) => {
//   switch (action.type) {
//     case "CART_ADD_ITEM":
//       const newItem = action.payload;
//       const existingItem = state.cart.cartItems.find(
//         (item) => item._id === newItem._id
//       );
//       const cartItems = existingItem
//         ? state.cart.cartItems.map((item) =>
//             item._id === existingItem._id ? newItem : item
//           )
//         : [...state.cart.cartItems, newItem];
//       localStorage.setItem("sheim-cartItems", JSON.stringify(cartItems));
//       return { ...state, cart: { ...state.cart, cartItems } };

//     case "CART_REMOVE_ITEM": {
//       const cartItems = state.cart.cartItems.filter(
//         (item) => item._id !== action.payload._id
//       );
//       localStorage.setItem("sheim-cartItems", JSON.stringify(cartItems));

//       return { ...state, cart: { ...state.cart, cartItems } };
//     }

//     default:
//       return state;
//   }
// };

// export const userReducer = (state, action) => {
//   switch (action.type) {
//     case "USER_LOGIN":
//       return { ...state, userInfo: action.payload };
//     case "USER_SIGNOUT":
//       return {
//         ...state,
//         userInfo: null,
//         cart: { cartItems: [], shippingAddress: {} },
//       };
//     default:
//       return state;
//   }
// };

// export const shippingReducer = (state, action) => {
//   switch (action.type) {
//     case "SAVE_SHIPPING_ADDRESS":
//       return {
//         ...state,
//         cart: { ...state.cart, shippingAddress: action.payload },
//       };
//     default:
//       return state;
//   }
// };

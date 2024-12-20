import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  SAVE_NOTE_BUY,
} from "../constans/CartConstans";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {}, noteBuy: "" },
  action
) => {
  switch (action.type) {  // Thay Routes thành switch
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find((i) => i.product === item.product);

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    case SAVE_NOTE_BUY:
      return {
        ...state,
        noteBuy: action.payload,
      };

    default:
      return state;
  }
};

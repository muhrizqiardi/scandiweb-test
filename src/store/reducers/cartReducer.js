import searchArray from "../../utils/searchArray";
import {
  ADD_ITEM,
  DECREMENT_ITEM,
  INCREMENT_ITEM,
  REMOVE_ITEM,
} from "../actions/actionTypes";

const initialState = { cart: [], latestCartItemId: 0 };

export default (state = initialState, action) => {
  let newCart;
  switch (action.type) {
    case ADD_ITEM:
      const newCartItem = {
        ...action.payload,
        cartId: state.latestCartItemId + 1,
      };

      const existingItem = state.cart.filter((cartItem) => {
        return (
          newCartItem.id === cartItem.id &&
          cartItem.attributes.every(
            (attributeItem) =>
              attributeItem.value ===
              searchArray(newCartItem.attributes, "name", attributeItem.name)[0]
                .value
          )
        );
      });

      if (existingItem.length > 0) {
        newCart = [...state.cart];
        const indexOfExistingItem = newCart.findIndex(
          (cartItem) => cartItem.id === existingItem[0].id
        );
        newCart[indexOfExistingItem] = {
          ...newCart[indexOfExistingItem],
          quantity: newCart[indexOfExistingItem].quantity + 1,
        };
        return {
          ...state,
          cart: newCart,
          latestCartItemId: state.latestCartItemId + 1,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, newCartItem],
          latestCartItemId: state.latestCartItemId + 1,
        };
      }

    case REMOVE_ITEM:
      newCart = [...state.cart];
      const indexOfItemToBeRemoved = newCart.findIndex(
        (cartItem) => cartItem.cartId === action.payload
      );
      newCart.splice(indexOfItemToBeRemoved, 1);
      console.log(newCart);
      return { ...state, cart: [...newCart] };

    case INCREMENT_ITEM:
      newCart = [...state.cart];
      const indexOfItemToBeIncremented = newCart.findIndex(
        (cartItem) => cartItem.cartId === action.payload
      );
      newCart[indexOfItemToBeIncremented].quantity++;
      return { ...state, cart: [...newCart] };

    case DECREMENT_ITEM:
      newCart = [...state.cart];
      const indexOfItemToBeDecremented = newCart.findIndex(
        (cartItem) => cartItem.cartId === action.payload
      );
      if (newCart[indexOfItemToBeDecremented].quantity <= 1) {
        newCart.splice(indexOfItemToBeDecremented, 1);
      } else {
        newCart[indexOfItemToBeDecremented].quantity--;
      }
      return { ...state, cart: [...newCart] };

    default:
      return { ...state, cart: [...state.cart] };
  }
};

import searchArray from "../../utils/searchArray";
import _ from "lodash";
import {
  ADD_ITEM,
  CHANGE_CURRENCY,
  DECREMENT_ITEM,
  INCREMENT_ITEM,
  REMOVE_ITEM,
} from "../actions/actionTypes";

const initialState = { cart: [], latestCartItemId: 0, currency: "USD" };

/* 
cartItem = {
  cartId
  id
  quantity
  attributes: [
    {
      attributeName
      attributeValue
    }
  ]
  prices
}
*/

export default (state = initialState, action) => {
  let newCart;
  let newState;

  switch (action.type) {
    case ADD_ITEM:
      if (
        typeof action.payload.id === "undefined" ||
        typeof action.payload.quantity === "undefined" ||
        typeof action.payload.attributes === "undefined" ||
        typeof action.payload.prices === "undefined"
      ) {
        return _.cloneDeep(state);
      }

      const newCartItem = {
        ...action.payload,
        cartId: state.latestCartItemId + 1,
      };

      let existingItem;

      for (const cartItem of _.cloneDeep(state.cart)) {
        if (cartItem.id !== newCartItem.id) {
          continue;
        } else if (_.isEqual(cartItem.attributes, newCartItem.attributes)) {
          existingItem = cartItem;
        }
      }

      if (existingItem) {
        newCart = _.cloneDeep(state.cart);
        const indexOfExistingItem = newCart.findIndex(
          (cartItem) => cartItem.id === existingItem.id
        );
        newCart[indexOfExistingItem] = {
          ...newCart[indexOfExistingItem],
          quantity: newCart[indexOfExistingItem].quantity + 1,
        };
        return _.cloneDeep({
          ...state,
          cart: [...newCart],
          latestCartItemId: state.latestCartItemId + 1,
        });
      } else {
        return _.cloneDeep({
          ...state,
          cart: [...state.cart, { ...newCartItem }],
          latestCartItemId: state.latestCartItemId + 1,
        });
      }

    case REMOVE_ITEM:
      // newCart = [...state.cart];
      newCart = _.cloneDeep(state.cart);
      const indexOfItemToBeRemoved = newCart.findIndex(
        (cartItem) => cartItem.cartId === action.payload
      );
      newCart.splice(indexOfItemToBeRemoved, 1);
      return _.cloneDeep({ ...state, cart: _.cloneDeep(newCart) });

    case INCREMENT_ITEM:
      newCart = _.cloneDeep(state.cart);
      const indexOfItemToBeIncremented = newCart.findIndex(
        (cartItem) => cartItem.cartId === action.payload
      );
      newCart[indexOfItemToBeIncremented].quantity++;
      return _.cloneDeep({ ...state, cart: _.cloneDeep(newCart) });

    case DECREMENT_ITEM:
      newCart = _.cloneDeep(state.cart);
      const indexOfItemToBeDecremented = newCart.findIndex(
        (cartItem) => cartItem.cartId === action.payload
      );
      if (_.find(newCart, { cartId: action.payload }).quantity <= 1) {
        newCart.splice(indexOfItemToBeDecremented, 1);
      } else {
        newCart[indexOfItemToBeDecremented].quantity--;
      }
      return _.cloneDeep({ ...state, cart: _.cloneDeep(newCart) });

    case CHANGE_CURRENCY:
      newState = { ...state, cart: [...state.cart], currency: action.payload };
      return _.cloneDeep(newState);

    default:
      return _.cloneDeep({ ...state, cart: [...state.cart] });
  }
};

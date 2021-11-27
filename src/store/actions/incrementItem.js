import { INCREMENT_ITEM } from "./actionTypes";

const incrementItem = (cartItemId) => ({
  type: INCREMENT_ITEM,
  payload: cartItemId,
});

export default incrementItem;

import { INCREMENT_ITEM } from "./actionTypes";

export default (cartItemId) => ({
  type: INCREMENT_ITEM,
  payload: cartItemId,
});

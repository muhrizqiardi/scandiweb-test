import { DECREMENT_ITEM } from "./actionTypes";

export default (cartItemId) => ({
  type: DECREMENT_ITEM,
  payload: cartItemId,
});

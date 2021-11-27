import { DECREMENT_ITEM } from "./actionTypes";

const decrementItem = (cartItemId) => ({
  type: DECREMENT_ITEM,
  payload: cartItemId,
});

export default decrementItem;

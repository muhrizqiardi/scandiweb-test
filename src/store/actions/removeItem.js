import { REMOVE_ITEM } from "./actionTypes";

const removeItem = (cartId) => ({
  type: REMOVE_ITEM,
  payload: cartId,
});

export default removeItem;
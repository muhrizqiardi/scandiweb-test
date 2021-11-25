import { REMOVE_ITEM } from "./actionTypes";

export default (cartId) => ({
  type: REMOVE_ITEM,
  payload: cartId,
});

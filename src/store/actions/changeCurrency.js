import { CHANGE_CURRENCY } from "./actionTypes";

export default function changeCurrency(currency) {
  return {
    type: CHANGE_CURRENCY,
    payload: currency,
  };
}

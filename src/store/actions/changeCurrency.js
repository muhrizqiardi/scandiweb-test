import { CHANGE_CURRENCY } from "./actionTypes";

const changeCurrency = (newCurrency) => ({
  type: CHANGE_CURRENCY,
  payload: newCurrency,
});

export default changeCurrency;

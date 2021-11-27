import { CHANGE_CURRENCY } from "./actionTypes";

const changeCurrency = (item) => ({
  type: CHANGE_CURRENCY,
  payload: item,
});

export default changeCurrency;

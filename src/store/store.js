import { createStore } from "redux";
import cartReducer from "./reducers/cartReducer";

const initialState = { cart: [], latestCartItemId: 0 };

function configureStore() {
  return createStore(
    cartReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

export default configureStore();

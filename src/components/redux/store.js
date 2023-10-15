import { combineReducers } from "redux"
import ShoppingCartReducer from "../Login-v1/loginSlice";
import { createStore } from "redux";



const rootReducer = combineReducers({
    shoppingCart: ShoppingCartReducer
})

const store = createStore(rootReducer);

export default store;
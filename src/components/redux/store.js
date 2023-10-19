import { applyMiddleware, combineReducers } from "redux"
import ShoppingCartReducer from "../ShoppingCart/shoppingCartSlice";
import { createStore } from "redux";
import thunk from "redux-thunk";



const rootReducer = combineReducers({
    shoppingCart: ShoppingCartReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
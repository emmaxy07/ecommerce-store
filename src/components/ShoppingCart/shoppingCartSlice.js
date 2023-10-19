const initialState = {
    isLoggedIn: false,
    showCategoriesDropdown: false,
    products: []
}

export default function ShoppingCartReducer(state = initialState, action){
    switch(action.type){
        case "login":
            return {
                ...state,
                isLoggedIn: true,
                products: action.payload
            }
        case "showCategories":
            return {
                ...state,
                showCategoriesDropdown: !state.showCategoriesDropdown
            }
        default:
            return state;
    }
}

export function setLogin(){
    return async function(dispatch, getState){
       const res = await fetch('https://fakestoreapi.com/products');
       const data = await res.json();
       dispatch({type: "login", payload: data})
    }
}

export function showCategories(){
    return {
        type: "showCategories"
    }
}
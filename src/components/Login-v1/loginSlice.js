const initialState = {
    isLoggedIn: false
}

export default function ShoppingCartReducer(state = initialState, action){
    switch(action.type){
        case "login":
            return {
                ...state,
                isLoggedIn: true
            }
        default:
            return state;
    }
}

export function setLogin(){
    return {
        type: "login"
    }
}
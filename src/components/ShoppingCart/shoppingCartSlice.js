const initialState = {
    isLoggedIn: false,
    showCategoriesDropdown: false,
    products: [],
    error: "",
    cartItems: [],
    noOfItemsIncart: 0
}

export default function ShoppingCartReducer(state = initialState, action){
    switch(action.type){
        case "login":
            return {
                ...state,
                isLoggedIn: true,
                products: action.payload
            }
        case "login-error":
            return {
                ...state,
                error: state.error
            }
        case "showCategories":
            return {
                ...state,
                showCategoriesDropdown: !state.showCategoriesDropdown
            }
        case "updateCart": 
        let newCartItems = [...state.cartItems]
        const item = newCartItems.find((x) => x.id === action.payload.id)
		if(item) {
            item.qty += 1;
			newCartItems.map((x) => x.id ===action.payload.id ? {...item, qty: item.qty + 1} : x)
		} else {
			 newCartItems = [...newCartItems, {...action.payload, qty: 1}]
		}
        return {
            ...state,
            cartItems: newCartItems,
            noOfItemsIncart: newCartItems.length
        }
        case "onRemove":
            let existingCartItems = [...state.cartItems];
            const { id } = action.payload
            const exist = existingCartItems.find((x) => x.id === id);
            if (exist.qty === 1) {
                existingCartItems =existingCartItems.filter((x) => x.id !== id);
            } else {
                existingCartItems = existingCartItems.map((x) =>
                x.id === id ? { ...exist, qty: exist.qty - 1 } : x
                )
            } 
        return {
            ...state,
            cartItems: existingCartItems,
            noOfItemsIncart: existingCartItems.length
        }
        default:
            return state;
    }
}

export function setLogin(){
    return async function(dispatch, getState){
        try{
       const res = await fetch('https://fakestoreapi.com/products');
       const data = await res.json();
       dispatch({
        type: "login", 
        payload: data
    })
        } catch(err){
            dispatch({
                type: "login-error",
                error: err.message
            })
        }
    }
}

export function updateCart(payload){
    console.log(payload);
    return {
        type: "updateCart",
        payload
    }
}

export function onRemove(payload){
    return {
        type: "onRemove",
        payload
    }
}

export function showCategories(){
    return {
        type: "showCategories"
    }
}
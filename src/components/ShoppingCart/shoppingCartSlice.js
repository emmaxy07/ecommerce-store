const initialState = {
    isLoggedIn: false,
    isLoading: false,
    showCategoriesDropdown: false,
    products: [],
    error: "",
    searchResults: [],
    cartItems: [],
    noOfItemsIncart: 0,
    sortedItems: [],
    sortOrder: "asc",
    itemsPrice: 0,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    userImage: null,
    username: "",
    password: ""
}

export default function ShoppingCartReducer(state = initialState, action){
    switch(action.type){
        case "login":
            return {
                ...state,
                isLoggedIn: true,
                userImage: action.payload.userImage,
                username: action.payload.username, 
                password: action.payload.password, 
                error: "", 
            }
        case "getProducts":
            return {
                ...state,
                products: action.payload
            }
        case "updateUsername":
                return {
                    ...state,
                    username: action.payload
                }
        case "updatePassword":
            return {
                ...state,
                password: action.payload
            }
        case "getElectronics":
            return {
                ...state,
                products: action.payload
            }
        case "getJewelries":
            return {
                ...state,
                products: action.payload
            }
        case "getMensClothing": 
        return {
            ...state,
            products: action.payload
        }
        case "getWomensClothing":
            return {
                ...state,
                products: action.payload
            }
        case 'setSearchResults':
            return {
                  ...state,
                  searchResults: action.payload,
            }
        case 'clearSearchResults':
            return {
                  ...state,
                  searchResults: [],
            };
        case "startLoading":
            return {
                ...state,
                isLoading: true
            }
        case "stopLoading":
            return {
                ...state,
                isLoading: false
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
        case "sortItems":
            let itemsToBeSorted = [...state.products];
            const sortedItems = itemsToBeSorted.sort((a, b) => {
                if(state.sortOrder === "asc"){
                return a.price - b.price;
                } else {
                return b.price - a.price;
                }
            })
            return {
                ...state,
                sortedItems,
                sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc'
            }
        case "updatePrices":
            const newItemsPrice = [...state.cartItems].reduce((a, c) => a + c.qty * c.price, 0);
            const taxPrice = newItemsPrice * 0.14;
            const shippingPrice = newItemsPrice > 2000 ? 0 : 20;
            const totalPrice = newItemsPrice + taxPrice + shippingPrice;
            return {
                ...state,
                itemsPrice: newItemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
              };
        default:
            return state;
    }
}

export function updateCart(payload){
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

export function getElectronics(){
    return async function(dispatch, getState){
        try{
        dispatch({type: "startLoading"});
       const res = await fetch("https://fakestoreapi.com/products/category/electronics");
       const data = await res.json();
       dispatch({
        type: "getElectronics", 
        payload: data
    })
        } catch(err){
            dispatch({
                type: "login-error",
                error: err.message
            })
        } finally {
            dispatch({type: "stopLoading"});
        }
    }
}

export function getJewelries(){
    return async function(dispatch, getState){
        try{
        dispatch({type: "startLoading"});
       const res = await fetch("https://fakestoreapi.com/products/category/jewelery");
       const data = await res.json();
       dispatch({
        type: "getJewelries", 
        payload: data
    })
        } catch(err){
            dispatch({
                type: "login-error",
                error: err.message
            })
        } finally {
            dispatch({type: "stopLoading"});
        }
    }
}

export function getMensClothing(){
    return async function(dispatch, getState){
        try{
        dispatch({type: "startLoading"});
       const res = await fetch("https://fakestoreapi.com/products/category/men's clothing");
       const data = await res.json();
       dispatch({
        type: "getMensClothing", 
        payload: data
    })
        } catch(err){
            dispatch({
                type: "login-error",
                error: err.message
            })
        } finally {
            dispatch({type: "stopLoading"});
        }
    }
}

export function getWomensClothing(){
    return async function(dispatch, getState){
        try{
        dispatch({type: "startLoading"});
       const res = await fetch("https://fakestoreapi.com/products/category/women's clothing");
       const data = await res.json();
       dispatch({
        type: "getWomensClothing", 
        payload: data
    })
        } catch(err){
            dispatch({
                type: "login-error",
                error: err.message
            })
        } finally {
            dispatch({type: "stopLoading"});
        }
    }
}

export const setSearchResults = (results) => ({
    type: 'setSearchResults',
    payload: results,
});
  
export const clearSearchResults = () => ({
    type: 'clearSearchResults',
});

export function sortItems(){
    return {
        type: "sortItems",
    }
}

export function updatePrices() {
    return {
      type: "updatePrices",
    };
}

export function updateUsername(){
    return {
        type: "updateUsername"
    }
}

export function updatePassword(){
    return {
        type: "updatePassword"
    }
}

// shoppingCartSlice.js

export function setLogin(username, password) {
    return async function (dispatch) {
      try {
        dispatch({ type: "startLoading" });
  
        // API call for user authentication
        const loginRes = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: username,
            password: password,
          })
        });
  
        const loginData = await loginRes.json();
  
        if (loginRes.ok) {
          // Dispatch the "login" action for user authentication with username, password, and token
          dispatch({
            type: "login",
            payload: { username, password, token: loginData.token, userImage: loginData.image }
          });
  
          // Save the token in local storage
          localStorage.setItem('token', loginData.token);
  
          // Fetch products after successful authentication
          const productsRes = await fetch('https://fakestoreapi.com/products');
          const productsData = await productsRes.json();
  
          // Dispatch the action for fetching products
          dispatch({
            type: "getProducts",
            payload: productsData
          });
  
        } else {
          // Handle login error
          dispatch({
            type: "login-error",
            error: loginData.message
          });
        }
  
      } catch (err) {
        dispatch({
          type: "login-error",
          error: err.message
        });
      } finally {
        dispatch({ type: "stopLoading" });
      }
    };
  }
  

import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/navbar';
import ProductList from './components/Product-list/product-list';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Cart from './components/Cart/cart';
import CartPage from './components/Cart/CartPage';
import MensClothing from './components/Categories/MensClothing/MensClothing';
import WomensClothing from "./components/Categories/WomensClothing/WomensClothing";
import Electronics from './components/Categories/Electronics/Electronics';
import Jewelry from './components/Categories/Jewelry/Jewelry';
import Login from './components/Login/Login';
import { AppProvider } from './AppProviderContext';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from './components/ShoppingCart/shoppingCartSlice';


const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [products, setProducts] = useState([]);
  // const [cartItems, setCartItems] =useState([]);
	const [showCart, setShowCart] = useState(false);
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();
  const {
    isLoggedIn,
    products,
    cartItems
  } = useSelector(store => store.shoppingCart);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token){
      // setIsLoggedIn(true);
      dispatch(setLogin());
    }
    // fetchProducts();
  }, [dispatch]);

  // function fetchProducts() {
  //   fetch('https://fakestoreapi.com/products')
  //     .then(res => res.json())
  //     .then(productsData => {
  //       console.log(productsData);
  //       setProducts(productsData)
  //     });
  // }

  // const updateCart = (product) => {
  //   const exist = cartItems.find((x) => x.id === product.id)
	// 	if(exist) {
	// 		setCartItems(cartItems.map((x) => x.id ===product.id ? {...exist, qty: exist.qty + 1} : x))
	// 	} else {
	// 		setCartItems([...cartItems, {...product, qty: 1}])
	// 	}
  // }

  // const onRemove = (product) => {
  //   const exist = cartItems.find((x) => x.id === product.id);
  //   if (exist.qty === 1) {
  //     setCartItems(cartItems.filter((x) => x.id !== product.id));
  //   } else {
  //     setCartItems(
  //       cartItems.map((x) =>
  //         x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
  //       )
  //     );
  //   }
  // };

  const viewCart = () => cartItems;

  const login = () =>{
    // setIsLoggedIn(true);
    dispatch(setLogin());
    navigate("/products");
  }

  const firstChar = username.charAt(0).toUpperCase();
  const firstCharAfterSpace = username
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return (
    <div className="App">
      <AppProvider>
      <Routes>
        <Route path='/' element={<Login login={login} username={username} setUsername={setUsername} />} />
       {isLoggedIn && <Route
        path='/products'
        element={
          <>
        <Navbar setShowCart={setShowCart} viewCart={viewCart} firstChar={firstChar}
                  firstCharAfterSpace={firstCharAfterSpace} />
      <Cart showCart={showCart} />
      <ProductList products={products} viewCart={viewCart} />
      </>
        }
      />}
      <Route
      path='/cart'
      element={
        <CartPage />
      }
      />
      <Route path="/category/Men's Clothing" element={<MensClothing  />} />
      <Route path="/category/Women's Clothing" element={<WomensClothing />} />
      <Route path="/category/Electronics" element={<Electronics />} />
      <Route path="/category/Jewelry" element={<Jewelry />} />
      </Routes>
      </AppProvider>
    </div>
  )
};

export default App;
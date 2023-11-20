import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import CartPage from './components/Cart/CartPage';
import MensClothing from './components/Categories/MensClothing/MensClothing';
import WomensClothing from "./components/Categories/WomensClothing/WomensClothing";
import Electronics from './components/Categories/Electronics/Electronics';
import Jewelry from './components/Categories/Jewelry/Jewelry';
import Login from './components/Login/Login';
import { AppProvider } from './AppProviderContext';
import { useDispatch, useSelector } from 'react-redux';
import SingleProduct from './components/SingleProduct/SingleProduct';
import CheckoutPage from './components/CheckoutPage/CheckoutPage';
import HomePage from './components/HomePage/HomePage';
import { setInitialLoginStatus } from './components/ShoppingCart/shoppingCartSlice';


const App = () => {
	const [showCart, setShowCart] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch()

  const {
    isLoggedIn,
    cartItems,
    username,
  } = useSelector(store => store.shoppingCart);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check if logged in

    // Assuming you have an action to set the initial login status in Redux
    dispatch(setInitialLoginStatus(isLoggedIn));

    setInitialized(true);
  }, [dispatch]);

  if (!initialized) {
    return null; // Or a loading indicator while initializing
  }

  const viewCart = () => cartItems;

  const firstChar = username.charAt(0).toUpperCase();
  const firstCharAfterSpace = username
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")

  return (
    <div className="App">
      <AppProvider>
      <Routes>
        <Route path='/' element={<Login username={username} />} />
       {isLoggedIn && <Route
        path='/home'
        element={
<HomePage setShowCart={setShowCart} viewCart={viewCart} firstChar={firstChar} firstCharAfterSpace={firstCharAfterSpace} showCart={showCart} />
        }
      />}
      <Route
      path='/cart'
      element={
        <CartPage />
      }
      />
      <Route path='/product/:id' element={<SingleProduct />} />
      <Route path="/category/Men's Clothing" element={<MensClothing  />} />
      <Route path="/category/Women's Clothing" element={<WomensClothing />} />
      <Route path="/category/Electronics" element={<Electronics />} />
      <Route path="/category/Jewelry" element={<Jewelry />} />
      <Route path="/checkout" element={<CheckoutPage/>} />
      </Routes>
      </AppProvider>
    </div>
  )
};

export default App;
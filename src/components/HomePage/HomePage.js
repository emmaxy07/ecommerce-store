import "./HomePage.css"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import AppLogout from "../AppLogout"
import Cart from "../Cart/cart"
import Navbar from "../Navbar/navbar"
import ProductList from "../Product-list/product-list"
import { setLogin } from "../ShoppingCart/shoppingCartSlice"
import { getProducts } from "../ShoppingCart/shoppingCartSlice"

function HomePage({setShowCart, viewCart, firstChar, firstCharAfterSpace, showCart}) {
  const [online, setOnline] = useState(navigator.onLine);
  const [welcomeBack, setWelcomeBack] = useState(false);


  const dispatch = useDispatch();



  useEffect(() => {
    const handleOnline = () =>{
      setOnline(true);
      setWelcomeBack(true);

      setTimeout(() => {
        setWelcomeBack(false);
      }, 3000);
    }

    const handleOffline = () =>{
      setOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    const getTokenFromLocalStorage = () => {
      return localStorage.getItem('token');
    };
    const token = getTokenFromLocalStorage();
    if (token){
      dispatch(setLogin());
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline)
    }
  }, [dispatch]);

    return (
        <>
        <AppLogout>
            <Navbar setShowCart={setShowCart} viewCart={viewCart} firstChar={firstChar} firstCharAfterSpace={firstCharAfterSpace} />
            {online ? "" : <div style={{backgroundColor: "red", color: "white", fontSize: "20px", height: "50px", paddingTop: "25px"}}>You are offline</div>}
            {welcomeBack && <div className='welcome-back'>Welcome back! You are online</div>}
            <Cart showCart={showCart} />
            <ProductList />
        </AppLogout>
        </>
    )
}

export default HomePage

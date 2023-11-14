import { useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../ShoppingCart/shoppingCartSlice";

const setTokenInLocalStorage = (token) => {
  localStorage.setItem('token', token);
}

const Login = () =>{
    // const [password, setPassword] = useState("");
    const [usernamecheck, setUsernamecheck] = useState("");
    const [passwordcheck, setPasswordcheck] = useState("");

    const dispatch = useDispatch();
    const { username, password} = useSelector(store => store.shoppingCart)

    const handleLogin = (e) => {
        e.preventDefault();
      
        // const hasSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (username.length < 3) {
          setUsernamecheck("Username must be longer than 3 characters");
        } else {
          setUsernamecheck("");
        }
      
        if (username.length >= 3 && password.length >= 3 ) {
          dispatch(setLogin(username, password))
             }
          };
      

    return (
        <div className="login">
           <form className="login-form" onSubmit={handleLogin}>
           <h5>Enter Login Credentials</h5> 
            <div className="username-div">
                <input className="username" type="text" value={username} onChange={(e) => dispatch({ type: "updateUsername", payload: e.target.value })} placeholder="Username" />
                <p className="usernamecheck">{usernamecheck}</p>
            </div>
            <div className="password-div">
                <input className="password" type="password" value={password} onChange={(e) => dispatch({ type: "updatePassword", payload: e.target.value })} placeholder="Password" />
                <p className="passwordcheck">{passwordcheck}</p>
            </div>
            <div>
                <input type="checkbox" /><label>Remember Me</label>
                <button>Login</button>
            </div>
           </form>
        </div>
    )
}

export default Login;
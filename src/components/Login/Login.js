import { useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../ShoppingCart/shoppingCartSlice";

const setTokenInLocalStorage = (token) => {
  localStorage.setItem('token', token);
}

const Login = ({login}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernamecheck, setUsernamecheck] = useState("");

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log({username, password})
    if (username.length < 3) {
      // Handle username validation
    } else {
      // Clear any previous validation errors
      setUsernamecheck("");

      // Dispatch the setLogin action with the current username and password
      dispatch(setLogin(username, password));
    }
    login();
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={handleLogin}>
        <h5>Enter Login Credentials</h5>
        <div className="username-div">
          <input
            className="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <p className="usernamecheck">{usernamecheck}</p>
        </div>
        <div className="password-div">
          <input
            className="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {/* Password validation message can be added here */}
        </div>
        <div>
          <input type="checkbox" />
          <label>Remember Me</label>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;

import { useState } from "react";
import "./Login.css";

const setTokenInLocalStorage = (token) => {
  localStorage.setItem('token', token);
}

const Login = ({ login, username, setUsername }) =>{
    const [password, setPassword] = useState("");
    const [usernamecheck, setUsernamecheck] = useState("");
    const [passwordcheck, setPasswordcheck] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
      
        // const hasSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (username.length < 3) {
          setUsernamecheck("Username must be longer than 3 characters");
        } else {
          setUsernamecheck("");
        }
      
        // if (password.length < 3 || !hasSpecialCharacters.test(password)) {
        //   setPasswordcheck("Password must be longer than 3 characters and must have a special character");
        // } else {
        //   setPasswordcheck("");
        // }
      
        if (username.length >= 3 && password.length >= 3 ) {
          fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({   
                    username: username,
                    password: password,
                    // expiresInMins: 60, // optional
                  })
              })
              .then(res => res.json())
              .then(data => {
                const token = data.token;
                setTokenInLocalStorage(token);
                login();
              }).catch(err => console.error(err))
             }
          };
      

    return (
        <div className="login">
           <form className="login-form" onSubmit={handleLogin}>
           <h5>Enter Login Credentials</h5> 
            <div className="username-div">
                <input className="username" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" />
                <p className="usernamecheck">{usernamecheck}</p>
            </div>
            <div className="password-div">
                <input className="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
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
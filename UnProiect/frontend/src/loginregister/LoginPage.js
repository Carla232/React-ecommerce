import React, { useState, useEffect, useContext } from "react";
import { FaEye, FaEyeSlash, FaExclamationTriangle } from "react-icons/fa";
import { AuthContext } from "../AuthContext";
import "./LoginPage.css";

function LoginPage(props) {
  
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrUsernameError, setEmailOrUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const { login } = useContext(AuthContext);

  useEffect(() => {
    // check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const emailOrUsername = localStorage.getItem('emailOrUsername');
    const password = localStorage.getItem('password');
    console.log('isAuthenticated:', isAuthenticated); 
    console.log('emailOrUsername:', emailOrUsername);
    console.log('password:', password);
  
    if (isAuthenticated && emailOrUsername && password) {
     // const user = { emailOrUsername };
      login({ emailOrUsername, password });
      setEmailOrUsername(emailOrUsername);
      setPassword(password);
      setIsAuthenticated(true);
    }else if (!isAuthenticated) { // check if user is logged out
      setIsAuthenticated(false); // set isAuthenticated to false
    }else if(!emailOrUsername && !password) {
      console.log("Te rog introdu email-ul sau username-ul tău și parola ta");
    }
  }, []);
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    // validate email and password
    let valid = true;
    if (!emailOrUsername) {
      setEmailOrUsernameError("Te rog introdu email-ul sau username-ul tău");
      valid = false;
    } else {
      setEmailOrUsernameError("");
    }

    if (!password) {
      setPasswordError("Te rog introdu parola ta");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      try {
        const response = await fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ emailOrUsername, password })
        });

        const data = await response.json();

        if (data.success) {
          if (rememberMe) {
            localStorage.setItem('emailOrUsername', emailOrUsername);
            localStorage.setItem('password', password);
          }
          
          console.log(data);
          localStorage.setItem('isAuthenticated', true);
          setIsAuthenticated(true);
          login({ emailOrUsername, password });
          props.handleLogin(emailOrUsername);
          console.log(emailOrUsername);
        } else {
          if (!data.success) {
            setEmailOrUsernameError('Email/username sau parola incorectă');
          } else{ setEmailOrUsernameError('');}
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  if (isAuthenticated) {
   window.location.href = '/';
   return null; // or redirect to dashboard using navigate('/')
  }
  return (
    
    <div className="login-page">
          
      <div className="login-box">
        
        <form onSubmit={handleSubmit}>
        <div className="form-group">
  <label htmlFor="emailOrUsername">Email sau Username</label>
  <div className="input-container">
    <input
      type="text"
      id="emailOrUsername"
      value={emailOrUsername}
      onChange={(event) => setEmailOrUsername(event.target.value)}
    />
    {emailOrUsernameError && (
      <div className="error-container">
        <div className="error-icon">
          <FaExclamationTriangle />
        </div>
        <div className="error-text">{emailOrUsernameError}</div>
      </div>
    )}
  </div>
</div>


<div className="form-group">
  <label htmlFor="password">Parola</label>
  <div className="password-input-container">
    <input
      type={showPassword ? "text" : "password"}
      id="password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
    />
    {passwordError && (
      <div className="error-container">
        <div className="error-icon">
          <FaExclamationTriangle />
        </div>
        <div className="error-text">{passwordError}</div>
      </div>
    )}
    <div
      className="password-toggle-icon"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </div>
  </div>
</div>

          <button type="submit">Înregistrare</button>
          <div className="checkbox">
          <input 
            type="checkbox" 
            id="remember-me" 
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />Ține-mă minte
           
          </div>
          <hr />
          <div className="signup">
          <p>Client nou?</p>
             <a href="/register" className="signup-link">
               Alătură-te gratis
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaExclamationTriangle } from "react-icons/fa";
import "./RegisterPage.css";


function RegisterPage() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const API_URL = 'http://localhost:4000/';

  const handleSubmit = (event) => {
    event.preventDefault();
   
    let valid = true;
    if (!email) {
      setEmailError("Te rog introdu email-ul tău");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Te rog introdu un email valid");
      valid = false;
    } 
     else {setEmailError("");}
    
    if (!confirmPassword) {
        setConfirmPasswordError("Te rog introdu parola ta");
        valid = false;
      } else if (password !== confirmPassword) {
        setConfirmPasswordError("Parolele nu se potrivesc");
        valid = false;
      } else {
        setConfirmPasswordError("");
      }
    if (!password) {
      setPasswordError("Te rog introdu parola ta");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Parola trebuie să conțină cel puțin 6 caractere");
      valid = false;
    } else {
      setPasswordError("");
    }
    if (!name) {
        setNameError("Te rog introdu numele tău");
        valid = false;
      } else {
        setNameError("");
      }
      if (!username) {
        setUsernameError("Te rog introdu username-ul tău");
        valid = false;
      } else {
        setUsernameError("");
      }
      if (password !== confirmPassword) {
        setConfirmPasswordError("Parolele nu se potrivesc");
        valid = false;
      } else {
        setConfirmPasswordError("");
      }
      if (valid) {
        Promise.all([
          fetch(`${API_URL}users?email=${email}`),
          fetch(`${API_URL}users?username=${username}`)
        ])
        .then(([emailResponse, usernameResponse]) => {
          if (!emailResponse.ok || !usernameResponse.ok) {
            throw new Error("Răspunsul rețelei nu a fost ok");
          }
          return Promise.all([emailResponse.json(), usernameResponse.json()]);
        })
        .then(([emailData, usernameData]) => {
          if (emailData.exists || usernameData.exists) {
            if (emailData.exists) {
              setEmailError("Email-ul există deja");
            }
            if (usernameData.exists) {
              setUsernameError("Username-ul există deja");
            }
            throw new Error("Email-ul sau username-ul există deja");
          } else {
            const data = {
              name: name,
              username: username,
              email: email,
              password: password,
            };
            return fetch(`${API_URL}users`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
          }
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Răspunsul rețelei nu a fost ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Succes:", data);
          window.location.href = '/signin';
          // Add your code to handle successful response here
        })
        .catch((error) => {
          console.error("Eroare:", error);
          // Add your code to handle errors here
        });
      }
    };      

  return (
    
    <div className="login-page">
         
      <div className="login-box">
        
        <form onSubmit={handleSubmit}>
        <div className="form-group">
  <label htmlFor="name">Numele tău</label>
  <div className="input-container">
    <input
      type="text"
      placeholder="Numele și prenumele tău"
      id="name"
      value={name}
      onChange={(event) => setName(event.target.value)}
    />
    {nameError && (
      <div className="error-container">
        <div className="error-icon">
          <FaExclamationTriangle />
        </div>
        <div className="error-text">{nameError}</div>
      </div>
    )}
  </div>
</div>
<div className="form-group">
  <label htmlFor="username">Username</label>
  <div className="input-container">
    <input
      type="text"
      id="username"
      value={username}
      onChange={(event) => setUsername(event.target.value)}
    />
    {usernameError && (
      <div className="error-container">
        <div className="error-icon">
          <FaExclamationTriangle />
        </div>
        <div className="error-text">{usernameError}</div>
      </div>
    )}
  </div>
</div>
        <div className="form-group">
  <label htmlFor="email">Email</label>
  <div className="input-container">
    <input
      type="text"
      id="email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
    />
    {emailError && (
      <div className="error-container">
        <div className="error-icon">
          <FaExclamationTriangle />
        </div>
        <div className="error-text">{emailError}</div>
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
      placeholder="Cel puțin 6 caractere"
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
<div className="form-group">
  <label htmlFor="confirm-password">Confirmare parolă</label>
  <div className="password-input-container">
    <input
      type={showPassword ? "text" : "password"}
      id="confirm-password"
      value={confirmPassword}
      onChange={(event) => setConfirmPassword(event.target.value)}
    />
    {confirmPasswordError && (
      <div className="error-container">
        <div className="error-icon">
          <FaExclamationTriangle />
        </div>
        <div className="error-text">{confirmPasswordError}</div>
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
         
          <hr />
          <div className="signup">
            <p>Ai deja un cont?</p>
            <a href="/signin" className="signup-link">
              Conectează-te
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

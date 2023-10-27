import React, { useState, useEffect, useContext } from "react";
import "./NavBar.css";
import { FaUserCircle, FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import "./Account.css";
import Greeting from "../Greeting";
import { AuthContext } from "../AuthContext";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

function Account(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // stare pentru a urmări dacă utilizatorul este autentificat
  const [username, setUsername] = useState(""); // stare pentru a stoca numele de utilizator al utilizatorului
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setLoggedIn(true);
      setUsername(loggedInUser);
    } else {
      setLoggedIn(false);
    }
    
  }, []);
  useEffect(() => {
    if (modalIsOpen) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
  }, [modalIsOpen])

  // Funcție pentru a gestiona autentificarea cu succes
  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
    localStorage.setItem("user", username); // salvează numele de utilizator în stocarea locală
    console.log("Utilizator autentificat:", username);
  };

  const handleLogout = () => {
    logout();
  console.log("Utilizator deconectat");
  };
  
  return (
    <div className="App">
      <div
        className="reorder-my-items"
        onClick={() => setModalIsOpen(true)}
      >
        <FaUserCircle />
        <div>
          <span className="reorder-text">Logare</span>
          <span className="my-items-text">Autentificare</span>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
        style={customStyles}
      >
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">Cont</div>
            <button
              className="close-btn"
              onClick={() => setModalIsOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
          <hr className="modal-divider" />
          <div className="modal-body">
            <span onClick={() => (window.location.href = "/signin")}>
              Autentificare
            </span>
            <span
              className="greeting-text"
              onClick={() => {
                if (!loggedIn) {
                  setModalIsOpen(false);
                  window.location.href = "/signin";
                }
              }}
            >
              <Greeting />
            </span>
          </div>
          <hr className="modal-divider" />
          <div className="modal-body">
            <span onClick={() => (window.location.href = "/signin")}>
              Elemente vizualizate recent
            </span>
            <span
              className="greeting-text"
              onClick={() => (window.location.href = "/signin")}
            >
              Vezi elemente
            </span>
          </div>
          <hr className="modal-divider" />
          <div className="modal-body">
            
              <span onClick={handleLogout} className="logout-text">
                Deconectare
              </span>
      
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Account;
import React, { useState } from "react";
import "./NavBar.css";
import { FaHeart, FaList, FaClipboardList } from "react-icons/fa";

function NavBar() {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div className="App">
      <div className="reorder-my-items" onClick={toggleNav}>
        <FaHeart />
        <div>
          <span className="reorder-text">Reordonare</span>
          <span className="my-items-text">Lista mea</span>
        </div>
      </div>
      <div className={`overlay ${isNavVisible ? "reorder-active" : ""}`} onClick={toggleNav}></div>
      <div className={`nav-bar ${isNavVisible ? "reorder-active" : ""}`}>
        <ul className="nav-bar-list">
        <li className="nav-bar-item">
            <a href="#"><FaClipboardList /> Reordonare</a>
          </li>
          <li className="nav-bar-item">
            <a href="#"> <FaList /> Lista</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;

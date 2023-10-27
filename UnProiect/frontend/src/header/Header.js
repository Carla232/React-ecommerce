import React, { useState,useContext } from 'react';
import {FaSearch, FaUserCircle, FaShoppingCart} from 'react-icons/fa';
import './Header.css';
import NavBar from './NavBar';
import Account from './Account';
import MyCategory from './MyCategory';
import { Link } from 'react-router-dom';


function Header() {

  const [showSubcategories, setShowSubcategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Toate categoriile");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    if (event.target.value === "Toate categoriile") {
      setShowSubcategories(false);
    } else {
      setShowSubcategories(true);
    }
  };

  return (
    <div className="header">
    <MyCategory/>
      <div className="search">
        <div className="search-bar">
          <input type="text" placeholder="Caută" />
          <button>
            <FaSearch />
          </button>
        </div>
        <div className="category-dropdown">
        <div>
          <div className="select-wrapper">
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="Toate categoriile">Toate categoriile</option>
        <option value="Calculatoare/Tablete & Networking">Calculatoare/Tablete & Networking</option>
      </select>
      </div>
    </div>
         
        </div>
      </div>
      <div className='dropdown-container'>
      <NavBar/>
    </div>
      <div className="account">
       <Account />
      </div>
      <div className="cart">
      <Link style={{color: 'blue', textDecoration: 'none'}} to="/all">
        <a href="#"><FaShoppingCart style={{fontSize: '24px',color:"green"}}/></a>
        </Link>
      </div>
    </div>
  );
}

export default Header;
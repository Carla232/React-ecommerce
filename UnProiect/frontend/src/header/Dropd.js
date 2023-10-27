// Dropd.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dropd.css";
import { AppContext } from "./AppContext";

function Dropd() {
  const { categories, setCategory } = useContext(AppContext);
  const [activeItem, setActiveItem] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setCategory(category);
    setActiveItem(category.id);
    setShowCategories(true);
    //navigate(`/${category.name}`);
  };

  const handleSubcategoryClick = (category,subcategory) => {
    navigate(`/${category.id}/${subcategory.id}`);
  };

  const handleShowCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <div className="menu">
      <div className="menu-header departments" onClick={handleShowCategories}>
        <span>Departamente</span>
      </div>
      {showCategories && categories && (
        <div className="top-menu" style={{ width: '100px', height: '210px', marginTop: '18px' }}>
          {categories.map((category) => (
            <div key={category.id} className="top-menu-item" style={{ width: '100px', height: '50px', marginTop: '10px' }}>
              <div
                className={`top-menu-item-name ${
                  activeItem === category.id ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category.name}
              </div>
              {activeItem === category.id && (     
                <div className="top-submenu" style={{ width: '80px', height: '190px', marginLeft: '-395px', marginTop: '0px' }}>
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.id} className="top-list">
                      <Link to={`/${category.id}/${subcategory.id}`} onClick={() => handleSubcategoryClick(category,subcategory)}>
                        {subcategory.name}
                      </Link>
                    </div>
                  ))}
                  </div>
              )}
            </div>      
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropd;
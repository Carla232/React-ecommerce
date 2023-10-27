import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import { AppContext } from "./AppContext";

function Menu() {
  const { categories, setCategory } = useContext(AppContext);
  const [activeItem, setActiveItem] = useState(null);
  const [showCategories, setShowCategories] = useState(false); 

  const handleCategoryClick = (category) => {
    setCategory(category);
    setActiveItem(null);
  };
  const handleShowCategories = () => {
    setShowCategories(!showCategories);
  };                                                     
  return (
    <div className="menu">
      <div className="menu-header departments" onClick={handleShowCategories}>
        <span>Departments</span>
        <div className="top-menu">
  {showCategories && categories &&
    categories.map((category) => (
      <div key={category.id} className="top-menu-item">
        <Link to={category.url} onClick={() => handleCategoryClick(category)}>
          {category.name}
        </Link>
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="top-submenu">
            {category.subcategories.map((subcategory) => (
            <div key={subcategory.id} className="top-list">
            <Link to={subcategory.url}>{subcategory.name}</Link>
          </div>
            ))}
          </div>
        )}
      </div>
    ))}
</div>

      </div>
    </div>
  );
}

export default Menu;
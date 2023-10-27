import React, { useState, useContext } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import "./Menu.css";
import { AppContext } from "./AppContext";

function Dropin() {
  const { categories, setCategory } = useContext(AppContext);
  const [activeCategory, setActiveCategory] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (category) => {
    setCategory(category);
    setActiveCategory(null);
  };

  const handleSubcategoryClick = (subcategory) => {
    // do something with the subcategory
  };

  return (
    <div className="menu">
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Departments
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        getContentAnchorEl={null}
      >
        {categories.map((category) => (
          <MenuItem
            onClick={() => handleCategoryClick(category)}
            key={category.id}
            onMouseEnter={() => setActiveCategory(category)}
            onMouseLeave={() => setActiveCategory(category)}
          >
            {category.name}
            {category.subcategories && category.subcategories.length > 0 && activeCategory === category && (
              <Menu
                id={`submenu-${category.id}`}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                getContentAnchorEl={null}
              >
                {category.subcategories.map((subcategory) => (
                  <MenuItem key={subcategory.id} onClick={() => handleSubcategoryClick(subcategory)}>
                    {subcategory.name}
                  </MenuItem>
                ))}
              </Menu>
            )}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default Dropin;
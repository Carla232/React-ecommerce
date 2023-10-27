import React, { useState } from "react";

const categories = [
  "Clothing",
  "Accessories",
  "Home & Living",
  "Art & Collectibles",
  "Craft Supplies",
  "Weddings",
];
const FilterByCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const handleShowAllCategories = () => {
    setShowAllCategories(true);
  };
  return (
    <div className="filter-by-category">
      <h3>Filter by category</h3>
      <ul>
        {!showAllCategories &&
          categories.slice(0, 5).map((category) => (
            <li
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        {showAllCategories &&
          categories.map((category) => (
            <li
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        {!showAllCategories && (
          <li className="show-all" onClick={handleShowAllCategories}>
            Arata toate categoriile
          </li>
        )}
      </ul>
    </div>
  );
};

export default FilterByCategory;

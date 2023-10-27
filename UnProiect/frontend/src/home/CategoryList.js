import React, { useState, useEffect } from 'react';
import './CategoryList.css';

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Categorii</h2>
      <div className="category-list">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <img src={category.image} alt={category.name} />
            <span>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;

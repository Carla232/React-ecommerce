import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AppContext } from "./AppContext";
import Dropin from "./Dropin";
import Dropd from "./Dropd";

function MyCategory({ routes }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <AppContext.Provider value={{ categories, setCategory }}>
      <div className="app">
        <Dropd />
        <Routes routes={routes} />
      </div>
    </AppContext.Provider>
  );
}
export default MyCategory;

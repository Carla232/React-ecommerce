// Importăm modulele necesare
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './FilterBar.css'; // Importăm stilurile CSS pentru componenta noastră
import FilterButton from "./FilterButton"; // Importăm componenta FilterButton
import axios from 'axios'; // Importăm biblioteca axios pentru a face cereri HTTP
import ProductCard from './ProductCard'; // Importăm componenta ProductCard

// Definim componenta FilterBar
const FilterBar = ({category, subcategory}) => {
  // Folosim hook-ul useParams pentru a obține parametrii din URL
  const { categoryID, subcategoryID } = useParams();
  // Definim starea pentru produsele filtrate și o funcție pentru a actualiza această stare
  const [filteredProducts, setFilteredProducts] = useState([]);
  const updateFilteredProducts = (newFilteredProducts) => {
    setFilteredProducts(newFilteredProducts);
  };
  // Definim starea pentru încărcare și o funcție pentru a actualiza această stare
  const [loading, setLoading] = useState(true);

  // Folosim hook-ul useEffect pentru a face o cerere HTTP atunci când se schimbă categoryID sau subcategoryID
  useEffect(() => {
    setLoading(true);
    const url = `http://localhost:4000/products?category_id=${categoryID}&subcategory_id=${subcategoryID}`;
    axios.get(url)
      .then(res => {
        setFilteredProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [categoryID, subcategoryID]);

  // Returnăm JSX-ul pentru componenta noastră
  return (
    <div className="filter-bar">
      <h2>Găsește ceva ce iubești</h2>
      <div className="filter-options">
      <FilterButton onUpdateFilteredProducts={updateFilteredProducts} />
        <div className="sort-dropdown">
        {loading ? (
            <p>Încărcare produse...</p>
          ) : (
          <div className="products-list">
            {filteredProducts && filteredProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
       
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Exportăm componenta FilterBar pentru a o putea folosi în alte module
export default FilterBar;

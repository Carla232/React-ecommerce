import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get('http://localhost:4000/products');
      setProducts(response.data);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product.id} className="product">
          <img src={product.image} alt={product.name} />
          <div className="product-info">
            <h2>{product.title}</h2>
            <div className="reviews">{product.reviews} reviews</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;

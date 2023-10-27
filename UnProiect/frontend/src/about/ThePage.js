import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom'; // import useParams hook
import ProductPage from './ProductPage';

const ThePage = () => {
  const { id } = useParams(); // extract product ID from URL
  const [product, setProduct] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:4000/products/${id}`)
      .then(res => {
        setProduct(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  if (!product) {
    return <p>Incarcare produs...</p>;
  }

  return (
    <ProductPage product={product} />
  );
};

export default ThePage;
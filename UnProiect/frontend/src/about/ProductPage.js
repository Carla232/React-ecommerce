import React, { useState, useContext } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import "./ProductPage.css"
import CommentBox from './CommentBox';
import Comments from './Comments';
import CartContext from '../CartContext';
import UserContext from '../UserContext';
import axios from 'axios';

const ProductPage = ({ product }) => {
 
const { cart, setCart } = useContext(CartContext);
const {  user  } = useContext(UserContext);
console.log('User', user);
const username = user?.emailOrUsername;
console.log('UserContext', username);
  const percentOff = Math.round((1 - product.new_price / product.old_price) * 100);
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < product.stars) {
      return <FaStar key={i} />;
    } else if (i === Math.ceil(product.stars) - 1 && product.stars % 1 !== 0) {
      return <FaStarHalfAlt key={i} />;
    } else {
      return <FaRegStar key={i} />;
    }
  });
  function getColorImage(color) {
    if (color === 'Rosu') {
      return 'https://htmlcolorcodes.com/assets/images/colors/red-color-solid-background-1920x1080.png'; 
    } else if (color === 'Albastru') {
      return 'https://htmlcolorcodes.com/assets/images/colors/blue-color-solid-background-1920x1080.png';
    } else if(color === 'Verde') {
     return 'https://htmlcolorcodes.com/assets/images/colors/green-color-solid-background-1920x1080.png';
    } else if(color === 'Negru') {
      return 'https://htmlcolorcodes.com/assets/images/colors/black-color-solid-background-1920x1080.png';
  }
  else if(color === 'Alb') {
    return 'https://htmlcolorcodes.com/assets/images/colors/white-color-solid-background-1920x1080.png';}
  else if(color === 'Gri'){
    return 'https://htmlcolorcodes.com/assets/images/colors/grey-color-solid-background-1920x1080.png';
  }
  }
  const addToCartServer = async () => {
    try {
      const response = await axios.post('http://localhost:4000/add-to-cart', {
        userId: username,
        productId:product.id,
      });
      console.log(response.data.message);
      console.log(username);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };


  const handleAddToCart = () => {
   
    addToCartServer();
    const newCart = [...cart];
    const existingProduct = newCart.find((item) => item.id === product.id);
  
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      newCart.push({ ...product, quantity: 1 });
    }
  
    setCart(newCart);
  };

  return (
    <div className="product-page">
      <div className="left">
        <img src={product.image} alt={product.title} style={{"width":"100%","height":"100%"}}/>
      </div>

      <div className="right">
        <div className="info-container">
          <h3>{product.title}</h3>
          <div className="rating">
            {product.stars && stars}
            {product.reviews && <span className="num-reviews">({product.reviews})</span>}
          </div>
          <div className="prices">
            {product.new_price && (
              <div className="sale-price">${product.new_price.toFixed(2)}</div>
            )}
            <div className={`regular-price${product.new_price ? '' : ' no-sale'}`}>
              ${product.old_price.toFixed(2)}
            </div>
            {product.new_price && (
              <div className="discount">(-{percentOff}%)</div>
            )}
          </div>
          <div className="options">
            <div className="size-container">
              <label htmlFor="size-select">Mărime:</label>
              <div className="size-select">{product.size}</div>
            </div>
            <div className="color-container">
              <label htmlFor="color-select">Culoare:</label>
              <img 
                src={getColorImage(product.color)} 
                alt={product.color}
                className="color-image"
              />
            </div>
            <h2>{product.description}</h2>
          </div>
          <button className="add-to-cart" onClick={handleAddToCart}>Adaugă în coș</button>
        </div>
      </div> 
    </div>
  );
};

export default ProductPage;
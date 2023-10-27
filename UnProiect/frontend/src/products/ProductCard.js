import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './ProductCard.css';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const percentOff = Math.round((1 - product.new_price / product.old_price) * 100);
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= product.stars) {
      stars.push(<FaStar key={i} />);
    } else if (i === Math.ceil(product.stars) && product.stars % 1 !== 0) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }
  return (
    <Link to={`/about/${product.id}`} style={{ textDecoration: "none" }}>
    <div className="product-card">
      <div className="image-container">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="info-container">
        <h3>{product.brand} - {product.title}</h3>
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
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;

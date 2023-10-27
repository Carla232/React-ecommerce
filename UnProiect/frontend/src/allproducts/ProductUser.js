import React from 'react';
import "./ProductUser.css"

const ProductUser = ({ product }) => {
  const percentOff = Math.round((1 - product.new_price / product.old_price) * 100);
  return (
    <div className="products-container">
    <div className="product-user">
      <div className="left1">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="right1">
        <div className="info-container">
          <h3>{product.brand} - {product.title}</h3>
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
    </div>
    </div>
  );
};

export default ProductUser;

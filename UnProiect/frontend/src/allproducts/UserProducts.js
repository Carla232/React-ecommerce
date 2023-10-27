import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import axios from 'axios';
import ProductUser from './ProductUser';
import "./UserProducts.css";
import { Link } from 'react-router-dom';

const UserProducts = () => {
  const { user } = useContext(UserContext);
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const username = user?.emailOrUsername;
        const response = await axios.get('http://localhost:4000/user-products', {
          params: { userId: username } 
        });
        setUserProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching user products:', error);
      }
    }
    fetchUserProducts();
  }, [user]);

  const handleDelete = async () => {
    try {
      const username = user?.emailOrUsername;
      await axios.delete('http://localhost:4000/user-products', {
        headers: {
          'Content-Type': 'application/json'
        },
        data: { userId: username }
      });
      setUserProducts([]);
    } catch (error) {
      console.error('Error deleting user products:', error);
    }
  }
  const subtotal = userProducts.reduce((acc, product) => {
    return acc + (product.new_price || product.old_price);
  }, 0);

  return (
    <>
    <div className="content-container">
      <div className="product-list">
        {userProducts.map(product => (
          <ProductUser 
            key={product.id}
            product={product} 
          />
        ))}
      </div><Link style={{color: 'blue', textDecoration: 'none'}} to="/checkout">
      <button className="checkout-button" onClick={handleDelete}>Cumpără</button>
      </Link>
      <hr className="divider" />

      <div className="subtotal-container">

  <div className="subtotal-total">
    Subtotal ({userProducts.length} produse): ${subtotal.toFixed(2)}
  </div>
</div>
</div>
    </>
  );
}

export default UserProducts;

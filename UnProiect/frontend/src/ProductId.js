import React from 'react';
import { CartProvider, useCart } from './CartContext';

const Product = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity}{' '}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>{' '}
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, e.target.value)}
              />
            </li>
          ))}
        </ul>
      )}
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

const ProductsId = ({ categoryID, subcategoryID }) => {
        const [products, setProducts] = useState([]);
    
        useEffect(() => {
            const fetchProducts = async () => {
                const url = `http://localhost:4000/products?category_id=${categoryID}&subcategory_id=${subcategoryID}`;
                const response = await fetch(url);
                const data = await response.json();
                setProducts(data);
            };
    
            fetchProducts();
        }, [categoryID, subcategoryID]);
    
        return (
                <CartProvider>
                {products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
                <Cart />
                </CartProvider>
        );
    };
  
  export default ProductsId;
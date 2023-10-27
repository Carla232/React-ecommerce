import { useState } from 'react';
import './Checkout.css';
import { Link } from 'react-router-dom';

const Checkout = () => {

  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    address: '',
    zipcode: '',
    city: '',
    country: '',
    phone: '' 
  });

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiration: '',
    cvv: ''
  });

  const handleDeliveryChange = (e) => {
    setDeliveryDetails({
      ...deliveryDetails, 
      [e.target.name]: e.target.value
    });
  }
  const handleCardChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value
    });
  }
  return (
    <div className="checkout">
  
      <div className="checkout-delivery">
  
        <h2>Detalii Livrare</h2>
  
        <label>
          Nume:
          <input 
            name="name"
            value={deliveryDetails.name}
            onChange={handleDeliveryChange}
          />
        </label>
  
        <label>
          Adresă:
          <input
            name="address"
            value={deliveryDetails.address}
            onChange={handleDeliveryChange}
          />
        </label>
  
        <label>
          Oraș: 
          <input
            name="city"
            value={deliveryDetails.city}
            onChange={handleDeliveryChange}
          />
        </label>
  
        <label>
          Cod Poștal:
          <input
            name="zipcode"
            value={deliveryDetails.zipcode}
            onChange={handleDeliveryChange}  
          />
        </label>
  
        <label>
          Țară:
          <input
            name="country"
            value={deliveryDetails.country}
            onChange={handleDeliveryChange}
          />
        </label>
  
        <label>
          Telefon: 
          <input
            name="phone"
            value={deliveryDetails.phone}
            onChange={handleDeliveryChange}
          />
        </label>
  
      </div>
  
      <div className="checkout-payment">
  
        <h2>Detalii Card</h2> 
  
        <label>
          Număr Card:
          <input
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleCardChange}
          />
        </label>
  
        <label>
          Expirare:
          <input
            name="expiration"
            value={cardDetails.expiration}
            onChange={handleCardChange}  
          />
        </label>
  
        <label>
          CVV: 
          <input 
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleCardChange} 
          />
        </label>
  <Link style={{color: 'blue', textDecoration: 'none'}} to="/">
        <button>Cumpără</button>
  </Link>
      </div>
  
    </div>
  );
}

export default Checkout;

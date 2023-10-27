import React, { useState } from 'react';
import './MacyFooter.css';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaYoutube } from 'react-icons/fa';
import ShippingModal from './ShippingModal';

function MacyFooter() {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
      document.body.style.overflow = 'hidden'; // Add this line
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      document.body.style.overflow = 'auto'; // Add this line
      setShowModal(false);
    };
  return (
    <div className="macy-footer">
      <div className="row-bold">
        <div className="col">
          <h5>Serviciul clientului</h5>
        </div>
        <div className="col">
          <h5>Magazinele noastre</h5>
        </div>
        <div className="col">
          <h5>Conectează-te cu noi</h5>
        </div>
      </div>
      <div className="row">
        <div className="col" onClick={handleOpenModal}>
          <h5>Transport pentru</h5>
        </div>
        <div className="col">
          <h5>Caută un magazin</h5>
        </div>
        <div className="col">
        <div className="connect-icons">
            <FaFacebook id="icon" className="facebook" />
            <FaInstagram id="icon" className="instagram" />
            <FaTwitter id="icon" className="twitter"/>
            <FaPinterest id="icon" className="pinterest"/>
            <FaYoutube id="icon" className="youtube"/>
          </div>
        </div>
      </div>
      {showModal && <ShippingModal handleClose={handleCloseModal} />}
    </div>
  );
}

export default MacyFooter;

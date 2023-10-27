import React from 'react';
import PropTypes from 'prop-types';
import './ShippingModal.css';

function ShippingModal(props) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={props.onClose}>&times;</span>
        <h2>Cumpără către</h2>
        <form>
          <div>
            <label>Alege locația:</label>
            <select>
              <option value="USA">România</option>
              <option value="Canada">Canada</option>
              <option value="Mexico">Mexico</option>
            </select>
          </div>
          <div>
            <label>Alege valuta:</label>
            <select>
              <option value="USD">RON</option>
              <option value="CAD">CAD</option>
              <option value="MXN">MXN</option>
            </select>
          </div>
          <button type="submit">Salvează &amp; și continuă</button>
        </form>
      </div>
    </div>
  );
}

ShippingModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ShippingModal;

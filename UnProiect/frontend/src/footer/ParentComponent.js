import React, { useState } from 'react';
import ShippingModal from './ShippingModal';

function ParentComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      {isModalOpen && <ShippingModal onClose={handleClose} />}
    </div>
  );
}

export default ParentComponent;

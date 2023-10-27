import React, { useState } from "react";
import "./Modal.css";
import ModalContent from "./ModalContent";
const Modal = ({  show, onClose, onUpdateFilteredProducts, children }) => {
  const [isOpen, setIsOpen] = useState(show);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
    onClose();
    setShowCategoryFilter(false);
  };
  return (
    <>
      {isOpen ? (
        <div className="modal-container">
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>
          <div className="modal-content">
            <ModalContent
              onClose={handleClose}
              showCategoryFilter={showCategoryFilter}
              showCloseButton={!showCategoryFilter}
              onUpdateFilteredProducts={onUpdateFilteredProducts}
            >
              {children}
            </ModalContent>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Modal;
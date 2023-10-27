import React, { useState } from "react";
import "./FilterButton.css";
import { FaSlidersH } from "react-icons/fa";
import Modal from "./Modal";

const FilterButton = ({
  onUpdateFilteredProducts
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleClickModal = () => {
    console.log("handleClickModal called");
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    console.log("handleCloseModal called");
    setShowModal(false);
  };

  return (
    <div className="filter-dropdown">
      <button className="round-button dropdown-button" onClick={handleClickModal}>
        <FaSlidersH className="filter-icon" />
        Toate filtrele
      </button>
    
{showModal && (
  <Modal
    show={showModal}
    onClose={handleCloseModal}
    onUpdateFilteredProducts={onUpdateFilteredProducts}
  />
)}
    </div>
  );
};

export default FilterButton;
import React from "react";
import { FaAngleUp, FaAngleDown, FaPlus, FaMinus } from "react-icons/fa";

const PriceFilter = ({
  showPriceFilter,
  togglePriceFilter,
  selectedPrice,
  handlePriceChange,
  prices,
  showMore,
  toggleShowMore,
  lowPrice,
  handleLowPriceChange,
  highPrice,
  handleHighPriceChange,
}) => {
  return (
    <>
      <button onClick={togglePriceFilter} className="brand-btn">
        Pret{' '}
        {showPriceFilter ? (
          <FaAngleUp className="brand-filter-icon" />
        ) : (
          <FaAngleDown className="brand-filter-icon" />
        )}
      </button>
      {showPriceFilter && (
        <div className="brand-filter">
          <ul>
            {prices.slice(0, showMore ? prices.length : 4).map((price, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name="price"
                    value={price}
                    checked={selectedPrice === price}
                    onChange={handlePriceChange}
                  />
                  {price}
                </label>
                {index === prices.length - 1 && selectedPrice === "Custom" && (
                  <div className="custom-input">
                    <label>
                      <input
                        type="number"
                        value={lowPrice}
                        onChange={handleLowPriceChange}
                        placeholder="Low"
                      />
                      spre
                      <input
                        type="number"
                        value={highPrice}
                        onChange={handleHighPriceChange}
                        placeholder="High"
                      />
                    </label>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {prices.length > 4 && (
            <button onClick={toggleShowMore} className="show-more-button">
              {showMore ? (
                <>
                  <FaMinus /> Arata mai putin
                </>
              ) : (
                <>
                  <FaPlus /> Arata mai mult
                </>
              )}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default PriceFilter;
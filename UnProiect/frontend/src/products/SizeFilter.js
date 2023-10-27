import React from 'react';
import { FaAngleDown, FaAngleUp, FaPlus, FaMinus } from 'react-icons/fa';

const SizeFilter = ({
  sizes,
  showSizeFilter,
  toggleSizeFilter,
  showMore,
  toggleShowMore,
  handleSelectSize,
  selectedSizes,
}) => {
  return (
    <>
      <button onClick={toggleSizeFilter} className="brand-btn">
        Marime{' '}
        {showSizeFilter ? (
          <FaAngleUp className="brand-filter-icon" />
          ) : (
            <FaAngleDown className="brand-filter-icon" />
          )}
      </button>
      {showSizeFilter && (
       <div className="brand-filter">
          <ul>
            {sizes
              .slice(0, showMore ? sizes.length : 4)
              .map((size, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      value={size}
                      checked={selectedSizes.includes(size)}
                      onChange={() => handleSelectSize(size)}
                    />
                    {size}
                  </label>
                </li>
              ))}
          </ul>
          {sizes.length > 4 && (
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

export default SizeFilter;
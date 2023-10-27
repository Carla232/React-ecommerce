import React from 'react';
import { FaAngleDown, FaAngleUp, FaPlus, FaMinus } from 'react-icons/fa';

const ColorFilter = ({
  colors,
  showColorFilter,
  toggleColorFilter,
  showMore,
  toggleShowMore,
  handleSelectColor,
  selectedColors,
}) => {
  return (
    <>
      <button onClick={toggleColorFilter} className="brand-btn">
        Culori{' '}
        {showColorFilter ? (
          <FaAngleUp className="brand-filter-icon" />
          ) : (
            <FaAngleDown className="brand-filter-icon" />
          )}
      </button>
      {showColorFilter && (
        <div className="brand-filter">
          <ul>
            {colors
              .slice(0, showMore ? colors.length : 4)
              .map((color, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      value={color}
                      checked={selectedColors.includes(color)}
                      onChange={() => handleSelectColor(color)}
                    />
                    {color}
                  </label>
                </li>
              ))}
          </ul>
          {colors.length > 4 && (
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

export default  ColorFilter;


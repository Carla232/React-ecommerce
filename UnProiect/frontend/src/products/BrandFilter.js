import React from 'react';
import { FaAngleDown, FaAngleUp, FaPlus, FaMinus } from 'react-icons/fa';

const BrandFilter = ({
  brands,
  showBrandFilter,
  toggleBrandFilter,
  showMore,
  toggleShowMore,
  handleSelectBrand,
  selectedBrands,
}) => {
  return (
    <>
      <button onClick={toggleBrandFilter} className="brand-btn">
        Branduri{' '}
        {showBrandFilter ? (
          <FaAngleUp className="brand-filter-icon" />
        ) : (
          <FaAngleDown className="brand-filter-icon" />
        )}
      </button>
      {showBrandFilter && (
        <div className="brand-filter">
          <ul>
            {brands
              .slice(0, showMore ? brands.length : 4)
              .map((brand, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      value={brand}
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleSelectBrand(brand)}
                    />
                    {brand}
                  </label>
                </li>
              ))}
          </ul>
          {brands.length > 4 && (
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

export default BrandFilter;
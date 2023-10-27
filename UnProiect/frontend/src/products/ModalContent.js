import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ModalContent.css";
import {FaChevronRight } from "react-icons/fa";
import FilterByCategory from "./FilterByCategory";
import PriceFilter from "./PriceFilter";
import BrandFilter from "./BrandFilter";
import SizeFilter from "./SizeFilter";
import ColorFilter from "./ColorFilter";
const ModalContent = ({ onClose, showCloseButton, onUpdateFilteredProducts }) => {
const [products, setProducts] = useState([]);
const [showCategoryFilter, setShowCategoryFilter] = useState(false);
const [showBrand, setshowBrand] = useState(true);
const [showBrandFilter, setShowBrandFilter] = useState(false);
const [showPriceFilter, setShowPriceFilter] = useState(false);
const [showColorFilter, setShowColorFilter] = useState(false);
const [showSizeFilter, setShowSizeFilter] = useState(false);
const [showMore, setShowMore] = useState(false);
const brands = ['Adidas', 'Levi\'s', 'Nike', 'Calvin Klein', 'Puma', 'Zara','Bershka','Mango'];
const [selectedPrice, setSelectedPrice] = useState('');
const [filteredProducts, setFilteredProducts] = useState([]);
const [selectedBrands, setSelectedBrands] = useState([]);
const prices = ["Orice pret", "Sub 30 RON", "Intre 30 si 80 RON", "Intre 80 si 150 RON", "Peste 150 RON", "Personalizat"];
const [lowPrice, setLowPrice] = useState('');
const [highPrice, setHighPrice] = useState('');
const [isApplied, setIsApplied] = useState(false);
const [selectedColors, setSelectedColors] = useState([]);
const [selectedSizes, setSelectedSizes] = useState([]);
const colors = ['Negru', 'Albastru', 'Gri', 'Rosu', 'Alb'];
const sizes = ['S', 'M', 'L', 'XL'];
useEffect(() => {
axios.get('http://localhost:4000/products')
.then(res => {
console.log(res.data);
setProducts(res.data);
setFilteredProducts(res.data);
//onFilteredProductsUpdate(res.data);
})
.catch(err => {
console.log(err);
});
}, []);
const handleSelectBrand = (brand) => {
if ( selectedBrands.includes(brand)) {
setSelectedBrands(selectedBrands.filter(b => b !== brand));
} else {
setSelectedBrands([...selectedBrands, brand]);
}};
const handleSelectColor = (color) => {
  if (selectedColors.includes(color)) {
    setSelectedColors(selectedColors.filter(c => c !== color));
  } else {
    setSelectedColors([...selectedColors, color]);
  }
};

const handleSelectSize = (size) => {
  if (selectedSizes.includes(size)) {
    setSelectedSizes(selectedSizes.filter(s => s !== size));
  } else {
    setSelectedSizes([...selectedSizes, size]);
  }
};
const selectedProducts = products.filter(
(product) =>
selectedBrands.length === 0 || selectedBrands.includes(product.brand)
);
const handleApply = () => {
  setIsApplied(true);
  let newFilteredProducts = products;
  if (selectedPrice || (lowPrice && highPrice)) {
    if (selectedPrice === "Personalizat") {
      newFilteredProducts = newFilteredProducts.filter(
        (product) =>
          product.old_price >= parseInt(lowPrice) && product.old_price <= parseInt(highPrice)
      );
    } else {
      newFilteredProducts = newFilteredProducts.filter((product) => {
        if (selectedPrice === "Orice pret") return true;
        if (selectedPrice === "Sub 30 RON") return (product.new_price === null && product.old_price < 30) || (product.new_price !== null && product.new_price < 30);  
        if (selectedPrice === "Intre 30 si 80 RON") return (product.new_price === null && product.old_price >= 30 && product.old_price <= 80) || (product.new_price !== null && product.new_price >= 30 && product.new_price <= 80);
        if (selectedPrice === "Intre 80 si 150 RON") return (product.new_price === null && product.old_price >= 80 && product.old_price <= 150) || (product.new_price !== null && product.new_price >= 80 && product.new_price <= 150);
        if (selectedPrice === "Peste 150 RON") return (product.new_price === null && product.old_price > 150) || (product.new_price !== null && product.new_price > 150);
      });
    }
  }
  if (selectedBrands.length > 0) {
    newFilteredProducts = newFilteredProducts.filter((product) =>
      selectedBrands.includes(product.brand)
    );
  }
if (selectedColors.length > 0) {
  newFilteredProducts = newFilteredProducts.filter((product) =>
    selectedColors.includes(product.color)
  );
}
if (selectedSizes.length > 0) {
  newFilteredProducts = newFilteredProducts.filter((product) =>
    selectedSizes.includes(product.size)
  );
}
setFilteredProducts(newFilteredProducts);
onUpdateFilteredProducts(newFilteredProducts);
};

const handleReset = () => {
setSelectedBrands([]);
setIsApplied(false);
setFilteredProducts(products);
};
const handleLowPriceChange = (event) => {
setLowPrice(event.target.value);
};
const handlePriceChange = (event) => {
setSelectedPrice(event.target.value);
setLowPrice("");
setHighPrice("");
};
const handleHighPriceChange = (event) => {
setHighPrice(event.target.value);
};
const toggleShowMore = () => {
setShowMore(!showMore);
};
const toggleBrandFilter = () => {
setShowBrandFilter(!showBrandFilter);
};
const togglePriceFilter = () => {
setShowPriceFilter(!showPriceFilter);
};
const toggleSizeFilter = () => {
  setShowSizeFilter(!showSizeFilter);
  };
  const toggleColorFilter = () => {
    setShowColorFilter(!showColorFilter);
    };
const handleShowCategoryFilterClick = () => {
setShowCategoryFilter(true);
setshowBrand(false);
};
const handleHideFilters = () => {
setShowCategoryFilter(false);
setshowBrand(true);};
return (
<div className="etsy-filters">
<h2>{showCategoryFilter ? "Category" : "Filters"}</h2>
{!showCategoryFilter && showBrand && (
<p>Filtrare dupa categorie</p>
)}
{!showCategoryFilter && showCloseButton && (
<button onClick={onClose} className="close-button" >
Inchide
</button>
)}
{!showCategoryFilter && (
<button onClick={handleShowCategoryFilterClick} className="show-category-filter" >
Arata filtru categorie <FaChevronRight />
</button>
)}
  {showCategoryFilter && (
    <button onClick={handleHideFilters}>Inapoi</button>
  )}
  <div className="filter-groups">
  {!showCategoryFilter && showBrand && (
      <div className="filter-group">
           <BrandFilter
        brands={brands}
        showBrandFilter={showBrandFilter}
        toggleBrandFilter={toggleBrandFilter}
        showMore={showMore}
        toggleShowMore={toggleShowMore}
        handleSelectBrand={handleSelectBrand}
        selectedBrands={selectedBrands}
      /> 
</div>
    )}
    {!showCategoryFilter && showBrand && (
  <div className="filter-group">
    <SizeFilter
      sizes={sizes}
      handleSelectSize={handleSelectSize}
      selectedSizes={selectedSizes}
      showMore={showMore}
        toggleShowMore={toggleShowMore}
        showSizeFilter={showSizeFilter}
        toggleSizeFilter={toggleSizeFilter}
    />
  </div>
)}
{!showCategoryFilter && showBrand && (
  <div className="filter-group">
    <ColorFilter
      colors={colors}
      handleSelectColor={handleSelectColor}
      selectedColors={selectedColors}
      showMore={showMore}
        toggleShowMore={toggleShowMore}
        showColorFilter={showColorFilter}
        toggleColorFilter={toggleColorFilter}
    />
  </div>
)}
{!showCategoryFilter && showBrand && (
<div className="filter-group">
<PriceFilter showPriceFilter={showPriceFilter} 
togglePriceFilter={togglePriceFilter}
 selectedPrice={selectedPrice}
  handlePriceChange={handlePriceChange} 
  prices={prices} 
  showMore={showMore} 
  toggleShowMore={toggleShowMore} 
  lowPrice={lowPrice}
   handleLowPriceChange={handleLowPriceChange}
    highPrice={highPrice} 
    handleHighPriceChange={handleHighPriceChange} />

  </div>
)}  
 {showCategoryFilter && (
      <div className="filter-group">
        <FilterByCategory />
      </div>
    )}
  </div>
  <div className="filter-buttons">
    <button className="apply-filters" onClick={handleApply}>
      Aplica
    </button>
    <button onClick={handleReset}>Reseteaza</button>
  </div>
</div>);};
export default ModalContent;  
 
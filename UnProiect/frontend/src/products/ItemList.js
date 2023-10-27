import React, { useState } from "react";
import ProductCard from "./ProductCard";

const ItemList = ({ items }) => {
const [sortOption, setSortOption] = useState("relevance");

const sortItems = (items) => {
switch (sortOption) {
case "price_high":
return items.sort((a, b) => b.old_price - a.old_price);
case "price_low":
return items.sort((a, b) => a.old_price - b.old_price);
case "reviews":
return items.sort((a, b) => b.reviews - a.reviews);
case "recent":
return items.sort((a, b) => b.id - a.id);
default:
return items;
}
};

const sortedItems = sortItems(items);

return (
<div>
<div>
<label htmlFor="sort-select">Sort By:</label>
<select
id="sort-select"
value={sortOption}
onChange={(e) => setSortOption(e.target.value)}
>
<option value="relevance">Relevance</option>
<option value="price_high">Price: High to Low</option>
<option value="price_low">Price: Low to High</option>
<option value="reviews">Customer Reviews</option>
<option value="recent">Most Recent</option>
</select>
</div>
<div className="item-list">
{sortedItems.map((item) => (
<ProductCard key={item.id} product={item} />
))}
</div>
</div>
);
};

export default ItemList;
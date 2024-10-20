import { useState } from 'react';

const ProductFilterMenu = ({filterProduct}) => {
    const [activeFilter, setActiveFilter] = useState("TOP RATED");

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);  
        filterProduct(filter);   
      };

    return (
        <>
      <div className="product-collection-filter">
        <ul>
          <li>
            <button
              className={activeFilter === "TOP RATED" ? "filter-active" : ""} 
              onClick={() => handleFilterClick("TOP RATED")}
            >
              TOP RATED
            </button>
          </li>
          <li>/</li>
          <li>
            <button
              className={activeFilter === "PRICE LOW TO HIGH" ? "filter-active" : ""} 
              onClick={() => handleFilterClick("PRICE LOW TO HIGH")}
            >
              PRICE LOW TO HIGH
            </button>
          </li>
          <li>/</li>
          <li>
            <button
              className={activeFilter === "PRICE HIGH TO LOW" ? "filter-active" : ""} 
              onClick={() => handleFilterClick("PRICE HIGH TO LOW")}
            >
              PRICE HIGH TO LOW
            </button>
          </li>
          <li>/</li>
          <li>
            <button
              className={activeFilter === "DISCOUNTS" ? "filter-active" : ""} 
              onClick={() => handleFilterClick("DISCOUNTS")}
            >
              DISCOUNTS
            </button>
          </li>
        </ul>
      </div>
    </>
    )
}

export default ProductFilterMenu
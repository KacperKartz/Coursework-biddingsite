import Listings from "./Listings";
import { useState } from "react";
import ProductFilterMenu from "./ProductFilterMenu";

const ProductCollection = () => {
    const [filterType, setFilterType] = useState("TOP RATED");

    const filterProduct = ( filter ) =>{
        setFilterType(filter); // Update the filter type state
    }

    return (
        <>
            <div id="product-collection-container">
                <div className="product-collection-menu">
                    <h2>Bids Ending Soon</h2>
                    <div className="horizontal-bar bar-orange"></div>
                    <ProductFilterMenu filterProduct={ filterProduct } />
                </div>
                <Listings filterType={ filterType }/>
            </div>
        </>
    )
}

export default ProductCollection;
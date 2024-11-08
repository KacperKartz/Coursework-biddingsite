// Listings.jsx
import React, { useState, useEffect } from 'react';
import Listing from './listing/Listing'; // Ensure this component exists
import axios from 'axios';
import { Link } from 'react-router-dom';
import { data } from '../../../../../Web design/MockData'

const Listings = ({ filterType }) => {  
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true); // Add loading state
  // const [error, setError] = useState(null); // Optional: add error state

  // // Fetch data from API
  // useEffect(() => {
  //   axios.get('https://fakestoreapi.com/products')
  //     .then(response => {
  //       setData(response.data); 
  //       setLoading(false); 
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setError(error); 
  //       setLoading(false); 
  //     });
  // }, []);

  // if (loading) {
  //   return <div>Loading Items...</div>; 
  // }


  // if (error) {
  //   return <div>Error fetching data: {error.message}</div>; 
  // }

  // Filter and sort the products based on the selected filterType
  const filteredProducts = [...data].sort((a, b) => { // Spread to create a copy before sorting
    switch (filterType) {
      case "PRICE LOW TO HIGH":
        return a.price - b.price; // Sort by price ascending
      case "PRICE HIGH TO LOW":
        return b.price - a.price; // Sort by price descending
      case "DISCOUNTS":
        // Implement discount logic <-------------------------------------
        // return b.discount - a.discount; 
      case "TOP RATED":
      default:
        return b.rating.rate - a.rating.rate; // Sort by rating descending
    }
  });

  return (
    <div id="product-collection-listings">
      {filteredProducts.map(product => (
        <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <Listing
            title={product.title}
            description={product.description}
            price={product.price}
            image={product.image}
            category={product.category}
            rating={product.rating.rate} 
          />
        </Link>
      ))}
    </div>
  );
};

export default Listings;

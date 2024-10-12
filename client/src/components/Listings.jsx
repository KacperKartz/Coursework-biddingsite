// Listings.jsx
import React, { useState, useEffect } from 'react';
import Listing from './listing/Listing'; // Ensure this component exists
import axios from 'axios';

const Listings = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Optional: add error state

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setData(response.data); 
        setLoading(false); 
      })
      .catch(error => {
        console.error(error);
        setError(error); 
        setLoading(false); 
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>; 
  }

  return (
    <div className="product-list">
      {data.map(product => ( 
        <Listing
          key={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          image={product.image}
          category={product.category}
          rating={product.rating.rate} 
        />
      ))}
    </div>
  );
};

export default Listings;

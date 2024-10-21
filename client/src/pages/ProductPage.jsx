import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RatingMui from '@mui/material/Rating';

const ProductPage = () => {
  const { productId } = useParams(); // Retrieve the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product details based on productId
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div className="product-page-container">Loading...</div>;
  if (error) return <div className="product-page-container">Error: {error.message}</div>;

  return (
    <div className="product-page-container">
      {product ? (
        <>
          <img src={product.image} alt={product.title} />
          <div>
            <h1>{product.title}</h1>
            <hr />
            <div className="star-rating">
              <RatingMui name="read-only" value={product.rating.rate} readOnly />
              <p>( {product.rating.rate} / 5 )</p>
            </div>
            <h3>£{product.price}</h3>
            <hr />
            <br />
            <p>{product.description}</p>
            <br /><br />
            <span>
              <input placeholder='Enter bid amount'></input>
              <button>Place bid</button>
            </span>
          </div>
        </>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductPage;

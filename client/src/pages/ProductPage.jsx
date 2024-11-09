import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RatingMui from '@mui/material/Rating';
import AuctionComponent from "./WStest"

const ProductPage = () => {
  const { productId } = useParams(); // Retrieve the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product details based on productId
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_API}/api/products/${productId}`);
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
          <div className="product-page-img-div">
            <img src={product.image} alt={product.title} />
          </div>
          <div>
            <h1>{product.title}</h1>
            <hr />
            <div className="star-rating">
              <RatingMui name="read-only" value={product.rating_rate} readOnly />
              <p>( {product.rating.rate} / 5 )</p>
            </div>
            <h3>£{product.price}</h3>
            <hr />
            <br />
            <p>{product.description}</p>
            <br /><br />
          <AuctionComponent productID={productId}></AuctionComponent>
          </div>
        </>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductPage;
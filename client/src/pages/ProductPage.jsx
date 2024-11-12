import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RatingMui from '@mui/material/Rating';
import AuctionComponent from "./WStest"
import ReviewComponent from '../components/Review';
import { useSelector } from 'react-redux';
import AuctionEndTimer from '../components/AuctionEndTimer';


const ProductPage = () => {
  const { productId } = useParams(); // Retrieve the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = useSelector((state) => state.appUser.user?.userId);
  
  useEffect(() => {
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
    window.scrollTo(0, 0);
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
              <p>( {product.rating_rate} / 5 )</p>
            </div>
            <div>
            <h3>£{product.price}</h3>
            <AuctionEndTimer targetDate={product.bidding_end_date} />
            </div>
            <hr />
            <br />
            <p>{product.description}</p>
            <br /><br />
          <AuctionComponent productID={productId}></AuctionComponent>
          </div>
          <ReviewComponent productId={productId} userId={userId}></ReviewComponent>
        </>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductPage;
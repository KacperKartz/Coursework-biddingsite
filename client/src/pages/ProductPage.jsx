import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RatingMui from '@mui/material/Rating';
import AuctionComponent from "./WStest"
import ReviewComponent from '../components/Review';
import { useSelector } from 'react-redux';


const ProductPage = () => {
  const { productId } = useParams(); // Retrieve the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const user = useSelector((state) =>state.appUser.user)

  
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
  }, [productId]);

  useEffect(() => {
    const fetchUserId = async () => {
      if (!user || !user.username) return; 

      try {
        const response = await axios.post(`http://localhost:5000/api/user/${user.username}`);
        setUserId(response.data.userId);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, [user]);

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
            <h3>£{product.price}</h3>
            <hr />
            <br />
            <p>{product.description}</p>
            <br /><br />
          <AuctionComponent productID={productId}></AuctionComponent>
          <ReviewComponent productId={productId} userId={userId}></ReviewComponent>
          </div>
        </>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductPage;
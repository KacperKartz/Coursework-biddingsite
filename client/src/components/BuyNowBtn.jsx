import React from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';


const BuyNowBtn = ({productId, productPrice}) => {

    const userId = useSelector((state) => state.appUser.user?.userId);
    console.log(`BUTTON:::: ${productPrice}`)
    const addToBasket = async () => {
        try {
          // add product to basket
          const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_API}/basket/${userId}/add`, {
            productId,
            userId,
            quantity: 1,
            price: productPrice
          });
    
          if (response.status === 200) {
            alert("Product added to basket successfully!");
          } else {
            console.error("Failed to add product to basket:", response.statusText);
          }
        } catch (error) {
          console.error("Error adding product to basket:", error);
        }
      };
  return (
    <button className='buy-now-btn' onClick={addToBasket}>Buy It Now</button>
  )
}

export default BuyNowBtn
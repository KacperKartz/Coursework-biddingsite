import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Listing from './listing/Listing'


const SellingItems = ({user}) => {
    const [sellingItems, setSellingItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchSellingItems = async () => {
            try {
              const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_API}/api/selling/${user}`, {

              });
              setSellingItems(response.data);
            } catch (err) {
              console.error('Error fetching selling item:', err);
              setError("Failed to load selling items.");
            } finally {
              setLoading(false);
            }
          };
      
          fetchSellingItems();
        }, []);

    
  return (
    <div> <h2>Your items</h2>
    {sellingItems.length > 0 ? (
      sellingItems.map(product => (
        <Listing
        title={product.title}
        description={product.description}
        price={product.price}
        image={product.image}
        category={product.category}
        rating={product.rating_rate} 
        bidding_end_date={product.bidding_end_date}
        />
      ))
    ) : (
      <p>You are not selling any items at the moment.</p>
    )}</div>
  )
}

export default SellingItems
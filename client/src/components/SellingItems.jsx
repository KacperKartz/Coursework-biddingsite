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

        if (loading) return <p>Loading selling items...</p>;
        if (error) return <p>{error}</p>;
    
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
      <p>Your basket is empty.</p>
    )}</div>
  )
}

export default SellingItems
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import BasketItem from './BasketItem';


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
    <BasketItem
    key={product.basket_item_id}
    title={product.product_name}
    description={product.description}
    price={parseFloat(product.price)}
    image={product.image}
  />
  ))
    ) : (
      <p>You are not selling any items at the moment.</p>
    )}</div>
  )
}

export default SellingItems
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import BasketProduct from './BasketItem';

const BasketComponenet = ({user}) => {
    const [basketItems, setBasketItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchBasketItems = async () => {
            try {
              const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_API}/basket/items/${user}`, {

              });
              setBasketItems(response.data);
            } catch (err) {
              console.error('Error fetching basket:', err);
              setError("Failed to load basket items.");
            } finally {
              setLoading(false);
            }
          };
      
          fetchBasketItems();
        }, []);

    
  return (
    <div className="basket">
    <h2>Your Basket</h2>
      {basketItems.length > 0 ? (
        basketItems.map(product => (
          <BasketProduct
            key={product.basket_item_id}
            title={product.product_name}
            description={product.description}
            price={parseFloat(product.item_price)}
            quantity={product.quantity}
            image={product.image}
          />
        ))
      ) : (
        <p>Your basket is empty.</p>
      )}
  </div>
);
};
export default BasketComponenet
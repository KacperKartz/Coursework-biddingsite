import React from 'react'

const BasketItem = ({title, description, price, quantity, image}) => {
    return(
    <div className="basket-product">
      <img src={image} alt={title} className="basket-product-image" />
      <div className="basket-product-details">
        <h3 className="basket-product-title">{title}</h3>
        <p className="basket-product-description">{description}</p>
        <p className="basket-product-price">Price per unit: £{parseFloat(price).toFixed(2)}</p>
        {
          quantity ?<p className="basket-product-quantity">Quantity: {quantity}</p> : <p></p>
        }

        {quantity ?        <p className="basket-product-total">
          Total: £{parseFloat(price * quantity).toFixed(2)}
        </p> : <p></p> }

      </div>
    </div>
  );
};

export default BasketItem
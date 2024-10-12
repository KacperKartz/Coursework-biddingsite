import React from 'react';

const Image = ({ imageProp }) => {
  return (
    <img  className='card-img-top' src={imageProp} alt="Product" />
  );
};

export default Image;
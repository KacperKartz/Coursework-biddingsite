import React from 'react';

const Rating = ({ ratingProp }) => {
  return (
    <p className='fw-bold text-dark'>Rating: {ratingProp} / 5</p>
  );
};

export default Rating;
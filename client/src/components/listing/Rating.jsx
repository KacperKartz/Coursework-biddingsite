import React from 'react';
import RatingMui from '@mui/material/Rating';

const Rating = ({ ratingProp }) => {

  return (
    <div className="star-rating">
      <RatingMui name="read-only" value={ratingProp} readOnly />
      <p>( {ratingProp} / 5 )</p>
    </div>
  );
};

export default Rating;
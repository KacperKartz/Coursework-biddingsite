import React from 'react';

const Title = ({ titleProp, charLimit = 25 }) => {
  const truncatedTitle = titleProp.length > charLimit
  ? `${titleProp.substring(0, charLimit)}...`
  :titleProp;

  return (
    <h5 className='card-title'>{truncatedTitle}</h5>
  );
};

export default Title;
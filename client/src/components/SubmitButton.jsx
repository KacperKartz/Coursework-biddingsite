import React from 'react';

const SubmitButton = ({ text, isSubmitting }) => {
  return (
    <button className='submit-button' disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <span className='loading loading-spinner'></span>
          submitting...
        </>
      ) : (
        text || "submit"
      )}
    </button>
  );
};

export default SubmitButton;

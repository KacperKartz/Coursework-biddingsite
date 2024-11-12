import React, { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';
import { useSelector } from 'react-redux';

const AddProductForm = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.appUser.user?.userId);
  const [errors, setErrors] = useState({});

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.userId = userId;
    console.log(data);
    const apiUrl = `${import.meta.env.VITE_APP_BACKEND_API}/api/addProduct`;
    const newErrors = {};
    if (!data.title) newErrors.title = 'Title is required';
    if (!data.description) newErrors.description = 'Description is required';
    if (!data.price) newErrors.price = 'Price is required';
    if (!data.bidding_end_date) newErrors.bidding_end_date = 'Bidding end date is required';

   if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    ///Set validation
    setErrors({});
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });



      if (response.ok) {
        navigate('/'); 
      } else {
        console.error('Error adding product:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="general-form">
      <h4>Add Product</h4>
      <Form method="POST" onSubmit={handleSubmit} >
        <label>Title</label>
        <FormInput type="text" name="title" placeholder="Enter product title" />
        {errors.title && <p className="error-message">{errors.title}</p>}
        <label>Description</label>
        <FormInput type="text" name="description" placeholder="Enter product description" />
        {errors.description && <p className="error-message">{errors.description}</p>}
        <label>Price</label>
        <FormInput type="number" name="price" placeholder="Enter product price" />
        {errors.price && <p className="error-message">{errors.price}</p>}
        <label>Image URL</label>
        <FormInput type="text" name="image" placeholder="Enter image URL" />

        <label>Category</label>
        <select name="category" className="form-dropdown">
          <option value="">Select a category</option>
          <option value="electronics">Electronics</option>
          <option value="jewelry">Jewelry</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>

        <label>Bidding End Date</label>
        <FormInput type="datetime-local" name="bidding_end_date" placeholder="Select end date and time" />
        {errors.bidding_end_date && <p className="error-message">{errors.bidding_end_date}</p>}
        <SubmitButton text="Add Product" isSubmitting={false} />
      </Form>
    </div>
  );
};

export default AddProductForm;

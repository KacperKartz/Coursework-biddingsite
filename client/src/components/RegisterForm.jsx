import React from 'react';
import { Form, Link } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';





const RegisterForm = () => {
  return (
    <div className='login-form'>
      <h4>Please Login</h4>
      <Form method='POST'>
        <label>Username</label>
        <FormInput 
          type="text"
          label="username"
          name="username"
          placeholder="username"
        />
        <label>Email</label>
        <FormInput 
          type="email"
          label="email"
          name="email"
          placeholder="email"
        />
        <label>Password</label>
        <FormInput 
          type="password"
          label="password"
          name="password"
          placeholder="********"
        />
        <SubmitButton /> 
      </Form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterForm;

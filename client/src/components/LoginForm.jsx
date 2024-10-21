import React from 'react';
import { Form, Link } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';

const LoginForm = () => {
  return (
    <div className='login-form'>
      <h4>Please Login</h4>
      <Form method='POST'>
        <label>email</label>
        <FormInput 
          type="text"
          label="email"
          name="identifier"
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
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginForm;

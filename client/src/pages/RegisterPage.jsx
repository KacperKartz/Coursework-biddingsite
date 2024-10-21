import React from 'react';
import RegisterForm from '../components/RegisterForm';
import axios from 'axios';
import { REGISTERURL } from '../pages/data';
import { redirect } from 'react-router-dom';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    console.log(data);
    const response = await axios.post(REGISTERURL, data, {

      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return redirect("/login");
  } catch (error) {
    console.log(error)
    const errorMessage =
      error?.response?.data?.error?.message || "Please double check your credentials";
    console.log(errorMessage);
    return null;
  }
};


const RegisterPage = () => {
  return (
    <div className='welcome-page-container'>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
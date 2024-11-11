import React from 'react'
import LoginForm from '../components/LoginForm'
import { loginUser } from '../store/appUserSlice'
import { LOGINURL } from './data'
import { redirect } from 'react-router-dom'
import axios from 'axios'

export const action = (store) => 
  async ({request}) => {
    console.log(store);
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try{
      const response = await axios.post(LOGINURL,data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(response.data);
      const userIdResponse = await axios.post(`http://localhost:5000/api/user-by-mail/${response.data.user.email}`);
      const userId = userIdResponse.data.userId;

      store.dispatch(loginUser({ user: { ...response.data.user, userId } }));
      return redirect("/");
    }catch(error){
      const errorMessage = 
      error?.response?.data?.error?.message ||
      "Please double check your credentials";
      console.log(error)
      return null;
    }
};

const LoginPage = () => {
  return (
    <div className='login-page-container'>
        <LoginForm></LoginForm>
  
    </div>
  )
}

export default LoginPage
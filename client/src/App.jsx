import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';



function App() {

  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App

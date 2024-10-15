import React from 'react';
import Navbar from './components/navbar';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
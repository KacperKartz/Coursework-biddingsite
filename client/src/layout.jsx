import React from 'react';
import Navbar from './components/navbar';
import { Outlet } from 'react-router-dom';
import FooterMenu from './components/FooterMenu';

const Layout = ({ children }) => {
  return (
    <div>
      <main>
        <Navbar />
        <Outlet />
        <FooterMenu />
      </main>
      
    </div>
  );
};

export default Layout;


import React from 'react';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import FooterMenu from './components/FooterMenu';
import BackToTopButton from './components/BackToTopButton';

const Layout = ({ children }) => {
  return (
    <div>
      <main>
        <Navbar />
        <Outlet />
        <BackToTopButton />
        <FooterMenu />
      </main>
      
    </div>
  );
};

export default Layout;


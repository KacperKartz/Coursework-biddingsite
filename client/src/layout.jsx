import React from 'react';
import Navbar from './components/navbar';
import FooterMenu from './components/FooterMenu';

const Layout = ({ children }) => {
  return (
    <div>
      <main>
        <Navbar />
        {children}
        <FooterMenu />
      </main>
      
    </div>
  );
};

export default Layout;
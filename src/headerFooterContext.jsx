import React, { createContext, useContext, useState } from 'react';
import Header from './header';
import Footer from './footer';

const HeaderFooterContext = createContext();

export const useHeaderFooterContext = () => {
  const context = useContext(HeaderFooterContext);
  if (!context) {
    throw new Error('useHeaderFooterContext must be used within a HeaderFooterProvider');
  }
  return context;
};

export const HeaderFooterProvider = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderFooterContext.Provider value={{ isMenuOpen, toggleMenu }}>
      <Header />
      {children}
      <Footer />
    </HeaderFooterContext.Provider>
  );
};

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/home';
import Contacto from './Pages/Contacto/contacto';
import Alta from './Pages/Alta/alta';
import Nosotros from './Pages/Nosotros/nosotros';
import { HeaderFooterProvider } from './headerFooterContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContextProvider } from './CartContext';


const App = () => (
 
  <Router>
    <CartContextProvider>
    <HeaderFooterProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/alta" element={<Alta />} />
        <Route path="/nosotros" element={<Nosotros />} />
      </Routes>
    </HeaderFooterProvider>
    <ToastContainer />
    </CartContextProvider>
  </Router>
  
);

export default App;

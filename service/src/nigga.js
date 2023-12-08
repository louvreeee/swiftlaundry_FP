import Header from "./components/Header";
import React, { useState, useEffect } from 'react';

import Contact from "./sections/Contact";
import Services from "./sections/Services";
import Prices from "./sections/Prices";
import Home from "./sections/Home";
import About from "./sections/About";
import NavProvider from './context/NavContext'


function nigga() {
  
  return (
    <div>
      <NavProvider>
        <Header />
        <Home />
        <Services />
        <About />
        <Prices />
        <Contact />
      </NavProvider>
    </div>
  );
}

export default nigga
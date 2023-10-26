import React, { useState } from 'react';
import './styles/bootstrap.min.css'
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SloganCarousel from './components/SloganCarousel/SloganCarousel';
import Content from './components/Content/Content';
import Modal from './components/Modal/Modal';


function App() {
  return (
    <div className="App">
      <Header/>
      <Content/>
      <Footer/>
    </div>
  );
}

export default App;

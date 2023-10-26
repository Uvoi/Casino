import React, { useState } from 'react';
import './styles/bootstrap.min.css'
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Content from './components/Content/Content';


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

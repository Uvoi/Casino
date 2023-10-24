import React from 'react';
import './styles/bootstrap.min.css'
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SloganCarousel from './components/SloganCarousel/SloganCarousel';


function App() {
  return (
    <div className="App">
      <Header/>
      <SloganCarousel/>

      <Footer/>
    </div>
  );
}

export default App;

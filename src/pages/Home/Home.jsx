import React from 'react';
import SloganCarousel from '../../components/SloganCarousel/SloganCarousel';
import axios from 'axios';
const Home = (props)=>
{
    const handleClick = () => {
        axios.get('http://localhost:8000/api/data') // Замените на адрес вашего сервера Go
          .then(response => console.log(response.data))
          .catch(error => console.error(error));
      };
    
      return (
        <div>
          <SloganCarousel/>
        </div>
      );
};

export default Home;
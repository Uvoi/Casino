import React from 'react';
import SloganCarousel from '../../components/SloganCarousel/SloganCarousel';
import axios from 'axios';
const Home = (props)=>
{

  const check = () => {
    axios.get('http://127.0.0.1:8000/api/whoami', { withCredentials: true })
      .then(response => {
        console.log(response.data);
        // использование данных сессии
      })
      .catch(error => {
        console.log("ошибка блять!");
        console.log(error);
      });
  }

  
  return (
    <div>
      <SloganCarousel/>
      <button onClick={check} type='button'>check</button>
    </div>
  );
};

export default Home;
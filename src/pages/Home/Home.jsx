import React from 'react';
import SloganCarousel from '../../components/SloganCarousel/SloganCarousel';
import axios from 'axios';
const Home = (props)=>
{

  axios.defaults.withCredentials = true;
  const check = () => {
    axios.get('http://127.0.0.1:8000/api/whoami')
      .then(response => {
        console.log(response.data);
        // использование данных сессии
      })
      .catch(error => {
        console.log("ошибка блять!");
        console.log(error);
      });
  }

  const del = () => {
    axios.post('http://127.0.0.1:8000/api/delete_session')
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
      <button onClick={del}>delete</button>
    </div>
  );
};

export default Home;
import React, { useState } from 'react';
import SloganCarousel from '../../components/SloganCarousel/SloganCarousel';
import axios from 'axios';
const Home = (props)=>
{

  // const [user, setUser] = useState({ name: "", email: "" });
  

  axios.defaults.withCredentials = true;
  const check = () => {
    axios.get('http://127.0.0.1:8000/api/whoami')
      .then(response => {
        console.log(response.data);
        const { name, email } = response.data;
        console.log("Name:", name);
        console.log("Email:", email);
        // setUser(response.data)
        // использование данных сессии
      })
      .catch(error => {
        console.log("ошибка блять!");
        console.log(error);
        // setUser("")
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

  const get_money = () => {
    axios.get('http://127.0.0.1:8000/api/get_money')
      .then(response => {
        console.log(response.data);
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
      <button onClick={get_money}>mon</button>
    </div>
  );
};

export default Home;
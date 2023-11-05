import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/bootstrap.min.css'
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Content from './components/Content/Content';


function App() {
  axios.defaults.withCredentials = true;

  const [money, setMoney] = useState(null);
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/whoami')
      .then(response => {
          var info = {name:response.data["name"],
                   email: response.data["email"]}
          setUser(info)
          console.log("user: ", info)


          axios.get('http://127.0.0.1:8000/api/get_money')
              .then(response => {
                setMoney(response.data)
              })
              .catch(error => {
              console.log("ошибка блять!");
              console.log(error);
              });
      })
      .catch(error => {
          console.log("ошибкааааааааааааа")
          setUser("")
      });
    }, []);


    
  return (
    <div className="App">
      <Header User = {user} Money={money} />
      <Content/>
      <Footer/>
    </div>
  );
}

export default App;

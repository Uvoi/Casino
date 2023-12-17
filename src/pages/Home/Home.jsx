import React, { useState } from 'react';
import SloganCarousel from '../../components/SloganCarousel/SloganCarousel';
import axios from 'axios';

import GamePreview from '../../components/GamePreview/GamePreview';
import GameList from '../../components/GamesList/GameList';
import roulette from '../../images/roulette.jpeg'
import slots from '../../images/slots.jpg'
import shell from '../../images/shell.jpg'
import mine from '../../images/mine.jpg'
import scratch from '../../images/scratch.jpg'
import rouletteslider from '../../images/rouletteslider.png'
import christmas_slots from '../../images/games_themes/slots_game/christmas_slots.jpg';
import christmas_shell from '../../images/games_themes/shell_game/shell_game_christmas.jpg';
import christmas_scratch from '../../images/games_themes/scratch_game/scratch.jpg'

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
        console.log("ошибка!");
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
    <div id='homePage'>
      <SloganCarousel/>
      {/* <button onClick={check} type='button'>check</button>
      <button onClick={del}>delete</button>
      <button onClick={get_money}>mon</button> */}

            <br style={{margin:"50px"}}/>
            <GameList title={"Популярные игры"}>
                <GamePreview image = {shell} title={'Наперстки'} link = {"/games/shellgame"}/>
                <GamePreview image = {mine} title={'Минное поле'} link = {"/games/guessinggame"}/>
                <GamePreview image = {roulette} title={'Рулетка'} link = {"/games/roulettegame"}/>
                <GamePreview image = {slots} title={'Слоты'} link = {"/games/slotsgame"}/>
                <GamePreview image = {scratch} title={'Скретч'} link = {"/games/scratchgame"}/>
                <GamePreview image = {rouletteslider} title={'Горизонтальная рулетка'} link = {"/games/rouletteslidergame"}/>
                <GamePreview image = {christmas_slots} title={'Новогодние слоты'} link = {"/games/SlotsGameChristmas"}/>
                <GamePreview image = {christmas_shell} title={'Новогодние наперстки'} link = {"/games/ShellGameChristmas"}/>
            </GameList>
    </div>
  );
};

export default Home;
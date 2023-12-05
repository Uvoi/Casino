// RouletteGame.js
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import axios from 'axios';
import './RouletteGameStyles.css';
import GamePage from '../../GamePage/GamePage';

import { RouletteTable } from 'react-casino-roulette';
import { RouletteWheel } from 'react-casino-roulette';
import bet_img from '../../../images/bet.png'
import { useNotification } from '../../../components/Notification/Notification';

import 'react-casino-roulette/dist/index.css';


const RouletteGame = ({curMoney, ParentUpdate}) => {
  axios.defaults.withCredentials = true;
  const showNotification = useNotification();

  const [start, setStart] = useState(false);
  const [winningBet, setWinningBet] = useState('-1');
  const controls = useAnimation();
  const [moneyCount, setMoneyCount] = useState("");
  const [bets, setBets] = useState({});
  const [betM, setBetM] = useState({});
  const [resMults, setResMults] = useState([]);
  const [betsCount, setBetsCount] = useState(0);
  const [isGame, setIsGame] = useState(false);
  var winB = "-1";

  const betsMult ={   //bet
    "19_TO_36" : 2,
    "ODD" : 2,
    "BLACK" : 2,
    "RED" : 2,
    "EVEN" : 2,
    "1_TO_18": 2,
    "1ST_DOZEN" : 3,
    "2ND_DOZEN": 3,
    "3RD_DOZEN" : 3,
    "1ST_COLUMN" : 3,
    "2ND_COLUMN" : 3,
    "3RD_COLUMN" : 3,
    "STREET" : 12,
    "DOUBLE_STREET" : 6,
    "CORNER" : 9,
    "SPLIT" : 18,
    "BASKET_US" : 7,
    "ROW" : 19,
    "STRAIGHT_UP" : 36,
    "0" : 36,
    "00" : 36
  }

  

  const doSpin = () => {
    setIsGame(true);
    controls.start({
      rotate:720,
      transition:{ duration: 2, type: "spring", stiffness: 50, damping: 50 }
    })
    setStart(true);
  }


  const handleBet = ({ bet, payload, id }) => {
    console.log(`Сделана ставка: ${bet}`, 'с данными:', payload);
    setBetM((prevData) => ({
      ...prevData,
      [payload] : bet
    }));

    setBets((prevState) => ({
      ...prevState,
      [id]: {
        icon: bet_img,
      },
    }));
  }

  const clearBets = () => 
  {

    setBetsCount(0);
    setBets({});
    setBetM({});
    setResMults([])
  }

  const checkBets = () =>
  {
    console.log(resMults)
    console.log(betsCount)
    console.log(betM)
  }

  
  const processArray = () => {
    Object.keys(betM).forEach((key) => {
      const numbers = key.split(',').map(Number); // Разбиваем строку по запятым и преобразуем в числа
  
      // Проверяем, входит ли winningBet в массив чисел
      if (numbers.includes(Number(winB))) {
        // Выводим значение из betsMult для текущего ключа
        setResMults((prevM) => [...prevM, betsMult[betM[key]]])
      }
    });
  };


// setWinningBet
  const resForServ = () => {
    const sumOfMults = resMults.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const bet = (parseInt(moneyCount.replace(/\s/g, '')));
    axios.patch('http://127.0.0.1:8000/api/games/roulettegame/result', {bet, sumOfMults, betsCount}, axios.defaults.withCredentials = true)
    .then(response => {
      // console.log(response.data);
      if (response.data >= 0){
        showNotification("Вы выиграли "+response.data+"✯", "green")
      }
      else showNotification("Повезет в другой раз", "orange")
      ParentUpdate();
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
    });
  }


  const spinEnd = async () =>
  {
    setTimeout( async () => {
      await resForServ()
      setIsGame(false);
      setStart(false);
      clearBets();
    }, 1000);
  }



  const formatMoneyInput = (value) => {
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    setMoneyCount(value);
  };

  const res_for_serv = () =>
  {
    axios.get('http://127.0.0.1:8000/api/games/roulettegame')
    .then(response => {
      // console.log(response.data);
      winB = (response.data)
      setWinningBet(response.data)
      doSpin()
      // console.log(winB)
      // console.log(winB)
      processArray();
      setBetsCount(Object.keys(betM).length);

    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
    });
  }

  
  


  return (
    <GamePage>
    <div id='roulette_game'>
    <h1>Рулетка</h1>

        <motion.div id='roulete_r'
          animate={controls}
        >
        <RouletteWheel 
        start={start}
        winningBet={winningBet}
        withAnimation = {false} 
        onSpinningEnd = {spinEnd}
        />
      </motion.div>
      <div>
      </div>
    <div  id='roulette_table' disabled={isGame} style={{ opacity: isGame ? 0.5 : 1, pointerEvents: isGame ? 'none' : 'auto' }}>
      <RouletteTable bets={bets} onBet={handleBet}/>
    </div>


        <div id="guessing_game_money">
          {/* <span style={{"background": "none", color : "white", fontSize: "18px"}}>размер ставки</span> */}
          <input
            value={moneyCount}
            id="guessing_game_input_money"
            placeholder="Размер ставки"
            onChange={(e) => formatMoneyInput(e.target.value)}
          />
          <span>✯</span>
          <button onClick={res_for_serv} disabled={isGame| moneyCount=="" | Object.keys(betM).length == 0}>Играть</button>
          <button type="button" onClick={clearBets} disabled={isGame}> Очистить поле</button>
        </div>

        {/* <button type="button" onClick={checkBets}>
          check
        </button> */}

    </div>
    </GamePage>
  );
};

export default RouletteGame;

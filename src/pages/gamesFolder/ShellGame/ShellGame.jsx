import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import GamePage from '../../GamePage/GamePage';
import './ShellGameStyles.css';
import axios from 'axios';
import { useNotification } from '../../../components/Notification/Notification';



const ShellGame = ({curMoney, ParentUpdate, ballIco="", cupIco="", title="Игра в наперстки"}) => {

  axios.defaults.withCredentials = true;
  const showNotification = useNotification();

  const ballInitialPosition = Math.floor(Math.random() * 3);


  const [ballPosition, setBallPosition] = useState(ballInitialPosition);
  const [shuffling, setShuffling] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [cupsIsUp, setCupsIsUp] = useState(true);
  const [moneyCount, setMoneyCount] = useState("");
  const controlsCup1 = useAnimation();
  const controlsCup2 = useAnimation();
  const controlsCup3 = useAnimation();
  const controlsBall = useAnimation();
  const containerRef = useRef(null);
  const [isGame, setIsGame] = useState(false);


  useEffect(() => {
      cupsUp();
      setIsChecked(true);
  }, []);

  async function cupsUp()
  {
    controlsCup1.start({
      y:-50,
      // transition: {duration: 2},
    });
    controlsCup2.start({
      y:-50,
      // transition: {duration: 2},
    });
    await controlsCup3.start({
      y:-50,
      // transition: {duration: 2},
    });
    controlsBall.start({
      // transition: {duration: },
      opacity:1,
      y:70,
    });
  }

  async function cupsDown() {
    controlsCup1.start({ y: 0 });
    controlsCup2.start({ y: 0 });
    await controlsCup3.start({ y: 0 });
    controlsBall.start({ y: 70 });
}


  const handleCupClick = async (cupIndex) => {
    if (!shuffling && !isChecked) {
      const bet = (parseInt(moneyCount.replace(/\s/g, '')));
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/games/shellgame');
        setBallPosition(response.data["0"]);
  
        if (cupIndex === response.data["0"]) {
          // alert('win!');
          console.log("win")
          sendResultToServer("win");
          showNotification("Вы выиграли "+bet*2+"✯", 'green')
        } else {
          // alert('К сожалению, вы не угадали. Попробуйте еще раз.');
          console.log("lose")
          sendResultToServer("lose");
          showNotification("Повезет в следующий раз", 'orange')
        }
      } catch (error) {
        // Обработка ошибки
        console.error('Ошибка при  Пополнении/Выводе:', error);
      }

      setIsGame(false);
      setIsChecked(true);
      // setCupsIsUp(true);
      await cupsUp()
      setCupsIsUp(true);

    }
  };


  async function sendResultToServer(result)
  {
    console.log(moneyCount)
    const bet = (parseInt(moneyCount.replace(/\s/g, '')));
    axios.patch('http://127.0.0.1:8000/api/games/shellgame/result', {result, bet},  axios.defaults.withCredentials = true)
    .then(response => {
      // Обработка успешного обновления
      console.log('Данные обновлены успешно');
      ParentUpdate();
      // window.location.reload();
    })
    .catch(error => {
      // Обработка ошибки
      console.error('Ошибка при обновлении данных:', error);
    });
  }

  const checkMoney = (bet) =>
  {
    if (curMoney >= (parseInt(bet.replace(/\s/g, ''))))
    {
      setIsGame(true);
      handleShuffle();
    }
    else showNotification("Недостаточно средств", 'red');
  }


  const handleShuffle = async () => {



    setShuffling(true);
    setBallPosition(4);
    setIsChecked(false);
    setCupsIsUp(false);
    await cupsDown()

    controlsCup1.start({
      x: ['193%', '0%', '193%', '0%', '193%', '0%', '193%', '0%', '193%', '0%'],
      transition: {duration: 2},
    });

    
    controlsCup2.start({
      x: ['193%', '0%', '-193%', '0%', '193%', '0%', '-193%', '0%'],
      transition: {duration: 2},
    });

    // controlsCup3.start({
    //   x: ['-193%', '0%', '-193%', '0%', '-193%', '0%', '-193%', '0%', '-193%', '0%'],
    //   transition: {duration: 2},
    // });

    await controlsCup3.start({
      x: ['-193%', '0%', '-193%', '0%', '-193%', '0%', '-193%', '0%', '-193%', '0%'],
      transition: {duration: 2},
    });

    setShuffling(false);
  };

  const formatMoneyInput = (value) => {
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    setMoneyCount(value);
  };



  return (  

    <GamePage>
    <div id="ShellGame">
      <h1>{title}</h1>
      <div id="cups-container" ref={containerRef}>

          <motion.div
            className={`cup`}
            animate = {controlsCup1}
            onClick={() => handleCupClick(0)}
            // initial={cupsUp}
          >{cupIco}{ballPosition == 0 && !shuffling && <motion.div className="ball" animate={controlsBall}  initial={{opacity:0}}>{ballIco}</motion.div>}
          </motion.div>

          <motion.div
            className={`cup`}
            animate = {controlsCup2}
            onClick={() => handleCupClick(1)}
          >{cupIco}{ballPosition == 1 && !shuffling && <motion.div className="ball" animate={controlsBall}  initial={{opacity:0}}>{ballIco}</motion.div>}
          </motion.div>

          <motion.div
            className={`cup`}
            animate = {controlsCup3}
            onClick={() => handleCupClick(2)}
          >{cupIco}{ballPosition == 2 && !shuffling && <motion.div className="ball" animate={controlsBall}  initial={{opacity:0}}>{ballIco}</motion.div>}
          </motion.div>

      </div>
      <div id="shell_game_money">
        <input
          value={moneyCount}
          id="shell_game_money_input"
          placeholder="1 000 000"
          onChange={(e) => formatMoneyInput(e.target.value)}
          disabled={shuffling}
        />
        <span>✯</span>
        <button onClick={() => checkMoney(moneyCount)} disabled={shuffling||moneyCount==""|| isGame}
          title={(shuffling ? 'Перемешивание' : '') ||
          (isGame ? 'Завершите дейстующую игру' : '')||
          (moneyCount=="" ? 'Внесите ставку' : 'Сделать ставку')}
        >
          Играть
        </button>
      </div>
    </div>
    </GamePage>
  );
};

export default ShellGame;

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import axios from 'axios';
import './SlotsGameStyles.css';
import GamePage from '../../GamePage/GamePage';
import seven_svg from '../../../images/svg-s/seven.svg';
import bar_svg from '../../../images/svg-s/bar.svg';
import diamond_svg from '../../../images/svg-s/diamond.svg';
import chip_svg from '../../../images/svg-s/chip.svg';
import cherry_svg from '../../../images/svg-s/cherry.svg';
import lemon_svg from '../../../images/svg-s/lemon.svg';
import watermelon_svg from '../../../images/svg-s/watermelon.svg';
import grape_svg from '../../../images/svg-s/grape.svg';
import apple_svg from '../../../images/svg-s/apple.svg';
import { useRef } from 'react';
import { useNotification } from '../../../components/Notification/Notification';

const slot_elements = [
  seven_svg, //0
  bar_svg,  //1
  diamond_svg,    //2
  chip_svg,   //3
  cherry_svg,   //4
  lemon_svg,   //5
  watermelon_svg, //6
  grape_svg,    //7
  apple_svg,    //8
];

const SlotsGame = ({curMoney, ParentUpdate, title="Слоты", slot_els = slot_elements}) => {
  axios.defaults.withCredentials = true;
  const [moneyCount, setMoneyCount] = useState("");
  const showNotification = useNotification();
  const [isGame, setIsGame] = useState(false);
  const [slotResults, setSlotResults] = useState([0, 0, 0]); // Исходные позиции слотов
  const [slotResults2, setSlotResults2] = useState([1, 1, 1]); // Исходные позиции слотов
  const controlsArray = [useAnimation(), useAnimation(), useAnimation()];
  const controlsArray2 = [useAnimation(), useAnimation(), useAnimation()];
  const refSlot0 = useRef();
  const refSlot1 = useRef();
  const refSlot2 = useRef();
  var resArray = [0, 0, 0];
  var res = -1;

  
  const refSlotsArray = [refSlot0, refSlot1, refSlot2];

  // Используйте useEffect для обновления значения slotResults после завершения анимации
  useEffect(() => {
    // Когда slotResults2 обновляется, синхронизируем его с slotResults
    const syncTimer = setTimeout(() => {
      setSlotResults(slotResults2);
    }, 99); // 500 миллисекунд (0.5 секунды)

    // Очищаем таймер, если компонент размонтирован или если slotResults2 изменяется
    return () => clearTimeout(syncTimer);
  }, [slotResults2]);
  

  const formatMoneyInput = (value) => {
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    setMoneyCount(value);
  };

  const animateSlot = async (controls, index, timeWork) => {
    for (let i = 0; i < timeWork; i++) {
      await controls.start({ y: [0, -250], transition: { duration: 0.1, ease: 'easeInOut' } });
    }
  };

  const animateSlot2 = async (controls, index, timeWork) => {
    for (let i = 0; i < timeWork; i++) {
      const newResult = Math.floor(Math.random() * slot_els.length);
      setSlotResults2((prevResults) => prevResults.map((prevResult, i) => (i === index ? newResult : prevResult)));
      await controls.start({ y: [250, 0], transition: { duration: 0.1, ease: 'linear' } });
    }

    const newResult2 = resArray[index];
    setSlotResults2((prevResults) => prevResults.map((prevResult, i) => (i === index ? newResult2 : prevResult)));
    await controls.start({ y: [250, 0], transition: { duration: 0.1, ease: 'easeInOut' } });

    if (index === 2) {
      setIsGame(false);
      // console.log(res);
      if (res != -1)
      {
        showNotification("Вы выиграли "+(10-res) * (parseInt(moneyCount.replace(/\s/g, ''))), "green");
      }
      else showNotification("Повезёт в другой раз", "orange");
      res = -1;
      ParentUpdate();
    }
  };
  
  

  const playSlots = async () => {
    if (curMoney >= (parseInt(moneyCount.replace(/\s/g, ''))))
    {
      setIsGame(true);
      resForServ();
  
      controlsArray.forEach((controls, index) => {
        animateSlot(controls, index, (index + 1) * 10);
      });
  
      controlsArray2.forEach((controls, index) => {
        animateSlot2(controls, index, (index + 1) * 10);
      });
    }
    else showNotification("Недостаточно средств", 'red');
  };

  const resForServ = () => {
    const bet = (parseInt(moneyCount.replace(/\s/g, '')));
    axios.patch('http://127.0.0.1:8000/api/games/slotsgame', {bet}, axios.defaults.withCredentials = true)
    .then(response => {
      resArray = response.data;
      if(resArray[0] == resArray[1] && resArray[0] == resArray[2]) {
        // console.log(resArray[0], resArray[1], resArray[2], "----");
        // console.log(resArray[0])
        res = resArray[0];
        // setCurWin(zalupa);
        // console.log(res, "--biba");
      } else {
        res = -1;
      }
      console.log(response.data);
    })
    .catch(error => {
      console.error('Ошибка при обновлении имени:', error);
    });
  }

  return (
    <GamePage>
      <div id='slotsgame'>

        <h1>{title}</h1>

        <div id="sg_game">

          <div id="sg_win_description_wrapper">
              <div id="sg_win_description">
                  <div className="sg_win_description_cols">
                      <p><img src={slot_els[0]} className="svgs" /><img src={slot_els[0]} className="svgs" /><img src={slot_els[0]} className="svgs" /> - ×10</p>
                      <p><img src={slot_els[1]} className="svgs" /><img src={slot_els[1]} className="svgs" /><img src={slot_els[1]} className="svgs" /> - ×9</p>
                      <p><img src={slot_els[2]} className="svgs" /><img src={slot_els[2]} className="svgs" /><img src={slot_els[2]} className="svgs" /> - ×8</p>
                  </div>
                  <div className="sg_win_description_cols">
                      <p><img src={slot_els[3]} className="svgs" /><img src={slot_els[3]} className="svgs" /><img src={slot_els[3]} className="svgs" /> - ×7</p>
                      <p><img src={slot_els[4]} className="svgs" /><img src={slot_els[4]} className="svgs" /><img src={slot_els[4]} className="svgs" /> - ×6</p>
                      <p><img src={slot_els[5]} className="svgs" /><img src={slot_els[5]} className="svgs" /><img src={slot_els[5]} className="svgs" /> - ×5</p>
                  </div>
                  <div className="sg_win_description_cols">
                      <p><img src={slot_els[6]} className="svgs" /><img src={slot_els[6]} className="svgs" /><img src={slot_els[6]} className="svgs" /> - ×4</p>
                      <p><img src={slot_els[7]} className="svgs" /><img src={slot_els[7]} className="svgs" /><img src={slot_els[7]} className="svgs" /> - ×3</p>
                      <p><img src={slot_els[8]} className="svgs" /><img src={slot_els[8]} className="svgs" /><img src={slot_els[8]} className="svgs" /> - ×2</p>
                  </div>
              </div>
          </div>

          <div id="slots_wrapper">
          <div id="slots">
        {refSlotsArray.map((refSlot, index) => (
          <motion.div key={index} className="slot" id={`slot${index}`}>
            <motion.img
              ref={refSlot}
              src={slot_els[slotResults[index]]}
              alt={`slot${index}`}
              className='slot_img'
              animate={controlsArray[index]}
            />
          </motion.div>
        ))}
      </div>

            <div id="slots2">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index+3}
                  className="slot"
                  id={`slot2${index}`}
                  // animate={controlsArray2[index]}
                >
                  <motion.img 
                  src={slot_els[slotResults2[index]]} 
                  alt={`slot${index}`} 
                  className='slot_img' animate={controlsArray2[index]}/>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div id="guessing_game_money">
          <input
            value={moneyCount}
            id="guessing_game_input_money"
            placeholder="1 000 000"
            onChange={(e) => formatMoneyInput(e.target.value)}
          />
          <span>✯</span>
          <button onClick={playSlots} disabled={isGame| moneyCount==""}>Играть</button>
        </div>
      </div>
    </GamePage>
  );
};

export default SlotsGame;
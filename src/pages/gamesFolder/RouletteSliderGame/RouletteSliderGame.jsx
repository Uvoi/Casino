import { useState, useEffect } from 'react';
import RoulettePro from 'react-roulette-pro';
import axios from 'axios';
import 'react-roulette-pro/dist/index.css';
import './RouletteSliderGameStyles.css'
import GamePage from '../../GamePage/GamePage';
import { useNotification } from '../../../components/Notification/Notification';

import chip5 from '../../../images/chips/chip5.svg'
import chip10 from '../../../images/chips/chip10.svg'
import chip25 from '../../../images/chips/chip25.svg'
import chip100 from '../../../images/chips/chip100.svg'
import chip500 from '../../../images/chips/chip500.svg'
import chip1000 from '../../../images/chips/chip1000.png'
import chip5000 from '../../../images/chips/chip5000.png'
import chip10000 from '../../../images/chips/chip10000.png'
import chip50000 from '../../../images/chips/chip50000.png'
import chip100000 from '../../../images/chips/chip100000.png'
import chip2x from '../../../images/chips/x2.svg'
import chip3x from '../../../images/chips/x3.svg'
import chip5x from '../../../images/chips/x5.svg'



// const prizes = [
//     {image: seven_svg}, //0
//     {image: bar_svg},  //1
//     {image: diamond_svg},    //2
//     {image: chip_svg},   //3
//     {image: cherry_svg},   //4
//     {image: lemon_svg},   //5
//     {image: watermelon_svg}, //6
//     {image: grape_svg},    //7
//     {image: apple_svg},    //8
//   ];

const prizes100 = [
  {image: chip5},
  {image: chip10},
  {image: chip25},
  {image: chip100}, 
  {image: chip500}, 
  {image: chip2x}, 
  {image: chip3x},  
  {image: chip5x},  
]

const prizes500 = [
  {image: chip25},
  {image: chip100},
  {image: chip500},
  {image: chip1000},
  {image: chip5000},
  {image: chip2x},
  {image: chip3x},
  {image: chip5x},
]

const prizes1000 = [
  {image: chip100},
  {image: chip500},
  {image: chip1000},
  {image: chip5000},
  {image: chip10000},
  {image: chip2x},
  {image: chip3x},
  {image: chip5x},
]

const prizes5000 = [
  {image: chip500},
  {image: chip1000},
  {image: chip5000},
  {image: chip10000},
  {image: chip50000},
  {image: chip2x},
  {image: chip3x},
  {image: chip5x},
]

const prizes20000 = [
  {image: chip1000},
  {image: chip5000},
  {image: chip10000},
  {image: chip50000},
  {image: chip100000},
  {image: chip2x},
  {image: chip3x},
  {image: chip5x},
]

 

 
 


const RouletteSliderGame = ({curMoney, ParentUpdate, title="Горизонатльная рулетка", bntStyle}) => {
  const [start, setStart] = useState(false);
  const [isGame, setIsGame] = useState(false);
  const [btnIndex, setBtnIndex] = useState(0);
  const [bets, setBets] = useState(0);
  const [prizs, setPrizs] = useState(prizes20000);
  const [winIndex, setWinIndex] = useState(prizs.length * 4);
  const showNotification = useNotification();




  useEffect(() => {
    prizeList = reproducedPrizeList.map((prize) => ({
      ...prize,
      id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : generateId(),
    }));
    reproducedPrizeList = [
      ...prizs,
      ...reproductionArray(prizs, prizs.length * 3),
      ...prizs,
      ...reproductionArray(prizs, prizs.length),
    ];
    // console.log(reproducedPrizeList)
      
      
    // prizeList = reproducedPrizeList.map((prize) => ({
    //   ...prize,
    //   id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : generateId(),
    // }));

  }, [prizs]);

  // var prizeIndex = prizs.length * 4 + 0;


  const getResultForServ = async() =>
  {
    axios.get('http://127.0.0.1:8000/api/games/rouletteslidergame')
    .then(response => {
      // Обработка успешного обновления
      console.log("response data:",response.data);
      setWinIndex(prizs.length * 4 + response.data[0]);
      console.log("prize index:",winIndex)

      // ParentUpdate();
      // if (result == "win"){showNotification("Вы выиграли "+Math.ceil(bet*multipliers[row])+"✯", 'green')}
      // setIsGame(false);
      definitionPrizeList(btnIndex);
    })
    .catch(error => {
      // Обработка ошибки
      console.error('Ошибка при обновлении данных:', error);
    });
  }


  const setResultToServer = (bet = bets) =>
  {
    axios.patch('http://127.0.0.1:8000/api/games/rouletteslidergame/result', {bet},  axios.defaults.withCredentials = true)
    .then(response => {
      // Обработка успешного обновления
      console.log('Данные обновлены успешно');
      ParentUpdate();
      if (response.data>=0){showNotification("Вы выиграли "+response.data+"✯", 'green')}
      else showNotification("Повезет в следующий раз", 'orange')
      // setIsGame(false);
    })
    .catch(error => {
      // Обработка ошибки
      console.error('Ошибка при обновлении данных:', error);
    });
  }


  const definitionPrizeList = (index) =>
  {
    // console.log(index);
    switch(index) {
      case 1: setPrizs(prizes100); break;
      case 2: setPrizs(prizes500); break;
      case 3: setPrizs(prizes1000); break;
      case 4: setPrizs(prizes5000); break;
      case 5: setPrizs(prizes20000); break;
    }
    // if (index == 1)
    // {
    //   prizes = prizes100
    // }
    // console.log(prizs);
    handleStart()
  }



const reproductionArray = (array = [], length = 0) => [
  ...Array(length)
    .fill('_')
    .map(() => array[Math.floor(Math.random() * array.length)]),
];
  
var reproducedPrizeList = [
  ...prizs,
  ...reproductionArray(prizs, prizs.length * 3),
  ...prizs,
  ...reproductionArray(prizs, prizs.length),
];
  
const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`;
  
var prizeList = reproducedPrizeList.map((prize) => ({
  ...prize,
  id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : generateId(),
}));


 
 
  const handleStart = async() => {
    setStart(true);
  };
 
  const handlePrizeDefined = () => {
    setResultToServer(bets);
    const timerId = setTimeout(() => {
      console.log('🥳 Prize defined! 🥳');
      setIsGame(false);
      setStart(false);
    }, 2000);
  
    return () => clearTimeout(timerId);  
  };
  


  const setBet = async(index, count) =>
  {
    
      setBtnIndex(index);
      setBets(count);
  }

  const play = async() => {


    if (curMoney >= (bets))
    {
      getResultForServ()
      setIsGame(true);
    }
    else showNotification("Недостаточно средств", 'red');
    // handleStart()
    
    // console.log(prizeIndex)
    // setPrizs(prizes100)
    // handleStart()
    // console.log(prizeIndex)
    // console.log(bets)
  };



 
  return (
    <GamePage>
        <div id="roulette_slider_game">
          <h1>{title}</h1>
            <div id="rsg_wrapper">
                <div id="rsg">
                    <RoulettePro
                        prizes={prizeList}
                        prizeIndex={winIndex}
                        start={start}
                        onPrizeDefined={handlePrizeDefined}
                    />
                </div>
            </div>

            <div id="rsg_bets">
              <div id="scrg_money">
                  <button className={bntStyle} onClick={()=>setBet(1, 100)} disabled={isGame | btnIndex==1}>100✯</button>
                  <button className={bntStyle} onClick={()=>setBet(2, 500)} disabled={isGame | btnIndex==2}>500✯</button>
                  <button className={bntStyle} onClick={()=>setBet(3, 1000)} disabled={isGame | btnIndex==3}>1 000✯</button>
                  <button className={bntStyle} onClick={()=>setBet(4, 5000)} disabled={isGame | btnIndex==4}>5 000✯</button>
                  <button className={bntStyle} onClick={()=>setBet(5, 20000)} disabled={isGame | btnIndex==5}>20 000✯</button>
              </div>
              <button  className={bntStyle} onClick={play} disabled={isGame | !btnIndex} id='rsg_playBtn'>
                  Играть
              </button>
            </div>

      </div>
      </GamePage>
  );
};
 
export default RouletteSliderGame;
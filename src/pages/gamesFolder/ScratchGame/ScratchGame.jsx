import React, {useState, useRef, useEffect,} from 'react';
import './ScratchGameStyles.css'
import {motion} from 'framer-motion';
import axios from 'axios';

import seven_svg from '../../../images/svg-s/seven.svg';
import bar_svg from '../../../images/svg-s/bar.svg';
import diamond_svg from '../../../images/svg-s/diamond.svg';
import chip_svg from '../../../images/svg-s/chip.svg';
import cherry_svg from '../../../images/svg-s/cherry.svg';
import lemon_svg from '../../../images/svg-s/lemon.svg';
import watermelon_svg from '../../../images/svg-s/watermelon.svg';
import grape_svg from '../../../images/svg-s/grape.svg';
import apple_svg from '../../../images/svg-s/apple.svg';

import GamePage from '../../GamePage/GamePage';
import { useNotification } from '../../../components/Notification/Notification';


const scratch_elements = [
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

const ScratchGame = ({curMoney, ParentUpdate})=>
{
    axios.defaults.withCredentials = true;
    const squareRefs = useRef(Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => React.createRef())));

    const showNotification = useNotification();
    const [isGame, setIsGame] = useState(false);
    const [gameResult, setGameResult] = useState(null); 
    const [openedEls, setOpenedEls] = useState(0); 
    const [isEnough, SetIsEnough] = useState(false);
    const [btnIndex, setBtnIndex] = useState(0); 
    const [bets, setBets] = useState(0);

    



    useEffect(() => {
        if (openedEls >= 3)
        {
            SetIsEnough(true);
            resToServ(bets);
            setIsGame(false);
        }
      }, [openedEls]);
  
    const cols = [
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
    ];
  
    const play = () => {
        setIsGame(true);
        clearSquares();
        setOpenedEls(0);
        SetIsEnough(false);
        createArrServ(btnIndex);
        console.log(bets)
      };

    const createArrServ = (masNumber) => 
    {
        axios.post('http://127.0.0.1:8000/api/games/scratchgame_new',{masNumber}, axios.defaults.withCredentials = true)
        .then(response => {
          console.log('Массив успешно создан на серваке');
        })
        .catch(error => {
          console.error('Ошибка при создании масива на серваке:', error);
        });
    }


    const resToServ = (bet) => 
    {
    axios
        .patch('http://127.0.0.1:8000/api/games/scratchgame/result', {bet}, axios.defaults.withCredentials = true)
        .then(response => {
        // Обработка успешного обновления
        console.log('Данные обновлены успешно');

        // Установка результата игры в состояние
        setGameResult(response.data[0]);
        if(response.data[1] < 0)
        {
          showNotification("Повезет в следующий раз", "orange")
        }
        else if (response.data[1] >= 0)
        {
          const win = response.data[1]+bets
          showNotification("Вы выиграли "+win+"✯", "green")
        }
        ParentUpdate()
        

        // setIsGame(false); // Возможно, вам нужно обновить другие состояния или выполнить другие действия
        })
        .catch(error => {
        // Обработка ошибки
        console.error('Ошибка при обновлении данных:', error);
        });
    }

    const elClickToServ = (row = 0, col = 0, index = openedEls) => {
        axios
          .post('http://127.0.0.1:8000/api/games/scratchgame', { row, col, index }, axios.defaults.withCredentials = true)
          .then(response => {
            console.log('сервак вернул', response.data);
            const imageIndex = response.data;
      
            setGameResult(prevResult => {
              const newResult = prevResult ? [...prevResult] : Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => null));
              newResult[row][col] = imageIndex;
              return newResult;
            });
          })
          .catch(error => {
            console.error('сервак ничего не вернул(', error);
          });
      };
      
    const accessSquare = (rowIndex, colIndex) => {
        elClickToServ(rowIndex, colIndex);
      
        const squareRef = squareRefs.current[rowIndex][colIndex];
        squareRef.current.classList.add("selected");
    
        setOpenedEls(openedEls + 1)
      };

 const renderSquareImage = (resultIndex) => {
    return resultIndex !== null ? scratch_elements[resultIndex] : null;
  };

  const clearSquares = () => {
    squareRefs.current.forEach(row => {
      row.forEach(squareRef => {
        const image = squareRef.current.querySelector('img');

        if (image) {
          image.src = null;
        }
  
        squareRef.current.classList.remove("selected");
      });
    });
  
    setGameResult(null);
  };
  


  const setBet = (index, count) =>
  {
      setBtnIndex(index);
      setBets(count);
  }

  
    return (
        <GamePage>
        <div id='scratchgame'>

          <h1 style={{color:"white", marginBottom: "50px"}}>Скретч</h1>

          <div id="scratchANDdescription">


          <div id="scratch_wrapper">
            <div id="scratch" style={{ opacity: (isEnough | !isGame) ? 0.75 : 1, pointerEvents: (isEnough | !isGame) ? 'none' : 'auto' }}>
              {cols.map((col, colIndex) => (
                <div key={`scrg_col${colIndex + 1}`} className="scratch_col">
                  {col.map((squareNumber, rowIndex) => {
                    const squareRef = squareRefs.current[rowIndex][colIndex];
                    const resultIndex = gameResult ? gameResult[rowIndex][colIndex] : null;
  
                    return (
                      <div
                        key={`scrg_square${rowIndex + 1}_${colIndex + 1}`}
                        className="scrg_square col"
                        onClick={() => accessSquare(rowIndex, colIndex)}
                        ref={squareRef}
                      >
                        {resultIndex !== null && <motion.img src={renderSquareImage(resultIndex)} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}}/>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div id="scrg_win_description">
                  <div className="scrg_win_description_cols">
                      <p><img src={scratch_elements[0]} className="svgs" /><img src={scratch_elements[0]} className="svgs" /><img src={scratch_elements[0]} className="svgs" /> -  ×3</p>
                      <p><img src={scratch_elements[3]} className="svgs" /><img src={scratch_elements[3]} className="svgs" /><img src={scratch_elements[3]} className="svgs" /> -  ×3</p>
                      <p><img src={scratch_elements[6]} className="svgs" /><img src={scratch_elements[6]} className="svgs" /><img src={scratch_elements[6]} className="svgs" /> -  ×3</p>
                  </div>
                  <div className="scrg_win_description_cols">
                      <p><img src={scratch_elements[1]} className="svgs" /><img src={scratch_elements[1]} className="svgs" /><img src={scratch_elements[1]} className="svgs" /> - ×5</p>
                      <p><img src={scratch_elements[4]} className="svgs" /><img src={scratch_elements[4]} className="svgs" /><img src={scratch_elements[4]} className="svgs" /> - ×5</p>
                      <p><img src={scratch_elements[7]} className="svgs" /><img src={scratch_elements[7]} className="svgs" /><img src={scratch_elements[7]} className="svgs" /> - ×5</p>
                  </div>
                  <div className="scrg_win_description_cols">
                      <p><img src={scratch_elements[2]} className="svgs" /><img src={scratch_elements[2]} className="svgs" /><img src={scratch_elements[2]} className="svgs" /> - ×10</p>
                      <p><img src={scratch_elements[5]} className="svgs" /><img src={scratch_elements[5]} className="svgs" /><img src={scratch_elements[5]} className="svgs" /> - ×10</p>
                      <p><img src={scratch_elements[8]} className="svgs" /><img src={scratch_elements[8]} className="svgs" /><img src={scratch_elements[8]} className="svgs" /> - ×10</p>
                  </div>
              </div>


          </div>



          <div id="scrg_money">

            <button onClick={()=>setBet(1, 100)} disabled={isGame | btnIndex==1}>100✯</button>
            <button onClick={()=>setBet(2, 300)} disabled={isGame | btnIndex==2}>300✯</button>
            <button onClick={()=>setBet(3, 500)} disabled={isGame | btnIndex==3}>500✯</button>
            <button onClick={()=>setBet(4, 1000)} disabled={isGame | btnIndex==4}>1 000✯</button>
            <button onClick={()=>setBet(5, 5000)} disabled={isGame | btnIndex==5}>5 000✯</button>
            <button onClick={()=>setBet(6, 20000)} disabled={isGame | btnIndex==6}>20 000✯</button>


          </div>
            <button onClick={play} disabled={isGame | !btnIndex} id='srcg_playBtn'>
              Играть
            </button>
        </div>
      </GamePage>
    );
  };
  
  export default ScratchGame;
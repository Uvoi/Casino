import React, {useState, useRef, useEffect} from 'react';
import './ScratchGameStyles.css'
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

const ScratchGame = (props)=>
{
    const squareRefs = useRef(Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => React.createRef())));
    const [moneyCount, setMoneyCount] = useState("");
    const showNotification = useNotification();
    const [isGame, setIsGame] = useState(false);
    const [gameResult, setGameResult] = useState(null); // Состояние для хранения результата игры
    const [openedEls, setOpenedEls] = useState(0); // Состояние для хранения результата игры
    const [isEnough, SetIsEnough] = useState(false); // Состояние для хранения результата игры
    
    var enough = false;



    useEffect(() => {
        if (openedEls >= 3)
        {
            SetIsEnough(true);
        }
      }, [openedEls]);
  
    const cols = [
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
    ];
  
    const play = () => {
        clearSquares()
        setOpenedEls(0);
        SetIsEnough(false);
        createArrServ();
      };

    const createArrServ = () => 
    {
        axios.post('http://127.0.0.1:8000/api/games/scratchgame_new', axios.defaults.withCredentials = true)
        .then(response => {
          console.log('Массив успешно создан на серваке');
        })
        .catch(error => {
          console.error('Ошибка при создании масива на серваке:', error);
        });
    }


    const resToSert = () => 
    {
    axios
        .patch('http://127.0.0.1:8000/api/games/scratchgame/result', axios.defaults.withCredentials = true)
        .then(response => {
        // Обработка успешного обновления
        console.log('Данные обновлены успешно');

        // Установка результата игры в состояние
        setGameResult(response.data);

        // setIsGame(false); // Возможно, вам нужно обновить другие состояния или выполнить другие действия
        })
        .catch(error => {
        // Обработка ошибки
        console.error('Ошибка при обновлении данных:', error);
        });
    }

    const elClickToServ = (row = 0, col = 0) => {
        axios
          .post('http://127.0.0.1:8000/api/games/scratchgame', { row, col }, axios.defaults.withCredentials = true)
          .then(response => {
            console.log('сервак вернул', response.data);
            const imageIndex = response.data;
      
            // Обновляем состояние результатов игры
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
      

    
    
    
  

  
    const formatMoneyInput = (value) => {
      value = value.replace(/\D/g, "");
      value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
      setMoneyCount(value);
    };
  
    const accessSquare = (rowIndex, colIndex) => {
        // console.log(`Clicked on square at row ${rowIndex + 1}, col ${colIndex + 1}`);
        elClickToServ(rowIndex, colIndex);
      
        // Добавим класс для стилизации внутренней рамки
        const squareRef = squareRefs.current[rowIndex][colIndex];
        squareRef.current.classList.add("selected");

        setOpenedEls(openedEls + 1)
        // console.log(openedEls);
      };

 // Отдельная функция для отображения картинок в соответствии с результатами игры
 const renderSquareImage = (resultIndex) => {
    return resultIndex !== null ? scratch_elements[resultIndex] : null;
  };

  const clearSquares = () => {
    // Очищаем содержимое квадратов и убираем внутренние рамки
    squareRefs.current.forEach(row => {
      row.forEach(squareRef => {
        // Получаем изображение внутри квадрата
        const image = squareRef.current.querySelector('img');
  
        // Устанавливаем src в null, чтобы избежать ошибки при удалении
        if (image) {
          image.src = null;
        }
  
        // Убираем внутреннюю рамку
        squareRef.current.classList.remove("selected");
      });
    });
  
    // Очищаем состояние результатов игры
    setGameResult(null);
  };
  

  
    return (
        <GamePage>
        <div id='scratchgame'>
          <div id="scratch_wrapper">
            <div id="scratch" style={{ opacity: isEnough ? 0.5 : 1, pointerEvents: isEnough ? 'none' : 'auto' }}>
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
                        {resultIndex !== null && <img src={renderSquareImage(resultIndex)}/>}
                      </div>
                    );
                  })}
                </div>
              ))}
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
            <button onClick={play} disabled={isGame | moneyCount === ""}>
              Играть
            </button>
          </div>
          <button onClick={clearSquares}>
              очистить
            </button>
        </div>
      </GamePage>
    );
  };
  
  export default ScratchGame;
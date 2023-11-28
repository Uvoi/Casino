import React, {useState, useRef} from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNotification } from '../../../components/Notification/Notification';
import './GuessingGameStyles.css';
import GamePage from '../../GamePage/GamePage';

const GuessingGame = ({curMoney, ParentUpdate})=>
{
    axios.defaults.withCredentials = true;
    const showNotification = useNotification();

    const [moneyCount, setMoneyCount] = useState("");
    const [curRow, setCurRow] = useState(0);
    const [isGame, setIsGame] = useState(false);
    const [ggWin, setGgWin] = useState({winLine:0, bet:0})


    const rows = [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4],
        [1, 2, 3, 4],
        [1, 2, 3],
        [1, 2, 3],
        [1, 2],
      ];

      const multipliers =
      {
        3: 1.5,
        5: 2,
        6: 3
      }

      const ballRefs = useRef(Array.from({ length: rows.length }, () => Array.from({ length: 5 }, () => React.createRef())));




    const formatMoneyInput = (value) => {
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
        setMoneyCount(value);
    };

    const checkMoney = (bet) =>
    {
      if (curMoney >= (parseInt(bet.replace(/\s/g, ''))))
      {
        gameReset();
        handleStartGame();
      }
      else showNotification("Недостаточно средств", 'red');
    }


    const setAllBallsColor = (color) => {
        for (let i = 0; i < ballRefs.current.length; i++) {
          for (let j = 0; j < ballRefs.current[i].length; j++) {
            if (ballRefs.current[i][j].current) {
              ballRefs.current[i][j].current.style.backgroundColor = color;
              ballRefs.current[i][j].current.innerHTML = '';  
              ballRefs.current[i][j].current.style.border = 'none';
            }
          }
        }
    };

    const colorBallsInRow = (rowIndex, colors) => {
        if (ballRefs.current[rowIndex]) {
          ballRefs.current[rowIndex].forEach((ballRef, index) => {
            if (ballRef.current) {
              if (colors[index] === 1) {
                ballRef.current.style.backgroundColor = 'rgb(0, 200, 0)';
              } else {
                ballRef.current.style.backgroundColor = 'red';
                ballRef.current.innerHTML = '💣';     
              }
            }
          });
        }
    };




    const handleStartGame = async() => {
        await setIsGame(true);
    }

    const sendResultToServer = async(result) => {

        
        const bet = (parseInt(moneyCount.replace(/\s/g, '')));
        console.log(moneyCount);
        if (result == "win")
        {
            var mult = multipliers[curRow];
            document.getElementById("gg_row"+curRow).style.backgroundColor = "rgba(99, 255, 99, 0.479)";

        }
        else var mult = 0;

        axios.patch('http://127.0.0.1:8000/api/games/guessinggame/result', {result, bet, mult},  axios.defaults.withCredentials = true)
        .then(response => {
          // Обработка успешного обновления
          console.log('Данные обновлены успешно');
          ParentUpdate();
          if (result == "win"){showNotification("Вы выиграли "+Math.ceil(bet*multipliers[curRow])+"✯", 'green')}
          setIsGame(false);
          setCurRow(0);
        })
        .catch(error => {
          // Обработка ошибки
          console.error('Ошибка при обновлении данных:', error);
        });

    }


    const accesBall = async(raw, col) =>
    {
        if(raw==curRow+1 && isGame)
        {
            setCurRow(raw);
            handleBallClick(raw, col);
        }
        else if(raw<curRow+1 && isGame)
        {
            console.log(curRow)
            showNotification("Передвижение возможно только вперёд", 'red');
        }
        else if(raw>curRow+1 && isGame)
        {
            showNotification("Выбирайте путь последовательно", 'red');
        }
        else if(!isGame)
        {
            showNotification('Нажмите кнопку "Играть"', 'red');
        }
        else
        {
            showNotification("Неизвестная ошибка, попробуйте позже", 'red');
        }
    }


    const handleBallClick = async (raw, col) => {
        console.log("raw",raw,"col", col)


        const bet = (parseInt(moneyCount.replace(/\s/g, '')));
        axios.post('http://127.0.0.1:8000/api/games/guessinggame', {raw})
        .then(response => {
          console.log('Данные обновлены успешно');

            if (response.data[col-1] == "1") {
                console.log("win")
                // showNotification("удача", 'green')

                colorBallsInRow(raw-1, response.data)
                if (ballRefs.current[raw-1] && ballRefs.current[raw-1][col-1].current) {
                    ballRefs.current[raw-1][col-1].current.style.backgroundColor = 'green';
                    ballRefs.current[raw-1][col-1].current.style.border = '2px solid white';
                }

            } else {
                colorBallsInRow(raw-1, response.data)
                if (ballRefs.current[raw-1] && ballRefs.current[raw-1][col-1].current) {
                    ballRefs.current[raw-1][col-1].current.style.backgroundColor = 'rgb(200, 0, 0)';
                    ballRefs.current[raw-1][col-1].current.style.border = '2px solid white';
                
                    // Вставляем эмоджи 💣 внутрь дива
                    ballRefs.current[raw-1][col-1].current.innerHTML = '💣';                    
                }
                console.log("lose")
                sendResultToServer("lose");
                showNotification("Повезет в следующий раз", 'orange')
                setIsGame(false);
                setCurRow(0);
          }
        })
        .catch(error => {
          console.error('Ошибка в получении данных с сервера guessingGame:', error);
        });

    }   

    const gameReset = () =>
    {
        setAllBallsColor('rgba(211, 255, 251, 0.733)');
        setIsGame(false);
        setCurRow(0);
        const rows123 = ['gg_row1', 'gg_row2', 'gg_row3'];
        const rows45 = ['gg_row4', 'gg_row5'];
        const row6 = ['gg_row6'];
      
        rows123.forEach(id => {
          const element = document.getElementById(id);
          if (element) {
            element.style.backgroundColor = '#ff626240';
          }
        });
      
        rows45.forEach(id => {
          const element = document.getElementById(id);
          if (element) {
            element.style.backgroundColor = '#e562ff40';
          }
        });
      
        row6.forEach(id => {
          const element = document.getElementById(id);
          if (element) {
            element.style.backgroundColor = '#a3daff40';
          }
        });
    }



    return(
    <GamePage>
        <div id='guessing_game'>

            <h1>Минное поле</h1>


            <div id="guessing_game_game">
                {rows.map((row, rowIndex) => (
                    <div key={`gg_row${6 - rowIndex}`} id={`gg_row${6 - rowIndex}`}>
                    {row.map((ball, ballIndex) => (
                        <div
                        key={`gg_ball${6 - rowIndex}_${ballIndex + 1}`}
                        className="gg_ball"
                        onClick={() => accesBall(6 - rowIndex, ballIndex + 1)}
                        ref={ballRefs.current[5 - rowIndex][ballIndex]}
                        />
                    ))}
                    </div>
                ))}
                </div>

            <div id="guessing_game_money">
                <input
                    value={moneyCount}
                    id="guessing_game_input_money"
                    placeholder="1 000 000"
                    onChange={(e) => formatMoneyInput(e.target.value)}
                    // disabled={shuffling}
                />
                <span>✯</span>
                <button onClick={() => checkMoney(moneyCount)} disabled={moneyCount==""|isGame}>
                    {'Играть'}
                </button>
                <button onClick={() => sendResultToServer("win")} disabled={(moneyCount === "" || !(isGame && (curRow === 3 || curRow === 5 || curRow === 6)))}>
                    {'Забрать'}
                </button>
            </div>
        </div>
    </GamePage>
   );
};

export default GuessingGame;
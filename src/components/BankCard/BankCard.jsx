import React, { useState } from 'react';
import "./BankCardStyles.css"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNotification } from '../../components/Notification/Notification';


const BanckCard = ({ParentUpdate})=>
{

    

    const today = new Date();
    const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMaxYear = new Date('2050-01-01');
    const [selectedDate, setSelectedDate] = useState(null);
    const [fullName, setFullName] = useState("");
    const [cardNumber, setCardNumber] = useState('');
    const [cardCode, setCardCode] = useState("");
    const [moneyCount, setMoneyCount] = useState("");

    const showNotification = useNotification();


    const collectBankData = (operation) => {
        if (selectedDate && fullName && cardNumber && cardCode) {
          const formattedMonth = String(selectedDate.getMonth() + 1).padStart(2, '0');
          const formattedYear = String(selectedDate.getFullYear()).slice(-2);
          const cardData = {
            card_number: cardNumber,
            card_date: `${formattedMonth}/${formattedYear}`,
            card_user_name: fullName,
            card_code: cardCode,
            card_operation: operation,
            card_money_count: moneyCount
          };
          console.log(cardData);

          axios.post('http://127.0.0.1:8000/api/moneyUD', null, {params: cardData, headers: {'Content-Type': 'application/json',}})

          .then(response => {
            // Обработка успешного обновления
            console.log('Деньги успешно обновлены');
            ParentUpdate();
            // window.location.reload();
          })
          .catch(error => {
            // Обработка ошибки
            console.error('Ошибка при  Пополнении/Выводе:', error);
            showNotification(error.response.data.detail, 'red')
          });

          if (operation == "moneyUp")
          {
              showNotification("Счёт успешно пополнен", 'green')
          }
          else if (operation == "moneyDown")
          {
              showNotification("Деньги успешно выведены", 'green')
          }
          else showNotification("Произошла неизвестная ошибка", 'red')

        } else {
          console.error('Заполните все обязательные поля');
          showNotification("Заполните все поля", 'red')
        }


        setSelectedDate(null);
        setFullName("");
        setCardNumber('');
        setCardCode("");
        setMoneyCount("");
        

      };

    

    const handleInputChange = (event) => {
      let formattedValue = event.target.value.replace(/\s/g, ''); // Удаляем существующие пробелы
      formattedValue = formattedValue.match(/.{1,4}/g)?.join(' ') || ''; // Добавляем пробелы каждые 4 символа
  
      setCardNumber(formattedValue);
    };



    const formatMoneyInput = (value) => {
        // Убираем все пробелы из текущего значения
        value = value.replace(/\D/g, '');

        // Добавляем пробел каждые 3 символа справа
        value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    
        // Устанавливаем отформатированное значение
        setMoneyCount(value);
      };




      const isValidFullName = (name) => {
        // Проверка, что имя состоит только из букв и пробелов
        return /^[a-zA-Z\s]{3,}$/.test(name);
      };
      
      // Добавьте функции для проверки валидности номера карты и кода CVC (как в предыдущем ответе)
      const isValidCardNumber = (number) => {
        return /^\d{4} \d{4} \d{4} \d{4}$/.test(number);
      };
      
      const isValidCVC = (cvc) => {
        return /^\d{3,4}$/.test(cvc);
      };

    return(
        <div id="Bank_wrapper">
            {/* <form> */}
            <div id="Bank">
                <div className='BankCard'>
                    <div id="credit_card">
                        <div id='bank_name'><h3>Bank Name</h3></div>
                        <div id='card_chip'><div></div></div>
                        <div id="card_number">
                            <input 
                                value={cardNumber} 
                                type="text" 
                                pattern="^[0-9\s]{19,19}$" 
                                maxLength={19} 
                                onChange={handleInputChange}
                                placeholder='1234 1234 1234 1234'
                            />
                        </div>
                        <div id="card_date">            
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                showMonthYearPicker
                                dateFormat="MM/yy"
                                minDate={firstDayOfCurrentMonth}
                                maxDate={lastDayOfMaxYear}
                                placeholderText='00/00'
                            />
                        </div>
                        <div id="card_name">
                            <input type="text" 
                                pattern="^[a-zA-Z\s]{3,}$" 
                                placeholder='Name Surname' 
                                value={fullName} 
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className='BankCard'>
                    <div id="credit_card">
                        <div id="cardr_black_line"></div>
                        <div id="cardr_chip_n_cvc">
                            <div id='card_chip_reverse'>
                                <div id='globe_icon'><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/></svg></div>
                            </div>
                            <div id="cardr_cvc">
                                <input 
                                    type="text" 
                                    maxLength={4} 
                                    pattern="^[0-9]{3,4}$"  
                                    placeholder='123'
                                    value={cardCode}
                                    onChange={(e) => setCardCode(e.target.value)}
                                />
                            </div>
                            <span>cvc/cvv</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="BankMoneyIO">
                <div id="IOmoneyi">
                    <input
                        value={moneyCount}
                        id="bank_input_money"
                        placeholder="10 000 000"
                        onChange={(e) => formatMoneyInput(e.target.value)}
                    />
                    <span>₽</span>
                </div>
                <button onClick={collectBankData.bind(null, 'moneyUp')} 
                title={(!selectedDate || !isValidFullName(fullName) || !isValidCardNumber(cardNumber) || !isValidCVC(cardCode)||!moneyCount) ? 'Заполните все поля' : 'Пополнить баланс'}
                disabled={!selectedDate || !isValidFullName(fullName) || !isValidCardNumber(cardNumber) || !isValidCVC(cardCode)||!moneyCount}
                >Пополнить</button>
                <button onClick={collectBankData.bind(null, 'moneyDown')} 
                title={(!selectedDate || !isValidFullName(fullName) || !isValidCardNumber(cardNumber) || !isValidCVC(cardCode)||!moneyCount) ? 'Заполните все поля' : 'Вывести средства'} 
                disabled={!selectedDate || !isValidFullName(fullName) || !isValidCardNumber(cardNumber) || !isValidCVC(cardCode)||!moneyCount}
                >Вывести</button>
            </div>
        </div>
    );
};

export default BanckCard;
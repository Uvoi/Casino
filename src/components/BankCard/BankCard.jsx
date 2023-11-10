import React, { useState } from 'react';
import "./BankCardStyles.css"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const BanckCard = (props)=>
{
    const today = new Date();
    const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMaxYear = new Date('2050-01-01');
  
    const [selectedDate, setSelectedDate] = useState(null);




    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
      let formattedValue = event.target.value.replace(/\s/g, ''); // Удаляем существующие пробелы
      formattedValue = formattedValue.match(/.{1,4}/g)?.join(' ') || ''; // Добавляем пробелы каждые 4 символа
  
      setInputValue(formattedValue);
    };

    return(
        <div id='BankCard'>
            <div id="credit_card">
                <div id='bank_name'><h3>Bank Name</h3></div>
                <div id='card_chip'><div></div></div>
                <div id="card_number">
                    <input 
                        value={inputValue} 
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
                <div id="card_name"><input type="text" pattern="^[a-zA-Z\s]{3,}$" placeholder='Name Surname' /></div>
            </div>
        </div>
    );
};

export default BanckCard;
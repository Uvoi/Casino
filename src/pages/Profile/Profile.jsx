import React, { useState, useEffect } from 'react';
import profile_photo from '../../images/profile_photo.jpg';
import "./ProfileStyles.css";
import axios from 'axios';
import BanckCard from '../../components/BankCard/BankCard';
import BanckCardReverse from '../../components/BankCard/BankCardReverse';


const Profile = ({ User }) => {
    axios.defaults.withCredentials = true;
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setUserName(User.name);
  }, [User.name]);

  const handleSaveClick = () => {
    // Отправить PUT-запрос на сервер для обновления имени
    axios.put('http://127.0.0.1:8000/api/change_name?new_name=' + userName)

      .then(response => {
        // Обработка успешного обновления
        console.log('Имя обновлено успешно');
        window.location.reload();
      })
      .catch(error => {
        // Обработка ошибки
        console.error('Ошибка при обновлении имени:', error);
      });

    };


  return (
    <div id='Profile_wrapper'>
      <div id="ProfileP">
        <img id='profile_photo' src={profile_photo} alt="" />
        <div id="profile_data">
          <p>Электронная почта</p>
          <input type='text' id='profile_email' value={User.email} readOnly />
          <p>Имя</p>
          <input type="text" id='profile_name' value={userName} pattern="^[a-zA-Z0-9\s]{4,16}$" onChange={(e) => setUserName(e.target.value)} />
          <div id="profile_but_save">
            <button onClick={handleSaveClick}>Сохранить</button>
          </div>
        </div>
      </div>
      <hr/>
      <h2>Пополнение и вывод средств</h2>
      <div id="profile_cards">
        <BanckCard/>
        {/* <BanckCardReverse/> */}
      </div>
    </div>
  );
};

export default Profile;

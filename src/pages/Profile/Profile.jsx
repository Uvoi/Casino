import React, { useState, useEffect } from 'react';
import profile_photo from '../../images/profile_photo.jpg';
import "./ProfileStyles.css";
import axios from 'axios';

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


    // axios.get('http://127.0.0.1:8000/api/get_money')
    // .then(response => {
    //     console.log("aaaaababab")
    // })
    // .catch(error => {
    // console.log("ошибка блять!");
    // console.log(error);
    // });



  };

  return (
    <div>
      <div id="ProfileP">
        <img id='profile_photo' src={profile_photo} alt="" />
        <div id="profile_data">
          <p>Электронная почта</p>
          <input type='text' id='profile_email' value={User.email} readOnly />
          <p>Имя</p>
          <input type="text" id='profile_name' value={userName} pattern="^[a-zA-Z0-9]{4,16}$" onChange={(e) => setUserName(e.target.value)} />
          <div id="profile_but_save">
            <button onClick={handleSaveClick}>Сохранить</button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Profile;

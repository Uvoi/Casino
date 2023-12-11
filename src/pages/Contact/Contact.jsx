import React from 'react';
import './ContactStyles.css';
import telegramLogo from '../../images/telegram.png';
import vkLogo from '../../images/vk.png';
import { useNotification } from '../../components/Notification/Notification';

const Contact = (props) => {
  const showNotification = useNotification();

  const sendContact = () => {
    // Находим все инпуты и текстовые области
    const nameInput = document.getElementById('contact_name');
    const emailInput = document.getElementById('contact_email');
    const messageTextarea = document.getElementById('contact_message');

    // Проверяем, что все поля заполнены
    if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageTextarea.value.trim() === '') {
      showNotification("Заполните все поля", "red")
      return; // Останавливаем выполнение функции, если есть пустые поля
    }

    // Ваш код для отправки запроса на сервер и обработки успешного ответа

    console.log('Ваш запрос точно был отправлен на сервер, а не просто удален :)');
    showNotification('Сообщение отправлено', 'green');

    // Очищаем значения полей
    nameInput.value = '';
    emailInput.value = '';
    messageTextarea.value = '';
  };

  return (
    <div id='contactus'>
      <div id='contact'>
        <input type='text' id='contact_name' placeholder='Имя' />
        <input type='email' id='contact_email' placeholder='Эл. почта' />
        <textarea type='text' id='contact_message' placeholder='Текст обращения' />
        <div id='contact_btn'>
          <button onClick={sendContact}>Отправить</button>
        </div>
      </div>
      <div id='us'>
        <h1>Связь с нами</h1>
        <div id='us_imgs'>
          <a href='https://t.me/nxrmql' target='_blank' rel='noopener noreferrer'>
            <img src={telegramLogo} alt='' />
          </a>
          <span>&</span>
          <a href='https://vk.com/nxrmql' target='_blank' rel='noopener noreferrer'>
            <img src={vkLogo} alt='' />
          </a>
        </div>
        <p>+7 (330) 133-01-33</p>
        <p>+7 (27) 922-41-469</p>
      </div>
    </div>
  );
};

export default Contact;

import React, { useState } from "react";
import axios from "axios";
import "./LoginStyles.css";
import { motion } from "framer-motion";
import { useNotification } from "../../components/Notification/Notification";

function Login({ active, setActive, ParentUpdate }) {
  axios.defaults.withCredentials = true;
  const showNotification = useNotification();

  const [exeption, setExeption] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const apiUrl = "http://127.0.0.1:8000/api/create_session";

    const userDataWithUsername = {
      name: "user",
      email: email,
      password: password,
    };

    axios
      .post(apiUrl, userDataWithUsername, { withCredentials: true })
      .then((response) => {
        // console.log(response.data);
        setEmail("");
        setPassword("");
        setActive(false);
        showNotification("Успешная авторизация", 'green')
        // window.location.reload();
        ParentUpdate();

      })
      .catch((error) => {
        if (error.response.data.detail && error.response.status === 400) {
          setExeption(error.response.data.detail);
        } else {
          console.error("Ошибка при создании пользователя:", error);
          setExeption("Неизвестная ошибка: бэкендер умер. Попробуйте позже!");
        }
      });
  };

  return (
    <div id="login_page">
      <form onSubmit={handleLogin}>
      <h1>Вход/Регистрация</h1>
      <input
        id="input_login_1"
        type="email"
        placeholder="Электронная почта"
        // pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        id="input_login_2"
        type="password"
        placeholder="Пароль"
        pattern="^[a-zA-Zа-яА-Я0-9$%.&*]{6,24}$"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p id="exeption_login">{exeption}</p>
      <div id="but_login">
        <motion.button 
          type="submit"
          // initial = {{x: -100}}
          // whileHover={{ x: 0}}
          // transition={{
          //   duration: 5,
          // }}
        >Далее</motion.button>
      </div>
      <p id="login_info">
        - Если у вас уже есть аккаунт с указанной почтой и введенный пароль
        совпадает, вы автоматически войдете в свой аккаунт.
        <br />- Если указанная почта новая, то будет создан новый аккаунт с
        введенным паролем.
      </p>
      </form>
    </div>
  );
}

export default Login;

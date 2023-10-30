import React, { useState } from "react";
import axios from "axios";
import "./LoginStyles.css";

function Login({active, setActive}) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = "http://127.0.0.1:8000/api/create_session";

    const userDataWithUsername = {
      name: "user",
      email: userData.email,
      password: userData.password,
    };

    axios.post(apiUrl, userDataWithUsername, { withCredentials: true })
      .then((response) => {
        console.log("Пользователь создан:", response.data);
        setUserData({ email: "", password: "" });
        setActive(false)
        window.location.reload();
      })
      .catch((error) =>
        console.error("Ошибка при создании пользователя:", error)
      );
  };

  return (
    <div id="login_page">
      <h1>Вход/Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Электронная почта"
          value={userData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={userData.password}
          onChange={handleChange}
        />
        <div id="but_login">
          <button type="submit">Далее</button>
        </div>
        <p>
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

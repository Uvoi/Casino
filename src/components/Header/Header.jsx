import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./HeaderStyles.css"
import logo from './images/logo.png'
import user_logo from './images/usr_photo.png'
import Modal from '../Modal/Modal';
import Login from '../../pages/Login/Login';




const Header = ({User, Money, ParentUpdate })=>
{
    axios.defaults.withCredentials = true;

    const [money, setMoney] = useState(null);
    const [user, setUser] = useState({ name: "", email: "" });
    

    useEffect(() => {
        setUser(User);
        setMoney(Money);

        if ((user["name"] !== undefined) && (user["email"] !== undefined)) 
        {
            document.getElementById('login').style.display = 'none';
            document.getElementById('login').style.visibility = 'hidden';
            document.getElementById('user').style.display = 'block';
            document.getElementById('user').style.visibility = 'visible';
        }

        if ((user["name"] === "") && (user["email"] === "")) 
        {                           
            document.getElementById('user').style.display = 'none';
            document.getElementById('user').style.visibility = 'hidden';
            document.getElementById('login').style.display = 'inline-flex';
            document.getElementById('login').style.visibility = 'visible';
        }
      }, [Money, User, ParentUpdate]);


      const formatMoney = (value) => {
        if (value) {
            value = value.toString().replace(/\D/g, '');
            value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
        }
        return value;
    };



    const [modalActive, setModalActive] = useState(false)
    return(
        <div id="header" className="row">
        <div id="logo" className="col-lg-2">
            <img id="logo" src={logo} alt=""/>
        </div>
        <div id="carousel" className="col-lg-7">
            <ul id="menu">
                <li className="menu_el"><a href="/">Главная</a></li>
                <li className="menu_el"><a href="/games">Игры</a></li>
                <li className="menu_el"><a href="/promo">Промо</a></li>
                <li className="menu_el"><a href="/contact">Связь с нами</a></li>
            </ul>     
        </div>
        <div id="login" className="col-lg-3"><p className='bot_line' onClick={()=>setModalActive(true)}>вход/регистрация</p></div>
        <div id="user" className="col-lg-3">
            <div id="usr_text">
                <a href="/profile" id="usr_name_a"><p id="usr_name">{user["name"]}</p></a>
                <a href="" id="currency_a"><p id="money" className='bot_line'>{formatMoney(money)}<span id="currency"> ✯</span></p></a>
            </div>
            <a href="/profile"><img id="user" src={user_logo} alt=""/></a>
        </div> 
        <Modal active = {modalActive} setActive={setModalActive}>
            <Login active = {modalActive} setActive={setModalActive} ParentUpdate={ParentUpdate}/>
        </Modal>
    </div>
    );
};

export default Header;



import React, { useState } from 'react';
import "./HeaderStyles.css"
import logo from './images/logo.png'
import user_logo from './images/usr_photo.png'
import Modal from '../Modal/Modal';
import Login from '../../pages/Login/Login';




const Header = (props)=>
{
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
                <a href="" id="usr_name_a"><p id="usr_name">Иван Иванов</p></a>
                <a href="" id="currency_a"><p id="money" className='bot_line'>32.000 <span id="currency">✯</span></p></a>
            </div>
            <a href="/profile"><img id="user" src={user_logo} alt=""/></a>
        </div> 
        <Modal active = {modalActive} setActive={setModalActive}>
            <Login/>
        </Modal>
    </div>
    );
};

export default Header;




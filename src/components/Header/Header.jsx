import React from 'react';
import "./HeaderStyles.css"
import logo from './images/logo.png'
import user_logo from './images/usr_photo.png'


const Header = (props)=>
{
    return(
        <div id="header" className="row">
        <div id="logo" className="col-lg-2">
            <img id="logo" src={logo} alt=""/>
        </div>
        <div id="carousel" className="col-lg-7">
            <ul id="menu">
                <li className="menu_el"><a href="">Главная</a></li>
                <li className="menu_el"><a href="">Игры</a></li>
                <li className="menu_el"><a href="">Промо</a></li>
                <li className="menu_el"><a href="">Связь с нами</a></li>
            </ul>     
        </div>
        <div id="user" className="col-lg-3">
            <div id="usr_text">
                <a href="" id="usr_name_a"><p id="usr_name">Иван Иванов</p></a>
                <a href="" id="currency_a"><p id="money">32.000 <span id="currency">✯</span></p></a>
            </div>
            <a href=""><img id="user" src={user_logo} alt=""/></a>
        </div> 
    </div>
    );
};

export default Header;
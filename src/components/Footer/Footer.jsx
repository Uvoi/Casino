import React from 'react';
import './FooterStyles.css'
import visaLogo from './images/visa.png'
import mastercardLogo from './images/mastercard.png'
import bitcoinLogo from './images/bitcoin.png'
import ethereumLogo from './images/ethereum.png'
import qiwiLogo from './images/qiwi.png'
import paypalLogo from './images/paypal.png'
import logo from './images/logo.png'
import telegramLogo from './images/telegram.png'
import vkLogo from './images/vk.png'

const Footer = (props)=>
{
    return(
        <footer>

            <ul id="paying">
                <li className="paying_img"><img src={visaLogo} alt=""/></li>
                <li className="paying_img"><img src={mastercardLogo} alt=""/></li>
                <li className="paying_img"><img src={bitcoinLogo} alt=""/></li>
                <li className="paying_img"><img src={ethereumLogo} alt=""/></li>
                <li className="paying_img"><img src={qiwiLogo} alt=""/></li>
                <li className="paying_img"><img src={paypalLogo} alt=""/></li>
            </ul>

            <div className="foot">


                <img src={logo} alt="" id="logo_footer"/>

            <ul id="links">
                <li><h6>Обратная связь</h6></li>
                <li><a href=""><img src={telegramLogo} alt=""/></a></li>
                <li><a href=""><img src={vkLogo} alt=""/></a></li>
            </ul>

            <h6 id="about_us">О нас</h6>
            <span id="about_us_text">
                www.baobab.cas Owned and operated by Baobab Media inc (registration number 330101), address: Ratmanov Island, Chukotka district, Lenin Street 101 with a registered office located at Bolshoy Lyakhovsky Island, Bulunsky Ulus Municipal District, Republic of Sakha (Yakutia).  The terms and conditions in the part that relates to your participation in the Games are governed by the laws of Atlantis, and in the part that relates to the collection of payments and transactions are governed by the laws of Asia and Oceania, respectively. You acknowledge that, unless otherwise stated, the Games are organized in Atlantis and your participation in these Games takes place in the aforementioned territory. Any contractual relationship between you and us is considered concluded and executed by the parties in Atlantis, at the registered address. The Parties agree that any dispute, contradiction or claim arising out of or in connection with these Terms and Conditions, as well as their violation, termination or invalidity, are subject to the exclusive jurisdiction of the courts of Atlantis, with the exception of claims arising from payment transactions, which must be referred to the courts of Eastasia. or Oceania.
            </span>

            </div>

            <span id="rights">© Baobab. Все права защищены. </span>
        
        </footer>
    );
};

export default Footer;
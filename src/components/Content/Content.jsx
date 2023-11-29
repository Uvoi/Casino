import React from 'react';
import Games from '../../pages/Games/Games';
import Home from '../../pages/Home/Home';
import Profile from '../../pages/Profile/Profile';
import Promo from '../../pages/Promo/Promo';
import Contact from '../../pages/Contact/Contact'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import GamePage from '../../pages/GamePage/GamePage';
import ShellGame from '../../pages/games/ShellGame/ShellGame';
import GuessingGame from '../../pages/games/GuessingGame/GuessingGame';

const Content = ({User, Money, childUpdate})=>
{
    return(
        <div id='Main_content' style={{ marginTop: '70px' }}>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/games' element={<Games />} />
                    <Route exact path='/promo' element={<Promo />} />
                    <Route exact path='/contact' element={<Contact />} />
                    <Route exact path='/profile' element={<Profile User={User} ParentUpdate={childUpdate}/>} />
                    <Route exact path='/game' element={<GamePage />} />
                    <Route exact path='/games/shellgame' element={<ShellGame curMoney={Money} ParentUpdate={childUpdate} />} />
                    <Route exact path='/games/guessinggame' element={<GuessingGame curMoney={Money} ParentUpdate={childUpdate} />} />
                </Routes>
            </Router>
        </div>
    );
};

export default Content;
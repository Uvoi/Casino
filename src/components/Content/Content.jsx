import React from 'react';
import Games from '../../pages/Games/Games';
import Home from '../../pages/Home/Home';
import Profile from '../../pages/Profile/Profile';
import Promo from '../../pages/Promo/Promo';
import Contact from '../../pages/Contact/Contact'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const Content = (props)=>
{
    return(
        <div id='Main_content'>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/games' element={<Games />} />
                    <Route exact path='/prom o' element={<Promo />} />
                    <Route exact path='/contact' element={<Contact />} />
                    <Route exact path='/profile' element={<Profile />} />
                </Routes>
            </Router>
        </div>
    );
};

export default Content;
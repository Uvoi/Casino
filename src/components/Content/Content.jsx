import React, {useState} from 'react';
import Games from '../../pages/Games/Games';
import Home from '../../pages/Home/Home';
import Profile from '../../pages/Profile/Profile';
import Promo from '../../pages/Promo/Promo';
import Contact from '../../pages/Contact/Contact'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import GamePage from '../../pages/GamePage/GamePage';
import ShellGame from '../../pages/gamesFolder/ShellGame/ShellGame';
import GuessingGame from '../../pages/gamesFolder/GuessingGame/GuessingGame';
import SlotsGame from '../../pages/gamesFolder/SlotsGame/SlotsGame';
import RouletteGame from '../../pages/gamesFolder/RouletteGame/RouletteGame';
import ScratchGame from '../../pages/gamesFolder/ScratchGame/ScratchGame';
import RouletteSliderGame from '../../pages/gamesFolder/RouletteSliderGame/RouletteSliderGame';
import SlotsGameChristmas from '../../pages/gamesFolder/SlotsGame/themes/SlotsGameChristmas';
import ShellGameChristmas from '../../pages/gamesFolder/ShellGame/themes/ShellGameChristmas';
import ScratchGameChristmas from '../../pages/gamesFolder/ScratchGame/themes/ScratchGameChristmas';
import RouletteSliderGameChristmas from '../../pages/gamesFolder/RouletteSliderGame/theme/RouletteSliderGameChristmas';
import GuessingGameChristmas from '../../pages/gamesFolder/GuessingGame/theme/GuessingGameChristmas';
import Login from '../../pages/Login/Login';
import Modal from '../Modal/Modal';
import Null from '../Null'


const Content = ({User, Money, childUpdate})=>
{
    const [modalActive, setModalActive] = useState(false);

    const isUserAuthenticated = () => {
        if(User.name == undefined && User.email == undefined)
        {
            console.log(1)
            return false
            
        }
        else
        {
            console.log(2)
        return true
        }
      };

      const openModal = () => {
        setModalActive(true);
      };
    

    return(
        <div id='Main_content' style={{ marginTop: '10vh', marginBottom: '10vh' }}>
           <Modal active = {modalActive} setActive={setModalActive}>
                <Login active = {modalActive} setActive={setModalActive} ParentUpdate={childUpdate}/>
            </Modal>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/games' element={<Games />} />
                    <Route exact path='/promo' element={<Promo curMoney={Money} ParentUpdate={childUpdate}/>} />
                    <Route exact path='/contact' element={<Contact />} />
                    <Route exact path='' element={<Null />} />
                    <Route
                        exact path='/profile'
                        element={isUserAuthenticated() ? <Profile User={User} ParentUpdate={childUpdate} /> : <Null ParentUpdate={childUpdate} auth={true}/>}
                    />

                    <Route exact path='/game' element={<GamePage User={User} />} />
                    {/* <Route exact path='/games/shellgame' element={<ShellGame curMoney={Money} ParentUpdate={childUpdate} />} /> */}
                    <Route
                        exact path='/games/shellgame'
                        element={isUserAuthenticated() ? <ShellGame curMoney={Money} ParentUpdate={childUpdate}/> : <Null ParentUpdate={childUpdate} auth={true}/>}
                    />


                    <Route
                        exact path='/games/guessinggame'
                        element={isUserAuthenticated() ? <GuessingGame curMoney={Money} ParentUpdate={childUpdate}/> : <Null ParentUpdate={childUpdate} auth={true}/>}
                    />
                    
                    {/* <Route exact path='/games/guessinggame' element={<GuessingGame curMoney={Money} ParentUpdate={childUpdate} />} /> */}
                    <Route
                        exact path='/games/slotsgame'
                        element={isUserAuthenticated() ? <SlotsGame curMoney={Money} ParentUpdate={childUpdate}/> : <Null ParentUpdate={childUpdate} auth={true}/>}
                    />
                    {/* <Route exact path='/games/slotsgame' element={<SlotsGame curMoney={Money} ParentUpdate={childUpdate} />} /> */}
                    {/* <Route exact path='/games/roulettegame' element={<RouletteGame curMoney={Money} ParentUpdate={childUpdate} />} /> */}
                    <Route
                        exact path='/games/roulettegame'
                        element={isUserAuthenticated() ? <RouletteGame curMoney={Money} ParentUpdate={childUpdate}/> : <Null ParentUpdate={childUpdate} auth={true}/>}
                    />
                    {/* <Route exact path='/games/scratchgame' element={<ScratchGame curMoney={Money} ParentUpdate={childUpdate} />} /> */}
                    <Route
                        exact path='/games/scratchgame'
                        element={isUserAuthenticated() ? <ScratchGame curMoney={Money} ParentUpdate={childUpdate}/> : <Null ParentUpdate={childUpdate} auth={true}/>}
                    />
                    {/* <Route exact path='/games/rouletteslidergame' element={<RouletteSliderGame curMoney={Money} ParentUpdate={childUpdate} />} /> */}
                    <Route
                        exact path='/games/RouletteSliderGame'
                        element={isUserAuthenticated() ? <RouletteSliderGame curMoney={Money} ParentUpdate={childUpdate}/> : <Null ParentUpdate={childUpdate} auth={true}/>}
                    />
                    {/* <Route exact path='/games/SlotsGameChristmas' element={<SlotsGameChristmas curMoney={Money} ParentUpdate={childUpdate} />} /> */}
                    <Route
                        exact path='/games/SlotsGameChristmas'
                        element={isUserAuthenticated() ? <SlotsGameChristmas curMoney={Money} ParentUpdate={childUpdate}/> : <Null ParentUpdate={childUpdate} auth={true}/>}
                    />
                    {/* <Route exact path='/games/ShellGameChristmas' element={<ShellGameChristmas curMoney={Money} ParentUpdate={childUpdate} />} /> */}
                    <Route
                        exact path='/games/ShellGameChristmas'
                        element={isUserAuthenticated() ? <ShellGameChristmas curMoney={Money} ParentUpdate={childUpdate}/> : <Null ParentUpdate={childUpdate} auth={true}/>}
                    />
                    {/* <Route exact path='/games/ScratchGameChristmas' element={<ScratchGameChristmas curMoney={Money} ParentUpdate={childUpdate} />} /> */}
                    <Route
                        exact path='/games/ScratchGameChristmas'
                        element={isUserAuthenticated() ? <ScratchGameChristmas curMoney={Money} ParentUpdate={childUpdate}/> : <Null ParentUpdate={childUpdate} auth={true}/>}
                    />
                    {/* <Route exact path='/games/RouletteSliderGameChristmas' element={<RouletteSliderGameChristmas curMoney={Money} ParentUpdate={childUpdate} />} /> */}
                    <Route
                        exact path='/games/RouletteSliderGameChristmas'
                        element={isUserAuthenticated() ? <RouletteSliderGameChristmas curMoney={Money} ParentUpdate={childUpdate}/> : <Null ParentUpdate={childUpdate} auth={true}/>}
                    />
                    {/* <Route exact path='/games/GuessingGameChristmas' element={<GuessingGameChristmas curMoney={Money} ParentUpdate={childUpdate} />} /> */}
                    <Route
                        exact path='/games/GuessingGameChristmas'
                        element={isUserAuthenticated() ? <GuessingGameChristmas curMoney={Money} ParentUpdate={childUpdate}/> : <Null ParentUpdate={childUpdate} auth={true}/>}
                    />
                </Routes>
            </Router>
        </div>
    );
};

export default Content;
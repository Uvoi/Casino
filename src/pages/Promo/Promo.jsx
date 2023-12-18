import React from 'react';
import './PromoStyles.css';

import GamePreview from '../../components/GamePreview/GamePreview';
import GameList from '../../components/GamesList/GameList';
import christmas_slots from '../../images/games_themes/slots_game/christmas_slots.jpg';
import christmas_shell from '../../images/games_themes/shell_game/shell_game_christmas.jpg';
import christmas_scratch from '../../images/games_themes/scratch_game/scratch.jpg'
import roulettes from '../../images/games_themes/roulettes_game/roulettes.jpg'
import guessing_christmas from '../../images/games_themes/guessing_game/guessing.jpg'
import Snowfall from '../../components/Snowfall/Snowfall';
const Promo = ()=>
{
    


    return(
        <div id='promo' style={{marginTop:"120px"}}>
            <Snowfall/>
            <div id="promo_wrapper">
            <GameList title={"Новогодние игры"}>
                <GamePreview image = {christmas_slots} title={'Новогодние слоты'} link = {"/games/SlotsGameChristmas"}/>
                <GamePreview image = {christmas_shell} title={'Новогодние наперстки'} link = {"/games/ShellGameChristmas"}/>
                <GamePreview image = {christmas_scratch} title={'Новогодний скретч'} link = {"/games/ScratchGameChristmas"}/>
                <GamePreview image = {roulettes} title={'Н. горизонтальная рулетка'} link = {"/games/RouletteSliderGameChristmas"}/>
                <GamePreview image = {guessing_christmas} title={'Новогоднее минное поле'} link = {"/games/GuessingGameChristmas"}/>
            </GameList>
            </div>
            <p style={{color:"white", margin:"50px 0 -50px 125px", fontSize:"18px"}}>До конца зимы вас ждут новые <span style={{color:"blue"}}>
                Новогодние игры</span>. Шансы во всех новогодних играх были повышены на <span style={{color:"red", }}>50% ! </span> 
            Спешите сыграть, время ограничено!</p>
        </div>
    );
};

export default Promo;
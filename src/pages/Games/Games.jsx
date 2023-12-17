import React from 'react';
import './GamesStyles.css'
import GamePreview from '../../components/GamePreview/GamePreview';
import gameImage1 from './800x800nocrop.jpg'
import gameImage2 from './images.png'
import gameImage3 from './photo_2023-10-21_10-00-31.jpg'
import gameImage4 from './photo_2023-10-24_21-32-58.jpg'
import GameList from '../../components/GamesList/GameList';
import roulette from '../../images/roulette.jpeg'
import slots from '../../images/slots.jpg'
import shell from '../../images/shell.jpg'
import mine from '../../images/mine.jpg'
import scratch from '../../images/scratch.jpg'
import rouletteslider from '../../images/rouletteslider.png'
import christmas_slots from '../../images/games_themes/slots_game/christmas_slots.jpg';
import christmas_shell from '../../images/games_themes/shell_game/shell_game_christmas.jpg';
import christmas_scratch from '../../images/games_themes/scratch_game/scratch.jpg'
import roulettes from '../../images/games_themes/roulettes_game/roulettes.jpg'
import guessing_christmas from '../../images/games_themes/guessing_game/guessing.jpg'






const Games = (props) => {
    

    return (
        <div id="games-page">



            <GameList title={"Популярные"}>
                <GamePreview image = {shell} title={'Наперстки'} link = {"/games/shellgame"}/>
                <GamePreview image = {mine} title={'Минное поле'} link = {"/games/guessinggame"}/>
                <GamePreview image = {roulette} title={'Рулетка'} link = {"/games/roulettegame"}/>
                <GamePreview image = {slots} title={'Слоты'} link = {"/games/slotsgame"}/>
                <GamePreview image = {scratch} title={'Скретч'} link = {"/games/scratchgame"}/>
                <GamePreview image = {rouletteslider} title={'Горизонтальная рулетка'} link = {"/games/rouletteslidergame"}/>
                <GamePreview image = {christmas_slots} title={'Новогодние слоты'} link = {"/games/SlotsGameChristmas"}/>
                <GamePreview image = {christmas_shell} title={'Новогодние наперстки'} link = {"/games/ShellGameChristmas"}/>
            </GameList>


            <GameList title={"Новогодние"}>
                <GamePreview image = {christmas_slots} title={'Новогодние слоты'} link = {"/games/SlotsGameChristmas"}/>
                <GamePreview image = {christmas_shell} title={'Новогодние наперстки'} link = {"/games/ShellGameChristmas"}/>
                <GamePreview image = {christmas_scratch} title={'Новогодний скретч'} link = {"/games/ScratchGameChristmas"}/>
                <GamePreview image = {roulettes} title={'Н. горизонтальная рулетка'} link = {"/games/RouletteSliderGameChristmas"}/>
                <GamePreview image = {guessing_christmas} title={'Новогоднее минное поле'} link = {"/games/GuessingGameChristmas"}/>
            </GameList>


            <GameList title={"Удача"}>
                <GamePreview image = {mine} title={'Минное поле'} link = {"/games/guessinggame"}/>
                <GamePreview image = {roulette} title={'Рулетка'} link = {"/games/roulettegame"}/>
                <GamePreview image = {rouletteslider} title={'Горизонтальная рулетка'} link = {"/games/rouletteslidergame"}/>
                <GamePreview image = {scratch} title={'Скретч'} link = {"/games/scratchgame"}/>
                <GamePreview image = {christmas_slots} title={'Новогодние слоты'} link = {"/games/SlotsGameChristmas"}/>
                <GamePreview image = {christmas_scratch} title={'Новогодний скретч'} link = {"/games/ScratchGameChristmas"}/>   
                <GamePreview image = {roulettes} title={'Н. горизонтальная рулетка'} link = {"/games/RouletteSliderGameChristmas"}/>
                <GamePreview image = {guessing_christmas} title={'Новогоднее минное поле'} link = {"/games/GuessingGameChristmas"}/>
            </GameList>
            
            
                 
        </div>
    );
};

export default Games;
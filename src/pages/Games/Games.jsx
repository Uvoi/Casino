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
                <GamePreview image = {christmas_scratch} title={'Новогодний скретч'} link = {"/games/ScratchGameChristmas"}/>
                <GamePreview image = {gameImage2} title={'Игра 2'} link = {""}/>
                <GamePreview image = {gameImage3} title={'Игра 3'} link = {""}/>
                <GamePreview image = {gameImage4} title={'Игра 4'} link = {""}/>
                <GamePreview image = {gameImage1} title={'Игра 1'} link = {""}/>
                <GamePreview image = {gameImage2} title={'Игра 2'} link = {""}/>
                <GamePreview image = {gameImage3} title={'Игра 3'} link = {""}/>
                <GamePreview image = {gameImage4} title={'Игра 4'} link = {""}/>
                <GamePreview image = {gameImage1} title={'Наперстки'} link = {""}/>
                <GamePreview image = {gameImage2} title={'Игра 2'} link = {""}/>
                <GamePreview image = {gameImage3} title={'Игра 3'} link = {""}/>
                <GamePreview image = {gameImage4} title={'Игра 4'} link = {""}/>
                <GamePreview image = {gameImage1} title={'Игра 1'} link = {""}/>
                <GamePreview image = {gameImage2} title={'Игра 2'} link = {""}/>
                <GamePreview image = {gameImage3} title={'Игра 3'} link = {""}/>
                <GamePreview image = {gameImage4} title={'Игра 4'} link = {""}/>
                <GamePreview image = {gameImage1} title={'Наперстки'} link = {""}/>
                <GamePreview image = {gameImage2} title={'Игра 2'} link = {""}/>
                <GamePreview image = {gameImage3} title={'Игра 3'} link = {""}/>
                <GamePreview image = {gameImage4} title={'Игра 4'} link = {""}/>
                <GamePreview image = {gameImage1} title={'Игра 1'} link = {""}/>
                <GamePreview image = {gameImage2} title={'Игра 2'} link = {""}/>
                <GamePreview image = {gameImage3} title={'Игра 3'} link = {""}/>
                <GamePreview image = {gameImage4} title={'Игра 4'} link = {""}/>
                <GamePreview image = {gameImage1} title={'Наперстки'} link = {""}/>
                <GamePreview image = {gameImage2} title={'Игра 2'} link = {""}/>
                <GamePreview image = {gameImage3} title={'Игра 3'} link = {""}/>
                <GamePreview image = {gameImage4} title={'Игра 4'} link = {""}/>
                <GamePreview image = {gameImage1} title={'Игра 1'} link = {""}/>
                <GamePreview image = {gameImage2} title={'Игра 2'} link = {""}/>
                <GamePreview image = {gameImage3} title={'Игра 3'} link = {""}/>
                <GamePreview image = {gameImage4} title={'Игра 4'} link = {""}/>
                <GamePreview image = {gameImage1} title={'Наперстки'} link = {""}/>
                <GamePreview image = {gameImage2} title={'Игра 2'} link = {""}/>
                <GamePreview image = {gameImage3} title={'Игра 3'} link = {""}/>
                <GamePreview image = {gameImage4} title={'Игра 4'} link = {""}/>
                <GamePreview image = {gameImage1} title={'Игра 1'} link = {""}/>
                <GamePreview image = {gameImage2} title={'Игра 2'} link = {""}/>
                <GamePreview image = {gameImage3} title={'Игра 3'} link = {""}/>
                <GamePreview image = {gameImage4} title={'Игра 4'} link = {""}/>
            </GameList>

            
                 
        </div>
    );
};

export default Games;
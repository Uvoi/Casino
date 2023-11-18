import React from 'react';
import './GameListStyles.css'
// import Game_preview from '..Game_preview/Game_preview' 

const GameList = ({title, children})=>
{
    return(
        <div className='game_list'>
            <h3>{title}</h3>
            {/* <hr /> */}
            {children}
        </div>
    );
};

export default GameList;
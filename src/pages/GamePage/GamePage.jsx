import React from 'react';
import "./GamePageStyles.css"
const GamePage = ({children})=>
{
    return(
        <div id='game_page'>
            <div id="game">
                {children}
            </div>
        </div>
    );
};

export default GamePage;
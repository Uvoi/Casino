import React from 'react';
//import Game from './src/';
import './GamePreview.css';
const GamePreview = ({link, image, title})=>
{
    return (
        <div className="Game">
            <a href={link}>
                <img src={image} alt="" />
                <p>{title}</p></a>
        </div>
    );
};


export default GamePreview;
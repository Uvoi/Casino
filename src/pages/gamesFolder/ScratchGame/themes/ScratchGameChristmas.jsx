import React from 'react';
import './ScratchGameChristmasStyles.css'

import santa from '../../../../images/games_themes/slots_game/santa.svg';
import penguin from '../../../../images/games_themes/slots_game/penguin.svg';
import christmas_tree from '../../../../images/games_themes/slots_game/christmas_tree.svg';
import snow_maiden from '../../../../images/games_themes/slots_game/snow_maiden.svg';
import snowflake from '../../../../images/games_themes/slots_game/snowflake.svg';
import gift from '../../../../images/games_themes/slots_game/gift.svg';
import kremlin from '../../../../images/games_themes/slots_game/kremlin.svg';
import alcoholic from '../../../../images/games_themes/slots_game/alcoholic.svg';
import red_caviar from '../../../../images/games_themes/slots_game/red_caviar.svg';
import Snowfall from '../../../../components/Snowfall/Snowfall';
import ScratchGame from '../ScratchGame';

const scratch_elements = [
    santa, //0
    snow_maiden,  //1
    christmas_tree,    //2
    penguin,   //3
    kremlin,   //4
    alcoholic,   //5
    red_caviar, //6
    gift,    //7
    snowflake,    //8
];

const ScratchGameChristmas = ({curMoney, ParentUpdate})=>
{
    return(
        <div id='scratchgamechristmas'>
            <Snowfall/>
            {/* <img src={santa} alt="" /> */}
            <ScratchGame curMoney={curMoney} ParentUpdate={ParentUpdate} scratch_els={scratch_elements} bntStyle="nyBtn" title='Новогодний скретч'></ScratchGame>
        </div>
   );
};

export default ScratchGameChristmas;
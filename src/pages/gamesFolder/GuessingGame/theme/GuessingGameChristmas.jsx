import React from 'react';
import './GuessingGameChristmasStyles.css'
import GuessingGame from '../GuessingGame';
import Snowfall from '../../../../components/Snowfall/Snowfall';

const GuessingGameChristmas = ({curMoney, ParentUpdate})=>
{
    return(
        <div>
            <Snowfall/>
            <GuessingGame curMoney={curMoney} ParentUpdate={ParentUpdate} bntStyle="nyBtn" bombIco="❄️" title="Новогоднее минное поле"/>
        </div>
   );
};

export default GuessingGameChristmas;
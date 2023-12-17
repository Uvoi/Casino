import React from 'react';
import './RouletteSliderGameChristmasStyles.css'
import RouletteSliderGame from '../RouletteSliderGame';
import Snowfall from '../../../../components/Snowfall/Snowfall';

const RouletteSliderGameChristmas = ({curMoney, ParentUpdate})=>
{
    return(
        <div id='RouletteSliderGameChristmas'>
            <Snowfall/>
            <RouletteSliderGame curMoney={curMoney} ParentUpdate={ParentUpdate} title="Новогодняя горизонтальная рулетка" bntStyle="nyBtn"/>
        </div>
   );
};

export default RouletteSliderGameChristmas;
import React from 'react';
import ShellGame from '../ShellGame'
import './ShellGameChristmasStyles.css'
import Snowfall from '../../../../components/Snowfall/Snowfall';


const ShellGameChristmas = ({curMoney, ParentUpdate})=>
{
    return(
        <div id='ShellGameChristmas'>
            <Snowfall/>
            <ShellGame curMoney={curMoney} ParentUpdate={ParentUpdate} ballIco="❄️" cupIco="🎄" title='Новогодние наперстки' bntStyle="nyBtn"></ShellGame>
        </div>
   );
};

export default ShellGameChristmas;


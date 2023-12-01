import React, {useState} from 'react';
import './SlotsGameStyles.css'
import GamePage from '../../GamePage/GamePage';
import seven_svg from '../../../images/svg-s/seven.svg';
import bar_svg from '../../../images/svg-s/bar.svg';
import diamond_svg from '../../../images/svg-s/diamond.svg';
import chip_svg from '../../../images/svg-s/chip.svg';
import cherry_svg from '../../../images/svg-s/cherry.svg';
import lemon_svg from '../../../images/svg-s/lemon.svg';
import watermelon_svg from '../../../images/svg-s/watermelon.svg';
import grape_svg from '../../../images/svg-s/grape.svg';
import apple_svg from '../../../images/svg-s/apple.svg';

const slot_elemets = [seven_svg, bar_svg, diamond_svg, chip_svg, cherry_svg, lemon_svg, watermelon_svg, grape_svg, apple_svg]

const SlotsGame = (props)=>
{
    const [moneyCount, setMoneyCount] = useState("");

    const formatMoneyInput = (value) => {
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
        setMoneyCount(value);
    };

    

    return(
        <GamePage>
            <div id='slotsgame'>
                <div id="sg_game">
                    <div id="sg_win_description_wrapper">
                        <div id="sg_win_description">
                            <div className="sg_win_description_cols">
                                <p><img src={slot_elemets[0]} className="svgs" /><img src={slot_elemets[0]} className="svgs" /><img src={slot_elemets[0]} className="svgs" /> - ×10</p>
                                <p><img src={slot_elemets[1]} className="svgs" /><img src={slot_elemets[1]} className="svgs" /><img src={slot_elemets[1]} className="svgs" /> - ×9</p>
                                <p><img src={slot_elemets[2]} className="svgs" /><img src={slot_elemets[2]} className="svgs" /><img src={slot_elemets[2]} className="svgs" /> - ×8</p>
                            </div>
                            <div className="sg_win_description_cols">
                                <p><img src={slot_elemets[3]} className="svgs" /><img src={slot_elemets[3]} className="svgs" /><img src={slot_elemets[3]} className="svgs" /> - ×7</p>
                                <p><img src={slot_elemets[4]} className="svgs" /><img src={slot_elemets[4]} className="svgs" /><img src={slot_elemets[4]} className="svgs" /> - ×6</p>
                                <p><img src={slot_elemets[5]} className="svgs" /><img src={slot_elemets[5]} className="svgs" /><img src={slot_elemets[5]} className="svgs" /> - ×5</p>
                            </div>
                            <div className="sg_win_description_cols">
                                <p><img src={slot_elemets[6]} className="svgs" /><img src={slot_elemets[6]} className="svgs" /><img src={slot_elemets[6]} className="svgs" /> - ×4</p>
                                <p><img src={slot_elemets[7]} className="svgs" /><img src={slot_elemets[7]} className="svgs" /><img src={slot_elemets[7]} className="svgs" /> - ×3</p>
                                <p><img src={slot_elemets[8]} className="svgs" /><img src={slot_elemets[8]} className="svgs" /><img src={slot_elemets[8]} className="svgs" /> - ×2</p>
                            </div>
                        </div>
                    </div>

                    <div id="slots_wrapper">
                        <div id="slots">
                            <div className="slot" id="slot0"></div>
                            <div className="slot" id="slot1"></div>
                            <div className="slot" id="slot2"></div>
                        </div>
                    </div>

                </div>

                <div id="guessing_game_money">
                <input
                    value={moneyCount}
                    id="guessing_game_input_money"
                    placeholder="1 000 000"
                    onChange={(e) => formatMoneyInput(e.target.value)}
                    // disabled={shuffling}
                />
                <span>✯</span>
                <button>Играть</button>
            </div>
            </div>
        </GamePage>
   );
};

export default SlotsGame;
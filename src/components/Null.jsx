import React, { useState } from 'react';
import Modal from './Modal/Modal';
import Login from '../pages/Login/Login';
// import './NullStyles.css'

const Null = ({auth=false, ParentUpdate})=>
{
    const [modalActive, setModalActive] = useState(auth)
    return(
        <div style={{height:"60vh", display:"flex", justifyContent:"center", flexDirection:"column", textAlign:"center"}}>
            <Modal active = {modalActive} setActive={setModalActive}>
                <Login active = {modalActive} setActive={setModalActive} ParentUpdate={ParentUpdate}/>
            </Modal>
             <h4 style={{color:"white", marginBottom:"10vh"}}>Вероятно вы попали на эту страницу потому что не авторизованы</h4>
             <div><button style={{width:"15vw"}} onClick={()=>{setModalActive(true)}}>Авторизоваться</button></div>
             
        </div>
   );
};

export default Null;
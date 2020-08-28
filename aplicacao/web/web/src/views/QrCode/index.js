import React, { useState } from 'react';
import * as S from './styles';
import api from '../../services/api';
import Qr from 'qrcode-react'
import { Redirect } from 'react-router-dom';

//Components 
import Header from '../../components/Header';
import Footer from '../../components/Footer';


function QrCode() {

const[mac, setMac] = useState();
const [redirect, setRedirect] = useState();

async function SaveMac() {
    if(!mac)
        alert("Você precisa digitar o número que aparece no seu celular")
    else{
        await localStorage.setItem('@todo/macaddress' , mac);
        setRedirect(true);
        window.location.reload();
    }

}

  return (
    <S.Container>

        { redirect && <Redirect to='/'/>}

        <Header/>
            <S.Content>
                <h1>Capture o QrCode pelo APP</h1>
                <S.QrCodeArea>
                    <Qr value='getmacaddress' size={350}/>
                </S.QrCodeArea>
                <p>Suas atividades serão sincronizadas</p>

                <S.ValidationCode>
                    <span>Digite a númeração que aparecer no seu celular </span>
                    <input type="text" onChange={e => setMac(e.target.value)} value={mac}/>
                    <button type="button" onClick={SaveMac}>Sincronizar</button>
                </S.ValidationCode>
            </S.Content>
        <Footer/>
    </S.Container>    
    )
}

export default QrCode;

import React, {useEffect, useState} from 'react';
import * as S from './styles'
import { Link } from 'react-router-dom'
import api from '../../services/api';
import isConnected from '../../utils/isConnected'

import logo from '../../assets/logo.png'
import bell from '../../assets/bell.png'



function Header({ clickNotification }) {


  const [lateCount, setLateCount] = useState();

  useEffect(() => {

    async function lateTasks(){
      await api.get(`/task/filter/late/${isConnected}`)
      .then(response => {
        setLateCount(response.data.length)
      })
    }
    lateTasks();
  })

  async function Logout(){
    localStorage.removeItem('@todo/macaddress');
    window.location.reload();
  }


  return (
    <S.Container>
      <S.LeftSide>
        <img src={logo} alt='logo' href="#" />
      </S.LeftSide>

      <S.RightSide>
        <Link to='/' >INÍCIO</Link>
        <span className="dividir" />
        <Link to='/task' >NOVA TAREFA</Link>
        <span className="dividir" />
        { !isConnected ?
        <Link to='qrcode'>SINCRONIZAR CELULAR</Link>
        :
        <button type='button' onClick={Logout}>SAIR</button>
        }

        {
          lateCount &&
          <>
            <span className="dividir" />
            <button onClick={clickNotification} id="notification">
              <img src={bell} alt='Notificação' />
                <span>{lateCount}</span>
            </button>
          </>
        }

      </S.RightSide>

    </S.Container>



  )
}

export default Header;

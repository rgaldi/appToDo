import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom'
import * as S from './styles'
import {format} from 'date-fns'
import api from '../../services/api';
import isConnected from '../../utils/isConnected'

//Components 
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TypeIcons from '../../utils/typeicons'


function Task({match}) {
  const [redirect, setRedirect] = useState(false);
  const [type, setType] = useState();
  const [id, setId] = useState();
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();


  async function Save(){

    //Validação dos dados

    if(!title)
      return alert("Título não informado")
    else if(!description)
      return alert("Descrição não informada")
    else if(!type)
      return alert("Tipo não infromado")
    else if(!date)
      return alert("Data não informada")
    else if(!hour)
      return alert("Hora não informada")

    //Salvando os dados
    if(match.params.id){
      await api.put(`/task/${match.params.id}`, {
        macaddress: isConnected,
        done,
        type,
        title,
        description,
        when: `${date}T${hour}:00.000`
      }).then(() => 
        setRedirect(true)
      )

    }else{
      await api.post('/task', {
        macaddress: isConnected,
        type,
        title,
        description,
        when: `${date}T${hour}:00.000`
      }).then(() => 
          setRedirect(true)
      )
    }
  }

  async function Remove(){
    const res = window.confirm('Deseja excluir a tarefa?')

    if (res == true)
      await api.delete(`/task/${match.params.id}`)
      .then(() => setRedirect(true)) 
  }

  useEffect(() => {

    async function LoadTaskDetail(){
      await api.get(`/task/${match.params.id}`)
      .then(response => {

        setType(response.data.type)
        setTitle(response.data.title)
        setDescription(response.data.description)
        setDate(format(new Date(response.data.when), 'yyyy-MM-dd'))
        setHour(format(new Date(response.data.when), 'HH:mm'))
        setDone(response.data.done)
  
      })
    }

    if(!isConnected)
      setRedirect(true);

    LoadTaskDetail();
  }, [])


  return (
    <S.Container>

      { redirect && <Redirect to="/" /> }

      <Header/>

      <S.Form>
          <S.TypeIcons>
              {
                TypeIcons.map((icon, index) => (
                    index > 0 && 
                    <button type="button" onClick={() => setType(index)}>
                        <img src={icon} alt="Tipos de Tarefas"
                        className={type && type != index && 'inative'}/> 
                    </button>
                ))
              }
          </S.TypeIcons>

          <S.Input>
              <span>Título</span>
              <input type='text' placeholder='Título da Tarefa...' 
              onChange={e => setTitle(e.target.value)} value={title}/>
          </S.Input>

          <S.TextArea>    
              <span>Descrição</span>
              <textarea rows={5} placeholder='Detalhes da Tarefa'
              onChange={e => setDescription(e.target.value)} value={description}/>
          </S.TextArea>

          <S.Input>
              <span>Data</span>
              <input type='date' placeholder='Data da Tarefa...'
              onChange={e => setDate(e.target.value)} value={date}/>
          </S.Input>

          <S.Input>
              <span>Hora</span>
              <input type='time' placeholder='Título da Tarefa...'
              onChange={e => setHour(e.target.value)} value={hour}/>
          </S.Input>

          <S.Option>
              <div>
                  <input type='checkbox' checked={done} onChange={() => setDone(!done)}/>
                  <span>CONCLUÍDO</span>
              </div>
            { match.params.id && <button type='button' onClick={Remove}>EXCLUIR</button> }
          </S.Option>

          <S.Save>
              <button type='button' onClick={Save}>SALVAR</button>
          </S.Save>

      </S.Form>

      <Footer/>
      
    </S.Container>
    )
}

export default Task;

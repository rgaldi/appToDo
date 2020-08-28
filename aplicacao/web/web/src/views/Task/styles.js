import styled from 'styled-components'

export const Container = styled.div`

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    

`

export const Form = styled.div`

    width: 50%;
    margin-bottom: 70px;

`

export const TypeIcons = styled.div`

    width: 100%;
    display: flex;
    justify-content: center;

    .inative{
        opacity: 0.5;
    }

    button{
        border: none;
        background: none;
        outline: 0;
    }
    img {
        
        width: 50px;
        height: 50px;
        margin: 10px;
        cursor: pointer;

        &:hover{
        opacity: 0.5;
        }
    }

`

export const Input = styled.div`

    width: 100%;
    display: flex;
    flex-direction: column;
    

    span{
        color: #707070;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    input{
        font-size: 16px;
        padding: 15px;
        border: none;
        border-bottom: 1px solid #EE6B26
    }

`

export const TextArea = styled.div`

    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    span{
        color: #707070;
        margin-top: 10px;
        margin-bottom: 10px;
        }

    textarea{

        font-size: 16px;
        border: 1px solid #EE6B26;
        border-radius: 5px;

    }

`

export const Option = styled.div`

    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    button{
        font-weight: bold;
        color: #20295F;
        border: none;
        outline: 0;
        background: none;
        font-size: 18px;
        cursor: pointer;

        &:hover{
            opacity: 0.5;
        }
    }

    div{
        display:flex;
        align-items:center;
        color: #EE6B26;
        font-weight: bold;
        font-size: 18px;
    }

`

export const Save = styled.div`

    width: 100%;
    margin-top: 25px;

    button{
       width: 100%;
       background: #EE6B26;
       border: none;
       border-radius: 30px;
       outline: 0;
       font-size: 20px;
       font-weight: bold;
       color: white;
       padding: 20px;
       cursor: pointer;

       &:hover{
           opacity:0.5;
       }

    }

`
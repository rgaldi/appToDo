import styled from 'styled-components'

export const Container = styled.div`

    width: 100%;
    height: 70px;
    background: #20295F;
    display: flex;
    border-bottom: 5px solid #EE6B26

`

export const LeftSide = styled.div`

    width: 50%;
    height: 70px;
    display: flex;
    align-items: center;
    padding-left: 10px;

    img {

        width: 100px;
        height: 45px;

    }


`

export const RightSide = styled.div`

    width: 50%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    button {
            background: none;
            border: none;
            cursor: pointer;
            outline: none;
        }

    a, button {
        color: white;
        font-weight: bold;
        text-decoration: none;
        margin: 0 10px;

        &:hover{
            color: #EE6B26
        }

    }

    #notification {
        img {
            width: 25px;
            height: 30px;
        }

        span {
            background: white;
            color: #EE6B26;
            padding: 2px 6px;
            border-radius: 50%;
            position: relative;
            top: -20px;
            right: 15px;

        }

        &:hover{
            opacity: 0.5;
        }

    }

    .dividir::after{
        content: "|";
        color: white;
        margin: 0 10px;

    }

    button {
            font-size: 18px;
        }
    
`
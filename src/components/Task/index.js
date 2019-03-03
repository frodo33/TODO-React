import React from 'react';
import styled from 'styled-components';

const TaskElement = styled.div`
    margin: 10px 10px;
    background: coral;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`;

const Content = styled.div`
    width: 70%;
    font-family: Montserrat;
    
    @media (max-width: 450px) {
        width: 60%;
        font-size: 12px;
    }
`;

const Title = styled.h2`
    font: 700 20px;
    margin: 10px 0;
`;

const Description = styled.p`
    margin: 0;
    font-size: 14px;
`;

const Controls = styled.div`
    width: 20%;
    display: flex;
    justify-content: flex-end;
    
    @media (max-width: 400px) {
        flex-direction: column-reverse;
    }
`;

const Button = styled.button`
    cursor: pointer;
    font-size: 15px;
    margin: 0 10px;
    padding: 5px 10px;
    background: transparent;
    border: 1px solid black;
    border-radius: 5px;
    transition: .4s;
    
    &:hover {
        background: #00000090;
        color: #fff;
    }
    
    &:last-child {
        font-size: 14px;
    }
    
    @media (max-width: 400px) {
        margin: 10px 0;
        padding: 5px
        font-size: 12px;
    }
`;

const Task = (props) => {

    const removeCurrent = () => {
        props.removeCurrent(props.index);
    };

    return (
        <TaskElement>
            <Content>
                <Title>{props.data.title}</Title>
                <Description>{props.data.description}</Description>
                <p>Task number: {props.index + 1}</p>
            </Content>
            <Controls>
                <Button onClick={removeCurrent}>X</Button>
            </Controls>
        </TaskElement>
    )
}

export default Task;
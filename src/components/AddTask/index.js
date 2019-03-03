import React, { Component } from 'react';
import styled from 'styled-components';
import firebase from 'firebase';

const AddTaskModal = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background: #00000097;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ContentTitle = styled.h1`
    color: #fff;
`;

const TaskTitle = styled.input`
    height: 30px;
    min-width: 250px;
    border-radius: 5px;
    border: none;
    padding: 0 5px;
    font-size: 14px;
`;
const TaskDescription = styled.textarea`
    margin: 20px 0;
    width: 250px;
    min-height: 80px;
    border-radius: 5px;
    border: none;
    padding: 5px;
    font-size: 14px;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    width: 250px;
`;

const ConfirmBtn = styled.button`
    width: 40%;
    background: darksalmon;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    
    &:hover {
        background: coral;
    }
    
    &:active {
        transform: scale(1.05);
    }
    
    &:focus {
        outline: none;
        color: white;               
    }
`;

const CancelBtn = styled.button`
    width: 40%;
    background: darksalmon;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    
    &:hover {
        background: coral;
    }
    
    &:active {
        transform: scale(1.05);
    }
    
    &:focus {
        outline: none;
        color: white;               
    }
`;


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            tasks: undefined
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.id]: e.currentTarget.value
        })
    };

    handleAddTask = () => {
        const userId = firebase.auth().currentUser.uid;

        if(this.state.title && this.state.description !== '') {
            firebase.database().ref(`users/${userId}`).update({
                tasks: this.state.tasks !== undefined
                    ? [...this.state.tasks, {title: this.state.title, description: this.state.description, taskNr: this.state.tasks.length}]
                    : [{title: this.state.title, description: this.state.description, taskNr: 0}]

            }, (error) => {
                if (error) {

                } else {
                    this.props.hideModal();
                    this.props.refreshData();
                }
            });
        }
    }

    componentDidMount() {
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
            const data = snapshot.val();
            this.setState({
                tasks: data.tasks
            })
        });
    }

    render() {
        return (
            <AddTaskModal>
                <ContentTitle>Add new one</ContentTitle>
                <TaskTitle id='title' onChange={this.handleChange} type="text" placeholder='title'/>
                <TaskDescription id='description' onChange={this.handleChange} placeholder='Description' />
                <Buttons>
                    <CancelBtn onClick={this.props.hideModal}>Cancel</CancelBtn>
                    <ConfirmBtn onClick={this.handleAddTask}>Confirm</ConfirmBtn>
                </Buttons>
            </AddTaskModal>
        )
    }
}

export default Index;
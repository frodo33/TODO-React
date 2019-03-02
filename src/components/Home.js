import React, { Component } from 'react';
import firebase from 'firebase';
import styled from 'styled-components';
import Task from './Task';
import AddTask from './AddTask';

const Container = styled.div`
    max-width: 1300px;
    margin: 0 auto;
`;

const Header = styled.div`
    font-family: Montserrat;
    font-weight: 700;
    width: 100%;
    height: 150px;
    background: darksalmon;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const LogOut = styled.p`
    position: absolute;
    right: 20px;
    top: 10px;
    text-transform: uppercase;
    transition: .4s;
    
    &:hover {
        color: #fff;
    }
    
    @media (max-width: 450px) {
        top: 0;
    }
`;

const Title = styled.h1`
   
`;

const Controls = styled.div`
    display: flex;
    justify-content: space-between;
`;

const DeleteControls = styled.div`

`;

const Button = styled.button`
    cursor: pointer;
    background: darksalmon;
    padding: 10px 15px;
    margin: 20px 10px;
    font: 700 12px Montserrat;
    border: none;
    border-radius: 5px;
    
    &:hover {
        background: coral;
    }
    
    @media (max-width: 400px) {
        font-size: 10px;
        padding: 10px 10px;
        margin: 20px 5px;
    }
`;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: firebase.auth().currentUser,
            showModal: false,
            tasks: undefined
        }
    }

    handleShowAddModal = () => {
        this.setState({
            showModal: true
        })
    };

    handleHideAddModal = () => {
        this.setState({
            showModal: false
        })
    };

    handleLogout = () => {
        firebase.auth().signOut();
    }

    refreshData = () => {
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
            const data = snapshot.val();
            this.setState({
                tasks: data.tasks
            })
        })
    }

    handleRemoveLast = () => {
        if(this.state.tasks !== undefined) {
            this.state.tasks.splice(this.state.tasks.length-1, 1);

            const userId = firebase.auth().currentUser.uid;
            firebase.database().ref(`users/${userId}`).update({
                tasks: this.state.tasks

            }, (error) => {
                if (error) {

                } else {
                    this.refreshData();
                }
            });
        }
    };

    handleRemoveAll = () => {
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref(`users/${userId}`).update({
            tasks: null

        }, (error) => {
            if (error) {
            } else {
                this.refreshData();
            }
        });
    };

    componentDidMount() {
        this.refreshData();
    };

    render() {
        const tasks = this.state.tasks !== undefined && this.state.tasks.map((el, i) => <Task data={el} key={i} index={i} />);

        return (
            <Container>
                <Header>
                    <LogOut onClick={this.handleLogout}>Log out</LogOut>
                    <Title>TO DO LIST</Title>
                </Header>
                <Controls>
                    <Button onClick={this.handleShowAddModal}>ADD NEW ONE</Button>
                    {this.state.showModal && <AddTask refreshData={this.refreshData} hideModal={this.handleHideAddModal} />}
                    <DeleteControls>
                        <Button onClick={this.handleRemoveLast}>DELETE LAST</Button>
                        <Button onClick={this.handleRemoveAll}>DELETE ALL</Button>
                    </DeleteControls>
                </Controls>
                {tasks}
            </Container>
        )
    }
}

export default Home;
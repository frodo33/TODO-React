import React from "react";
import { Redirect } from 'react-router-dom';
import {ReactComponent as EmailIcon} from "../assets/envelope-regular.svg";
import {ReactComponent as PassIcon} from "../assets/lock-solid.svg";
import styled from "styled-components";
import firebase from 'firebase';

const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Fieldset = styled.div`
    width: 90%;
    height: 40px;
    display: flex;
    align-items: center;
    border: 1px solid #00000050;
    border-radius: 10px;
    margin: 20px 0;
    padding: 5px;
    
`;

const Input = styled.input`
        border: none;
        width: 90%;
        height: 80%;
        font-size: 20px;
        font-family: Roboto;
        
        &:focus {
            outline: none;
            border-bottom: 1px solid coral;
        }
        
        &::placeholder {
            color: coral;
        }
        
`;

const Label = styled.label`
    width: 25px;
    padding: 0 20px;
    color: coral;
`;


const SignUpButton = styled.button`
    width: 90%;
    height: 50px;
    margin: 30px 0;
    background: coral;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 600;
    font-family: Montserrat;
    cursor: pointer;
`;

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            success: false,
            user: firebase.auth().currentUser
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.currentTarget.id]: e.currentTarget.value
        });
    }

    logIn = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((res)=>{
                console.log('success');
                // window.location.pathname = '/';
                // return <Redirect exact to='/dashboard' />;

                this.setState({
                    success: true,
                    user: res.user
                })

                // return <Redirect exact to='/' />
            })
            .catch((error) => {
                console.log(error.message);
                this.setState({
                    error: error.message
                })
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        this.logIn(email, password);
        // if(email && password !== '') {
        //     this.logIn(email, password);
        // }
    }

    handleLogout = () => {
        firebase.auth().signOut()
            .then(() => {
            console.log('wylogowalo');
            console.log(this.state.user);
        }).catch((error) => {
            console.log('chuj nie wylogowalo', error);
        });
    }

    render() {
        if (this.state.success === true) {
            console.log(firebase.auth().currentUser);
            return <Redirect to='/dashboard' />
        } else {
            return (
                <Form onSubmit={this.handleSubmit}>
                    <Fieldset>
                        <Label htmlFor="email"><EmailIcon/></Label>
                        <Input onChange={this.handleInputChange} type="email" id='email' placeholder='Your email'/>
                    </Fieldset>
                    <Fieldset>
                        <Label htmlFor="password"><PassIcon/></Label>
                        <Input onChange={this.handleInputChange} type="password" id='password' placeholder='Password'/>
                    </Fieldset>
                    {this.state.error !== '' && <p>{this.state.error}</p>}
                    <SignUpButton>Login</SignUpButton>
                    <div onClick={this.handleLogout}>logout</div>
                    <div onClick={()=> {
                        this.setState({user: firebase.auth().currentUser});
                        console.log(this.state.user)}
                    }>asdfasdfasdf</div>
                </Form>
            )
        }

    }
}

export default SignIn;
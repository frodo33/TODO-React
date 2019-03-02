import React, { Component } from 'react';
import styled from 'styled-components';
import { ReactComponent as UserIcon } from "../assets/user.svg";
import { ReactComponent as EmailIcon } from "../assets/envelope-regular.svg";
import { ReactComponent as PassIcon } from "../assets/lock-solid.svg";
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

const Error = styled.p`
    width: 90%;
    font-size: 14px;
`;


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            error: '',
            isValid: false
        }

    }

    handleInputChange = (e) => {
        this.setState({
            [e.currentTarget.id]: e.currentTarget.value
        })
    }

    firebaseCreateAcc = (name, email, pass) => {
        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then(()=>{
                const userId = firebase.auth().currentUser.uid;
                firebase.database().ref(`users/${userId}`).set({
                    name: name,
                    email: email
                }, (error) => {
                    if (error) {

                    } else {

                    }
                });
            })
            .catch((error) => {
                this.setState({
                    error: error.message
                });
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const {name, email, password} = this.state;

        if(name && email && password !== '') {
            this.firebaseCreateAcc(name, email, password);
        }

    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Fieldset>
                    <Label htmlFor="name"><UserIcon/></Label>
                    <Input onChange={this.handleInputChange} type="text" id='name' placeholder='Name'/>
                </Fieldset>
                <Fieldset>
                    <Label htmlFor="email"><EmailIcon/></Label>
                    <Input onChange={this.handleInputChange} type="email" id='email' placeholder='Email'/>
                </Fieldset>
                <Fieldset>
                    <Label htmlFor="password"><PassIcon/></Label>
                    <Input onChange={this.handleInputChange} type="password" id='password' placeholder='Password'/>
                </Fieldset>
                {this.state.error !== '' && <Error>{this.state.error}</Error>}
                <SignUpButton type='submit'>Create account</SignUpButton>
            </Form>
        )
    }
}

export default SignUp;
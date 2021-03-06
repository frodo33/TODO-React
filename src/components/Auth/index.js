import React, { Component } from 'react';
import styled from 'styled-components';
import SignUp from '../SignUp/index';
import SignIn from '../SignIn/index';


const Container = styled.div`
    max-width: 1300px;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FormBox = styled.div`
    width: 500px;
    background: #fff;
    margin: 0 10px;
    border-radius: 5px;
`;

const TitleBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
`;

const SignInTitle = styled.h2`
    width: 50%;
    margin: 0;
    padding: 30px 0;
    text-align: center;
    font-size: 20px;
    background: ${props => props.backgroundColor ? 'white' : 'lightgrey'}
    border-top-left-radius: 5px;
`;

const SignUpTitle = styled(SignInTitle)`
    background: ${props => props.backgroundColor ? 'lightgrey' : 'white'}
    border-top-right-radius: 5px;
`;


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchForm: true
        }
    }

    handleSwitchToSignIn = () => {
        this.setState({switchForm: true})
    };
    handleSwitchToSignUp = () => {
        this.setState({switchForm: false})
    }

    render() {
        return (
            <Container>
                <FormBox>
                    <TitleBox>
                        <SignInTitle backgroundColor={this.state.switchForm} onClick={this.handleSwitchToSignIn}>Sign In</SignInTitle>
                        <SignUpTitle backgroundColor={this.state.switchForm} onClick={this.handleSwitchToSignUp}>New account</SignUpTitle>
                    </TitleBox>
                    {this.state.switchForm ? <SignIn /> : <SignUp />}
                </FormBox>
            </Container>
        )
    }
}

export default Index;
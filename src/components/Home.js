import React, { Component } from 'react';
import firebase from 'firebase';
import Loader from './Loader';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: firebase.auth().currentUser
        }
    }

    handleClick = () => {
        console.log(this.state.user);
    }

    asdf = () => {
        firebase.auth().signOut()
            .then(() => {
                window.location.pathname = '/';
            }).catch((error) => {
            console.log('chuj nie wylogowalo', error);
        });
    }

    render() {
        return (
            <>
                <div onClick={this.handleClick}>hwdp</div>
                <div onClick={this.asdf}>asdfasdf</div>
            </>
        )
    }
}

export default Home;
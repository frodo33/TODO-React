import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import firebase from 'firebase';

import Loader from './components/Loader/index';
import Auth from './components/Auth/index';
import Home from './components/Home/index';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #484A55;
    box-sizing: border-box;
  } 
`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        }
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            user ? this.setState({user: user}) : this.setState({user: null});
        });
    }


  render() {
    return (
        <>
            <GlobalStyle />
            <Router>
                <Switch>
                    {
                        this.state.user === undefined
                            ?   <Loader />
                            :   <Route exact path='/' render={ () => this.state.user !== null ? <Redirect to="/dashboard" /> : <Auth />} />
                    }

                    {
                        this.state.user === undefined
                            ?   <Loader />
                            :   <Route path='/dashboard' render={ () => this.state.user !== null ? <Home /> : <Redirect to="/" />} />
                    }
                </Switch>
            </Router>
        </>
    );
  }
}

export default App;

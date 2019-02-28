import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import firebase from 'firebase';

import Loader from './components/Loader';
import Auth from './components/Auth';
import Home from './components/Home';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        }
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user: user
                })
            } else {
                this.setState({
                    user: null
                })
            }
        });
    }


  render() {
    return (
      <Router>
            <Switch>
                {
                    this.state.user === undefined
                        ?   <Loader />
                        :   <Route exact path='/' render={ () => this.state.user !== null ? <Redirect to="/dashboard" /> : <Auth />} />
                }
                <Route path='/dashboard' component={Home} />
            </Switch>
      </Router>
    );
  }
}

export default App;

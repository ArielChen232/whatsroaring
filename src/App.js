import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Calendar from './Pages/Calendar'
import Details from './Pages/Details'

import './App.css';

class App extends Component {

  render() {
    return (

      <Router>
        <Switch>
          <Route exact={true} path='/' render={() => (
            <div className="App">
              <div className="Jumbotron">
                <h2>WhatsRoaring</h2>
                <h5>Here's what's roaring around Princeton.</h5>
              </div>
              <Calendar />
            </div>
          )} />
          <Route exact={true} path='/details' render={() => (
            <div className="App">
              <div className="Jumbotron">
                <h2>WhatsRoaring</h2>
              </div>
              <Details />
            </div>
          )} />
        </Switch>
      </Router>
      
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Calendar from './Pages/Calendar'
import Landing from './Pages/Landing'
import Details from './Pages/Details'
import CreateEvent from './Pages/CreateEvent'
import AddOrg from './Pages/AddOrg'

import './App.css';

class App extends Component {

  render() {
    return (

      <Router>
        <Switch>
        <Route exact={true} path='/' render={() => (
          <div className="App">
            <Landing />
          </div>
        )} />
          <Route exact={true} path='/calendar' render={() => (
            <div className="App">
              <Calendar />
            </div>
          )} />
          <Route exact={true} path='/details' render={() => (
            <div className="App">
              <Details />
            </div>
          )} />
          <Route exact={true} path='/submitEvent' render={() => (
            <div className="App">
              <CreateEvent />
            </div>
          )} />
          <Route exact={true} path='/addOrg' render={() => (
            <div className="App">
              <AddOrg />
            </div>
          )} />
        </Switch>
      </Router>

    );
  }
}

export default App;

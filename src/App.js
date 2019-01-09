import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Calendar from './Pages/Calendar'
import Landing from './Pages/Landing'
import Details from './Pages/Details'
import CreateEvent from './Pages/CreateEvent'
import AddOrg from './Pages/AddOrg'
import UnderConstruction from './Pages/UnderConstruction'
import EditEvent from './Pages/EditEvent'
import MyEvents from './Pages/MyEvents'

import Footer from './Pages/Components/Footer'

import './App.css'

class App extends Component {

  render() {
    return (

      <Router>
        <Switch>
          <Route exact={true} path='/' render={() => (
            <div className="App">
              <Landing />
              <div className='Footer'>
                <Footer />
              </div>
            </div>
          )} />
          <Route exact={true} path='/calendar' render={() => (
            <div className="App">
              <Calendar />
              <div className='Footer'>
                <Footer />
              </div>
            </div>
          )} />
          <Route exact={true} path='/details' render={() => (
            <div className="App">
              <Details />
              <div className='Footer'>
                <Footer />
              </div>
            </div>
          )} />
          <Route exact={true} path='/submitEvent' render={() => (
            <div className="App">
              <CreateEvent />
              <div className='Footer'>
                <Footer />
              </div>
            </div>
          )} />
          <Route exact={true} path='/editEvent' render={() => (
            <div className="App">
              <EditEvent />
              <div className='Footer'>
                <Footer />
              </div>
            </div>
          )} />
          <Route exact={true} path='/myEvents' render={() => (
            <div className="App">
              <MyEvents />
              <div className='Footer'>
                <Footer />
              </div>
            </div>
          )} />
          <Route exact={true} path='/addOrg' render={() => (
            <div className="App">
              <AddOrg />
              <div className='Footer'>
                <Footer />
              </div>
            </div>
          )} />
          <Route exact={true} path='/underConstruction' render={() => (
            <div className="App">
              <UnderConstruction />
              <div className='Footer'>
                <Footer />
              </div>
            </div>

          )} />
        </Switch>
      </Router>

    );
  }
}

export default App;

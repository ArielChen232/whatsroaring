import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Calendar from './Pages/Calendar'
import DropdownMultiple from './Pages/Components/DropdownMultiple'
import Details from './Pages/Details'

import './App.css';

class App extends Component {

  constructor(){
    super()
    this.state = {
      location: [
        {
          id: 0,
          title: 'Richardson Auditorium',
          selected: false,
          key: 'location'
        },
        {
          id: 1,
          title: 'Baker Rink',
          selected: false,
          key: 'location'
        },
        {
          id: 2,
          title: 'McCarter Theater',
          selected: false,
          key: 'location'
        }
      ],
      eventtype: [
        {
          id: 0,
          title: 'Music',
          selected: false,
          key: 'eventtype'
        },
        {
          id: 1,
          title: 'Arts',
          selected: false,
          key: 'eventtype'
        },
        {
          id: 2,
          title: 'Sports',
          selected: false,
          key: 'eventtype'
        },
        {
          id: 3,
          title: 'Theater',
          selected: false,
          key: 'eventtype'
        }
      ]
    }
  }

  toggleSelected = (id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp[id].selected = !temp[id].selected
    this.setState({
      [key]: temp
    })
  }

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
              <br>

              </br>
              
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

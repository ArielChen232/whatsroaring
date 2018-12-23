import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LogInButton from './Components/LogInButton'

import './Landing.css'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Jumbotron,
    Button
} from 'reactstrap';

class Landing extends Component {

  constructor(props) {
          super(props);

          this.toggle = this.toggle.bind(this);
          this.state = {
              isOpen: true
          };
      }
      toggle() {
          this.setState({
              isOpen: !this.state.isOpen
          });
      }

  // constructor(...args) {
  //   super(...args)
  //   this.state = {
  //   }
  // }

  render() {
    return (
      <div className="landing">

      <Navbar color="faded" light style={{backgroundColor: '#FFA500'}}>
        <NavbarBrand href="/">Home</NavbarBrand>
        <NavbarToggler onClick={this.toggle} className="mr-2" />
        <Collapse isOpen={!this.state.isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/calendar/">Calendar</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/submitEvent">Add an Event</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

      <header class="masthead">
        <div class="container">
          <div className="Jumbotron">
          <br>
          </br>
          <br>
          </br>
          <br>
          </br>
          <br>
          </br>
          <LogInButton/>
          </div>
        </div>
      </header>

        <div className="Jumbotron">
          <h2> About whatsRoaring </h2>
        </div>

        <div className="Jumbotron">
          <h2> The Team </h2>
        </div>

        <div className="Jumbotron">
        <h2> Project Documentation </h2>
        </div>

        </div>
      )
    }

}

export default withRouter(Landing);

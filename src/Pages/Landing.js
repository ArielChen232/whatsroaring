import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LogInButton from './Components/LogInButton'

import './Landing.css'

import imageName from "../Assets/just_logo.png"

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

          this.toggleNavbar = this.toggleNavbar.bind(this);
     this.state = {
       collapsed: false
     };
   }

    toggleNavbar() {
     this.setState({
       collapsed: !this.state.collapsed
     });
   }



  render() {
    return (
      <div className="landing">

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" id="navHome">
          <a class="navbar-brand js-scroll-trigger" href="#">Home</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="#navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <a class="nav-link js-scroll-trigger" href="#about">About</a>
              </li>
              <li class="nav-item active">
                <a class="nav-link js-scroll-trigger" href="#team">Team</a>
              </li>
              <li class="nav-item active">
                <a class="nav-link js-scroll-trigger" href="#doc">Project Docs</a>
              </li>
            </ul>
          </div>
      </nav>

      <div className="landing_top">
        <div class="container">
          <div className="Jumbotron">
            <div>
            <img src={imageName}/>
            </div>
          </div>
          <div className="Jumbotron">
          <LogInButton/>
          </div>
        </div>
      </div>

      <div className="landing_bottom">
        <section id="about">
        <div className="Jumbotron">
          <h2> About whatsRoaring </h2>
          <p> blah blah text </p>
        </div>
        </section>

        <section id="team">
        <div className="Jumbotron">
          <h2> The Team </h2>
          <p> blah blah pics and text </p>
        </div>
        </section>

        <section id="doc">
        <div className="Jumbotron">
        <h2> Project Documentation </h2>
        <p> blah blah stuff, links prolly </p>
        </div>
        </section>
        </div>


      </div>
      )
    }

}

export default withRouter(Landing);

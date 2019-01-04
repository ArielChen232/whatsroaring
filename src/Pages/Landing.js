import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LogInButton from './Components/LogInButton'
import Footer from './Components/Footer'

import './Landing.css'

import imageName from "../Assets/just_logo.png"

import {
    CardBody,
    Card,
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

class Landing extends React.Component {

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.state = {
      collapsed: true,
      collapse: false,
      collapse2: false,
      collapse3: false,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggle2() {
    this.setState({ collapse2: !this.state.collapse2 });
  }

  toggle3() {
    this.setState({ collapse3: !this.state.collapse3 });
  }

  render() {
    return (
      <div className="landing">

      {/*<div>
        <Navbar color="muted" light expand="lg">
          <NavbarBrand href="/" className="mr-auto">Home</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="#about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#team">Team</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#doc">Project Docs</NavLink>
            </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>*/}

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

      {/*<div className="landing_bottom">
        <section id="about">
        <Button color="muted" size="lg" block onClick={this.toggle} style={{ marginBottom: '1rem' }}>About whatsRoaring</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
            Currently, each group on campus that has events either has a separate calendar or list of events on its website or publicize its events only through listserv blasts, posters, facebook, or word of mouth. Having event information in so many different places makes it very difficult to keep track of events you want to attend, and makes it very easy to not even learn about events until after they have already happened. Our system provides a platform on which club presidents and other event planners can post events and other users can find events they are interested in.

            There is currently a university-run event website, https://www.princeton.edu/events, but it does not allow for favoriting or saving events, and it does not show events in calendar format. It also only includes official university events, and not events put on by clubs. Our calendar would have all of these functionalities. Google also provides a list of events if you google “princeton events,” but once again there is no way to favorite or save events, the interface is very difficult to read, especially since the events are not listed in chronological order, and it does not allow for any sort of filtering.
            </CardBody>
          </Card>
        </Collapse>
        </section>

        <section id="team">
        <Button color="muted" size="lg" block onClick={this.toggle2} style={{ marginBottom: '1rem' }}>The Team</Button>
        <Collapse isOpen={this.state.collapse2}>
          <Card>
            <CardBody>
            [section coming soon!]
            </CardBody>
          </Card>
        </Collapse>
        </section>

        <section id="doc">
        <Button color="muted" size="lg" block onClick={this.toggle3} style={{ marginBottom: '1rem' }}>Project Documentation</Button>
        <Collapse isOpen={this.state.collapse3}>
          <Card>
            <CardBody>
            [section coming soon!]
            </CardBody>
          </Card>
        </Collapse>
        </section>
        </div>

        <div className="footer">
          <div class="container">
            <span class="text-muted">Thanks for using whatsRoaring!
            </span>
          </div>
        </div>*/}


      </div>
      )
    }

}

export default withRouter(Landing);

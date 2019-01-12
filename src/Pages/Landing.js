import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Theme from '../Assets/Theme'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import About from './About'
import Team from './Team'
import Timeline from './Timeline'
import Documentation from './Documentation'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

// Local
import Jumbotron from './Components/Jumbotron'
import './Landing.css'

const axios = require('axios')
const url = 'https://whatsroaring-api.herokuapp.com/'
//const url ='http://127.0.0.1:8000/'

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: 200,
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
    width: 150,
    fontColor: 'white'
  },
  continueButton: {
    marginBottom: theme.spacing.unit * 2,
  },
})

class Landing extends Component {

  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this);
    this.state = {
      email: '',
      password: '',
      missingFields: [],
      isUser: false,
      isAdmin: false,
      openMissingFieldsDialog: false,
      openLoginErrorDialog: false,
      openServerErrorDialog: false,
      isOpen: false,
    }
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleContinue = this.handleContinue.bind(this)
  }


  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  goToCal = () => {
    localStorage.clear()
    localStorage.setItem('email', this.state.email)
    localStorage.setItem('isAdmin', this.state.isAdmin)
    this.props.history.push('/calendar')
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleLogin() {
    var url_auth = url + 'authenticateUser'

    // Check fields
    var errors = []
    if (!this.state.email.replace(/\s/g, '').length) {
      errors.push('email address')
    }
    if (!this.state.password.replace(/\s/g, '').length) {
      errors.push('password')
    }

    if (errors.length > 0) {
      // Missing fields
      this.setState({
        missingFields: errors,
        openMissingFieldsDialog: true
      })
    } else {
      axios.post(url_auth, {
        params: {
          email: this.state.email,
          password: this.state.password
        }
      }).then((response) => {
        if (response.data === 'Admin') {
          this.setState({
            isUser: true,
            isAdmin: true
          }, () => this.goToCal())
        } else if (response.data === 'Not Admin') {
          this.setState({
            isUser: true,
            isAdmin: false
          }, () => this.goToCal())
        } else {
          console.log('Login incorrect')
          // Incorrect login
          this.setState({
            openLoginErrorDialog: true
          })
        }
      }).catch((error) => {
        this.setState({
          openServerErrorDialog: true
        })
      })
    }

  }

  handleRegister() {
    this.props.history.push('/register')
  }

  handleContinue() {
    this.props.history.push('/calendar')
  }

  handleCloseMissingFieldsDialog = () => {
    this.setState({ openMissingFieldsDialog: false })
  }

  handleCloseServerErrorDialog = () => {
    this.setState({ openServerErrorDialog: false })
  }

  handleCloseLoginErrorDialog = () => {
    this.setState({ openLoginErrorDialog: false })
  }

  renderDialogs() {
    return (
      <div className='dialogs'>
        <Dialog
          open={this.state.openMissingFieldsDialog}
          onClose={this.handleCloseMissingFieldsDialog}
        >
          <DialogTitle>
            {'Missing Fields'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              The following fields are missing: {this.state.missingFields.join(', ')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseMissingFieldsDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openLoginErrorDialog}
          onClose={this.handleCloseLoginErrorDialog}
        >
          <DialogTitle>
            {'Incorrect Login'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Incorrect email/password.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseLoginErrorDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openServerErrorDialog}
          onClose={this.handleCloseServerErrorDialog}
        >
          <DialogTitle>
            {'Server Error'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              There was an error registering your account.
              Please contact the administrative team for help.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseServerErrorDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  renderContinueButton() {
    const { classes } = this.props

    if (localStorage.getItem('email')) {
      return (
        <Button
          className={classes.continueButton}
          variant="contained"
          color="primary"
          onClick={this.handleContinue}
          size="large">
          Continue As {localStorage.getItem('email')}
        </Button>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div className='page'>
      <Navbar fixed="top" style={{backgroundColor: '#fb8c00'}} light expand="md">
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="#about"><h3>ABOUT</h3></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#team"><h3>TEAM</h3></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#timeline"><h3>TIMELINE</h3></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#docs"><h3>DOCUMENTATION</h3></NavLink>
            </NavItem>
            </Nav>
        </Collapse>
      </Navbar>
        <Jumbotron />
        <MuiThemeProvider theme={Theme}>
          {this.renderDialogs()}
          <div className='form'>
            <Grid
              container
              justify='center'
              direction='column'
              alignItems='center'
              alignContent='center'>
              <Grid item xs={6}>
                {this.renderContinueButton()}
                <br></br>
                <TextField
                  label='Email'
                  className={classes.textField}
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  margin='normal'
                  variant='filled'
                />
                <TextField
                  label='Password'
                  className={classes.textField}
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  margin='normal'
                  variant='filled'
                  type='password'
                />
              </Grid>
              <Grid item xs={6}>
                <div className='buttons'>
                  <FormControl>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={this.handleLogin}
                      size="large">
                      Log In
                    </Button>

                    <br></br>
                    <h4> Need an account? </h4>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={this.handleRegister}
                      size="large">
                      Register
                    </Button>
                  </FormControl>
                </div>
              </Grid>
            </Grid>
          </div>

          <section id='about'>

          <br/>

          <ColoredLine color="#fb8c00" />

          <br/>


          <About />
          </section>

          <section id='team'>

          <br/>

          <ColoredLine color="#fb8c00" />

          <br/>


          <Team />
          </section>

          <section id='timeline'>

          <br/>

          <ColoredLine color="#fb8c00" />

          <br/>


          <Timeline />
          </section>

          <section id='docs'>

          <br/>

          <ColoredLine color="#fb8c00" />

          <br/>


          <Documentation />
          </section>



          <br/>

        </MuiThemeProvider>
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(Landing))

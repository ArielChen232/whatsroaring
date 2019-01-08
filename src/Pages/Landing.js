import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Material-UI
import { withStyles } from '@material-ui/core/styles'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Theme from '../Assets/Theme'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

// Local
import Jumbotron from './Components/Jumbotron'
import './Landing.css'
import imageName from '../Assets/just_logo.png'

const axios = require('axios')
//const url = 'http://whatsroaring-api.herokuapp.com/'
const url ='http://127.0.0.1:8000/'

const styles = theme => ({
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
  }
})

class Landing extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      missingFields: [],
      isUser: false,
      isAdmin: false,
      openMissingFieldsDialog: false,
      openLoginErrorDialog: false,
      openServerErrorDialog: false,
    }
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  goToCal = () => {
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

    console.log('Email: ' + this.state.email)
    console.log('Password: ' + this.state.password)
    
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

  render() {
    const { classes } = this.props
    return (
      <div className='page'>
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
                <div className='textFields'>
                  <FormControl>
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
                  </FormControl>
                </div>
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
        </MuiThemeProvider>
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(Landing))

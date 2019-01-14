import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ReactPasswordStrength from 'react-password-strength'

// Material-UI
import { MuiThemeProvider } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'

// Local
import Theme from '../Assets/Theme'
import Header from './Components/Header'
import './Form.css'

const axios = require('axios')
const url = 'https://whatsroaring-api.herokuapp.com/'
//const url ='http://127.0.0.1:8000/'

function isValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase())
}

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      missingFields: [],
      fieldsTooLong: [],
      openSuccessDialog: false,
      openMissingFieldsDialog: false,
      openConfirmPasswordErrorDialog: false,
      openServerErrorDialog: false,
      openDuplicateUserDialog: false,
      openInvalidEmailDialog: false,
      openFieldTooLongDialog: false,
      openPasswordTooShortDialog: false,
    }
  }

  goToLanding = () => {
    this.props.history.push('/')
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleCloseSuccessDialog = () => {
    this.setState({ openSuccessDialog: false })
    this.props.history.push('/')
  }

  handleCloseMissingFieldsDialog = () => {
    this.setState({ openMissingFieldsDialog: false })
  }

  handleCloseFieldsTooLongDialog = () => {
    this.setState({ openFieldTooLongDialog: false })
  }

  handleCloseConfirmPasswordErrorDialog = () => {
    this.setState({ openConfirmPasswordErrorDialog: false })
  }

  handleCloseServerErrorDialog = () => {
    this.setState({ openServerErrorDialog: false })
  }

  handleCloseDuplicateUserDialog = () => {
    this.setState({ openDuplicateUserDialog: false })
  }

  handleCloseInvalidEmailDialog = () => {
    this.setState({ openInvalidEmailDialog: false })
  }

  handleClosePasswordTooShortDialog = () => {
    this.setState({ openPasswordTooShortDialog: false })
  }

  submit = () => {
    var url_user = url + 'addUser'
    console.log('First Name: ' + this.state.firstName)
    console.log('Last Name: ' + this.state.lastName)
    console.log('Email Address: ' + this.state.email)
    //console.log('Password: ' + this.state.password)
    //console.log('Confirm Password: ' + this.state.confirmPassword)

    // Check fields
    var errors = []
    if (!this.state.firstName.replace(/\s/g, '').length) {
      errors.push('first name')
    }
    if (!this.state.lastName.replace(/\s/g, '').length) {
      errors.push('last name')
    }
    if (!this.state.email.replace(/\s/g, '').length) {
      errors.push('email address')
    }
    if (!this.state.password.replace(/\s/g, '').length) {
      errors.push('password')
    }
    if (!this.state.confirmPassword.replace(/\s/g, '').length) {
      errors.push('confirm password')
    }

    var tooLongErrors = []
    console.log(this.state.firstName.length)
    if (this.state.firstName.length > 100) {
      tooLongErrors.push('first name')
    }
    if (this.state.lastName.length > 100) {
      tooLongErrors.push('last name')
    }
    if (this.state.email.length > 100) {
      tooLongErrors.push('email')
    }
    if (this.state.password.length > 100) {
      tooLongErrors.push('password')
    }

    if (errors.length > 0) {
      // Missing fields
      this.setState({
        missingFields: errors,
        openMissingFieldsDialog: true
      })
    } else if (tooLongErrors.length > 0) {
      this.setState({
        fieldsTooLong:tooLongErrors,
        openFieldTooLongDialog: true
      })
    } else if (!isValidEmail(this.state.email)) {
      this.setState({
        openInvalidEmailDialog: true
      })
    } else if (this.state.password.length < 10) {
      this.setState({ openPasswordTooShortDialog: true })
    } else if (this.state.password.localeCompare(this.state.confirmPassword) != 0) {
      // Confirm password does not match password
      this.setState({
        openConfirmPasswordErrorDialog: true
      })
    } else {
      axios.post(url_user, {
        params: {
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email: this.state.email,
          password: this.state.password
        }
      }).then((response) => {
        if (response.data === 'Created user') {
          this.setState({
            openSuccessDialog: true
          })
        } else if (response.data === 'Duplicate user') {
          this.setState({
            openDuplicateUserDialog: true
          })
        } else {
          this.setState({
            openServerErrorDialog: true
          })
        }
      }).catch((error) => {
        this.setState({
          openServerErrorDialog: true
        })
      })
    }
  }

  renderDialogs() {
    return (
      <div className='dialogs'>
        <Dialog
          open={this.state.openSuccessDialog}
          onClose={this.handleCloseSuccessDialog}
        >
          <DialogTitle>
            {'Success'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              You have successfully registered your account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseSuccessDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
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
          open={this.state.openFieldTooLongDialog}
          onClose={this.handleCloseFieldsTooLongDialog}
        >
          <DialogTitle>
            {'Input Error'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please limit the following fields to 100 characters or fewer: {this.state.fieldsTooLong.join(', ')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseFieldsTooLongDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openPasswordTooShortDialog}
          onClose={this.handleClosePasswordTooShortDialog}
        >
          <DialogTitle>
            {'Password Error'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a password with 10 characters or more.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClosePasswordTooShortDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openConfirmPasswordErrorDialog}
          onClose={this.handleCloseConfirmPasswordErrorDialog}
        >
          <DialogTitle>
            {'Confirm Password'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please confirm password.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseConfirmPasswordErrorDialog} color="primary">
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
        <Dialog
          open={this.state.openDuplicateUserDialog}
          onClose={this.handleCloseDuplicateUserDialog}
        >
          <DialogTitle>
            {'Account Already Exists'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              A user with this email address already exists.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDuplicateUserDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openInvalidEmailDialog}
          onClose={this.handleCloseInvalidEmailDialog}
        >
          <DialogTitle>
            {'Invalid Email'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a valid email address (e.g., "janedoe@email.com")
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseInvalidEmailDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  render() {
    return (
      <div className='page'>
        <Header />
        
        <MuiThemeProvider theme={Theme}>
          {this.renderDialogs()}
          <IconButton color='primary' onClick={this.goToLanding}>
            <ArrowBack />
          </IconButton>
          <div className='main'>
            <Paper className='paper'>
              <div className='title'>
                <Typography variant="h3" color="primary">
                  Register
                </Typography>
              </div>
              <div className='form'>
                <FormControl>
                  <TextField
                    required
                    label='First Name'
                    className='textField'
                    value={this.state.firstName}
                    onChange={this.handleChange('firstName')}
                    margin='normal'
                    variant='outlined'
                    error={this.state.firstName.length > 100}
                  />

                  <TextField
                    required
                    label='Last Name'
                    className='textField'
                    value={this.state.lastName}
                    onChange={this.handleChange('lastName')}
                    margin='normal'
                    variant='outlined'
                    error={this.state.lastName.length > 100}
                  />

                  <TextField
                    required
                    label='Email Address'
                    className='textField'
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    margin='normal'
                    variant='outlined'
                    error={this.state.email.length > 100}
                  />

                  <TextField
                    required
                    label='Password (must be at least 10 characters)'
                    className='textField'
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    margin='normal'
                    variant='outlined'
                    type='password'
                    error={this.state.password.length > 100 
                           || (this.state.password.length < 10 
                               && this.state.password.length > 0)}
                  />

                  <TextField
                    required
                    label='Confirm Password'
                    className='textField'
                    value={this.state.confirmPassword}
                    onChange={this.handleChange('confirmPassword')}
                    margin='normal'
                    variant='outlined'
                    type='password'
                    error={this.state.confirmPassword.localeCompare(this.state.password) !== 0
                           && this.state.confirmPassword.length > 0}
                  />
                </FormControl>
              </div>
              
              <div className='button'>
                <Button variant="contained" color="primary" onClick={this.submit} size="large">
                  Register
                </Button>
              </div>
            </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}


export default withRouter(Register)

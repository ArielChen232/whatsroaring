import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Material-UI
import { withStyles } from '@material-ui/core/styles'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
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

// Local
import Header from './Components/Header'
import HomeButton from './Components/HomeButton'
import theme from '../Assets/Theme'
import './Form.css'

const axios = require('axios')
//const url = 'http://whatsroaring-api.herokuapp.com/'
const url = 'http://127.0.0.1:8000/'
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
})


class AddOrg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: localStorage.getItem('email'),
      isAdmin: localStorage.getItem('isAdmin'),
      name: '',
      openSuccessDialog: false,
      openServerErrorDialog: false,
      openMissingFieldDialog: false,
      openDuplicateDialog: false,
    }
  }

  goBack = () => {
    this.props.history.goBack()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleCloseSuccessDialog = () => {
    this.setState({ openSuccessDialog: false })
    this.props.history.push('/calendar')
  }

  handleCloseServerErrorDialog = () => {
    this.setState({ openServerErrorDialog: false })
  }

  handleCloseMissingFieldDialog = () => {
    this.setState({ openMissingFieldDialog: false })
  }

  handleCloseDuplicateDialog = () => {
    this.setState({ openDuplicateDialog: false })
  }

  submit = () => {
    var url_event = url + 'createOrganization'
    console.log('Name: ' + this.state.name)

    if (this.state.name === '') {
      this.setState({ openMissingFieldDialog: true })
    } else {
      axios.post(url_event, {
        params: {
          name: this.state.name,
        }
      }).then((response) => {
        if (response.data === 'Created organization') {
          this.setState({ openSuccessDialog: true })
        } else if (response.data === 'Duplicate organization') {
          this.setState({ openDuplicateDialog: true })
        } else {
          this.setState({ openServerErrorDialog: true })
        }
      }).catch((error) => {
        this.setState({ openServerErrorDialog: true })
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
              Your organization has been added!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseSuccessDialog} color="primary">
              Return
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
              There was an error submitting your organization.
              Please contact the administrative team for help.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={this.handleCloseServerErrorDialog} 
              color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openMissingFieldDialog}
          onClose={this.handleCloseMissingFieldDialog}
        >
          <DialogTitle>
            {'Missing Field'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your organization.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={this.handleCloseMissingFieldDialog} 
              color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openDuplicateDialog}
          onClose={this.handleCloseDuplicateDialog}
        >
          <DialogTitle>
            {'Duplicate Organization'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              An organization with the given name already exists.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={this.handleCloseDuplicateDialog} 
              color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  render() {

    if (this.state.email === null) this.props.history.push('/')
    if (this.state.isAdmin === 'false') this.props.history.push('/calendar')

    const { classes } = this.props

    return (
      <div className='page'>
        <Header />
        <HomeButton />
        <MuiThemeProvider theme={theme}>
          {this.renderDialogs()}
          <div className='main'>
            <Paper className='paper'>
              <div className='title'>
                <Typography variant="h3" color="primary">
                  Add Organization
                </Typography>
              </div>
            
              <div className='form'>
                <FormControl>
                  <TextField
                    id='event-name'
                    label='Organization Name'
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin='normal'
                    variant='outlined'
                  />
                </FormControl>
              </div>
              <div className='button'>
                <Button variant="contained" color="primary" onClick={this.submit} size="large">
                  Submit
                </Button>
              </div>
            </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}


export default withStyles(styles)(withRouter(AddOrg))

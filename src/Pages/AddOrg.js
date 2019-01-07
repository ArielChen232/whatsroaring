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

// Local
import Header from './Components/Header'
import HomeButton from './Components/HomeButton'
import theme from '../Assets/Theme'
import './Form.css'

const axios = require('axios')
const url = 'http://whatsroaring-api.herokuapp.com/'

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
      name: '',
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

  submit = () => {
    var url_event = url + 'createOrganization'
    console.log('Name: ' + this.state.name)

    var errors = []
    if (this.state.name === '') {
      errors.push('Enter a name for your organization.')
    }
    this.setState({ displayError: errors })

    if (errors.length === 0) {
      axios.post(url_event, {
        params: {
          name: this.state.name,
        }
      }).then((response) => {
        if (response.data === 'Created organization') {
          this.goBack()
        } else {
          console.log('error')
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div className='page'>
        <Header />
        <HomeButton />
        <MuiThemeProvider theme={theme}>
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

    /*return (
      <div className="AddOrg">
        <Header />
        <MuiThemeProvider theme={theme}>
          <div className='EventPaper'>

            <HomeButton />

            <Paper className='EventPaperInner'>
              <div className='header'>
                <Typography variant="h3" color="primary">
                  Add Organization
                </Typography>
              </div>
              <div className='InnerPageFields'>
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

              <div className='Button'>
                <Button variant="contained" color="primary" onClick={this.submit} size='large'>
                  Submit
                </Button>
              </div>
            </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    )*/
  }
}


export default withStyles(styles)(withRouter(AddOrg))

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AsyncSelect from 'react-select/lib/Async'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'

import theme from '../Assets/Theme'

//import DateTimePicker from 'react-datetime-picker'
import './AddOrg.css'

const axios = require('axios')
const url = 'http://whatsroaring-api.herokuapp.com/'
//const url = 'http://127.0.0.1:8000/'

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
    if (this.state.name == '') {
      errors.push('Enter a name for your event.')
    }
    this.setState({ displayError: errors })

    if (errors.length == 0) {
      axios.post(url_event, {
        params: {
          name: this.state.name,
        }
      }).then((response) => {
        if (response.data == 'Created organization') {
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
      <div className="addOrg">
          <h1> Add Organization </h1>

          <MuiThemeProvider theme={theme}>

            <div className='EventPaper'>

              <div className='ReturnButton'>
                <IconButton color='primary' onClick={this.goBack}>
                  <ArrowBack />
                </IconButton>
              </div>

              <Paper className='EventPaperInner'>
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
                  <Button variant="contained" color="primary" onClick={this.submit}>
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

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AsyncSelect from 'react-select/lib/Async'
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
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'

import theme from '../Assets/Theme'
import './CreateEventForm.css'
const axios = require('axios')
const url = 'http://127.0.0.1:8000/'

class CreateEventForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      isFree: 'No',
    }
  }

  componentDidMount() {

  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  render() {
    return(
      <div>
        <h1> Submit Event </h1>
        <div>
          <MuiThemeProvider theme={theme}>
            <div className="ReturnButton">
              <IconButton color="primary" onClick={this.goBack}>
                <ArrowBack />
              </IconButton>
            </div>
            <FormControl className="FormControl">
              <TextField
                label="Event Name"
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
              />
            </FormControl>
            <FormControl className="FormControl">
              <InputLabel>Free?</InputLabel>
              <Select
                value={this.state.isFree}
                onChange={this.handleChange('isFree')}
              >
                <MenuItem value={'No'}>No</MenuItem>
                <MenuItem value={'Yes'}>Yes</MenuItem>
              </Select>
            </FormControl>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }


}

export default withRouter(CreateEventForm)

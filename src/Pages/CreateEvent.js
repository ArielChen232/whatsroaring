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
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormHelperText from '@material-ui/core/FormHelperText'

import theme from '../Assets/Theme'

import DateTimePicker from 'react-datetime-picker'
import './CreateEvent.css'

const axios = require('axios')
const url = 'whatsroaring-api.herokuapp.com'

class CreateEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      org: '',
      category: '',
      description: '',
      location: '',
      isFree: null,
      website:'',
      startTime: null,
      endTime: null,
      displayError: []
    }
  }

  goBack = () => {
    this.props.history.goBack()
  }

  handleChange = name => event => {
    console.log(name)
    this.setState({
      [name]: event.target.value,
    })
  }

  handleDateChange = name => date => {
    console.log(name)
    this.setState({
      [name]: date
    })
  }

  submitEvent = () => {
    var errors = []
    if (this.state.name == '') {
      errors.push('Enter a name for your event.')
    }
    if (this.state.organization == '') {
      errors.push('Enter an organization for your event.')
    }
    if (this.state.location == '') {
      errors.push('Enter a location for your event.')
    }
    if (this.state.startTime == null) {
      errors.push('Enter a start time for your event.')
    }
    if (this.state.endTime == null) {
      errors.push('Enter an end time for your event.')
    }
    this.setState({ displayError: errors })

    if (errors.length == 0) {
      axios.post('${url}/createEvent', {
        params: {
          name: this.state.name,
          org: this.state.org,
          cat: this.state.category,
          start_datetime: this.state.startTime,
          end_datetime: this.state.endTime,
          location: this.state.location,
          website: this.state.website,
          description: this.state.description,
          is_free: this.state.isFree
        }
      }).then((response) => {
        if (response.data == 'Done') {
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
    return (
      <div>
        <h1> Create Event </h1>

        <MuiThemeProvider theme={theme}>

          <div className='EventPaper'>

            <div className='ReturnButton'>
              <IconButton color='primary' onClick={this.goBack}>
                <ArrowBack />
              </IconButton>
            </div>

            <Paper className='EventPaperInner'>
              <FormControl>
                <TextField
                  id='event-name'
                  label='Event Name'
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  margin='normal'
                  variant='outlined'
                />

                <TextField
                  id='event-description'
                  label='Description'
                  value={this.state.description}
                  onChange={this.handleChange('description')}
                  margin='normal'
                  variant='outlined'
                />

                <TextField
                  id='event-location'
                  label='Event Location'
                  value={this.state.location}
                  onChange={this.handleChange('location')}
                  margin='normal'
                  variant='outlined'
                />

                <TextField
                  id='event-website'
                  label='Event Website'
                  value={this.state.website}
                  onChange={this.handleChange('website')}
                  margin='normal'
                  variant='outlined'
                />

                <Typography variant="h5" component="h3" color="primary">
                  Start date/time
                </Typography>
                <DateTimePicker 
                  value={this.state.startTime}
                  onChange={this.handleDateChange('startTime')}
                />

                <Typography variant="h5" component="h3" color="primary">
                  End date/time
                </Typography>
                <DateTimePicker 
                  value={this.state.endTime}
                  onChange={this.handleDateChange('endTime')}
                />

              </FormControl>

            </Paper>

            <Divider />

            <Paper className='EventPaperInner'>
              <FormControl>
                <InputLabel htmlFor="outlined-isfree-simple">
                  Free?
                </InputLabel>
                <Select
                  value={this.state.isFree}
                  onChange={this.handleChange('isFree')}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="outlined-org-simple">
                  Organization
                </InputLabel>
                <Select
                  value={this.state.org}
                  onChange={this.handleChange('org')}
                >
                  <MenuItem value={'PUFSC'}>PUFSC</MenuItem>
                  <MenuItem value={'Department of Music'}>Department of Music</MenuItem>
                  <MenuItem value={'Princeton Triangle Club'}>Princeton Triangle Club</MenuItem>
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="outlined-category-simple">
                  Category
                </InputLabel>
                <Select
                  value={this.state.category}
                  onChange={this.handleChange('category')}
                >
                  <MenuItem value={'music'}>music</MenuItem>
                  <MenuItem value={'theater'}>theater</MenuItem>
                  <MenuItem value={'academic'}>academic</MenuItem>
                </Select>
              </FormControl>
            </Paper>

            <Paper className='EventPaperInner'>
              <Button variant="contained" color="primary" onClick={this.submitEvent}>
                Submit Event
              </Button>
            </Paper>

          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}


export default withRouter(CreateEvent)

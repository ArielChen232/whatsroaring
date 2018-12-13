import React, { Component } from 'react'
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

import DateTimePicker from 'react-datetime-picker'
import './CreateEvent.css'

const axios = require('axios')
//const url = 'whatsroaring-api.herokuapp.com'
const url = 'http://127.0.0.1:8000/'
const categories = [
  'music',
  'sports',
  'theater',
]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class CreateEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      org: '',
      category: [],
      description: '',
      location: '',
      isFree: 'no',
      website:'',
      startTime: '',
      endTime: '',
      displayError: [],
      categories: [],
      organizations: []
    }
  }

  componentDidMount() {
    // Fill categories menu
    var url_cats = url + 'getCategories'
    var cats_arr = []
    axios.get(url_cats).then(res => {
      var cats = res.data.cats
      for (var i = 0; i < cats.length; i++) {
        cats_arr.push(cats[i])
      }
      this.setState({categories: cats_arr})
      console.log(this.state.categories)
    }).catch(err => {
      console.log(err)
    })

    // Fill organizations menu
    var url_orgs = url + 'getOrganizations'
    var orgs_arr = []
    axios.get(url_orgs).then(res => {
      var orgs = res.data.orgs
      for (var i = 0; i < orgs.length; i++) {
        orgs_arr.push(orgs[i])
      }
      orgs_arr.sort()
      this.setState({organizations: orgs_arr})
      console.log(this.state.organizations)
    }).catch(err => {
      console.log(err)
    })

  }

  goBack = () => {
    this.props.history.goBack()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleDateChange = name => date => {
    this.setState({
      [name]: date
    })
  }

  submitEvent = () => {
    var url_event = url + 'createEvent'
    console.log('Name: ' + this.state.name)
    console.log('Org: ' + this.state.org)
    console.log('Category: ' + this.state.category)
    console.log('Start time: ' + this.state.startTime)
    console.log('End time: ' + this.state.endTime)
    console.log('Website: ' + this.state.website)
    console.log('Description: ' + this.state.description)
    console.log('Is free: ' + this.state.isFree)

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
      axios.post(url_event, {
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
        },
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
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
                  {this.state.organizations.map(organization => (
                    <MenuItem key={organization} value={organization}>
                      {organization}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="select-multiple-checkbox">Category</InputLabel>
                <Select
                  multiple
                  value={this.state.category}
                  onChange={this.handleChange('category')}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {this.state.categories.map(category => (
                    <MenuItem key={category} value={category}>
                      <Checkbox checked={this.state.category.indexOf(category) > -1} />
                      <ListItemText primary={category} />
                    </MenuItem>
                  ))}
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

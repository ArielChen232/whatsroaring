import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// Material-UI
import { withStyles } from '@material-ui/core/styles'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

// Local
import Theme from '../Assets/Theme'
import Header from './Components/Header'
import HomeButton from './Components/HomeButton'
import './Form.css'

const axios = require('axios')
const url = 'http://whatsroaring-api.herokuapp.com/'
//const url ='http://127.0.0.1:8000/'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dateTimePicker: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  select: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 19,
  },
})

// https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
function isValidURL(str) {
  var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
  var regex = new RegExp(expression)
  return regex.test(str)
}

// Check if start date/time and end date/time are valid
function checkDates(startDate, endDate) {
  var today = new Date()
  var errMsgs = []
  if (startDate < today) {
    errMsgs.push('Start date/time should be after the current time.')
  }
  if (endDate <= startDate) {
    errMsgs.push('End date/time should be after the start date/time.')
  }
  return errMsgs
}

class EditEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: localStorage.getItem('email'),
      isAdmin: localStorage.getItem('isAdmin'),
      name: '',
      org: '',
      category: [],
      description: '',
      location: '',
      isFree: '',
      website:'',
      startTime: '',
      endTime: '',
      categories: [],
      organizations: [],
      missingFields: [],
      timeErrors: [],
      openErrorDialog: false,
      openSuccessDialog: false,
      openServerErrorDialog: false,
      openInvalidWebsiteDialog: false,
      openInvalidTimesDialog: false,
      openDuplicateEventDialog: false,
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
    }).catch(err => {
      console.log(err)
    })

    if (this.props.cat === null || this.props.cat === undefined) {
      this.setState({ category: [] })
    } else {
      this.setState({ category: this.props.cat })
    }

    if (this.props.desc === null || this.props.desc === undefined) {
      this.setState({ description: '' })
    } else {
      this.setState({ description: this.props.desc })
    }

    if (this.props.loc === null || this.props.loc === undefined) {
      this.setState({ location: '' })
    } else {
      this.setState({ location: this.props.loc })
    }

    if (this.props.website === null || this.props.website === undefined) {
      this.setState({ website: '' })
    } else {
      this.setState({ website: this.props.website })
    }

    if (this.props.is_free === null || this.props.desc === undefined) {
      this.setState({ isFree: '' })
    } else {
      this.setState({ isFree: this.props.is_free })
    }

    if (this.props.org === null || this.props.org === undefined) {
      this.setState({ org: '' })
    } else {
      this.setState({ org: this.props.org })
    }

    if (this.props.start === null || this.props.start === undefined) {
      this.setState({ startTime: '' })
    } else {
      var startDate = new Date(this.props.start)
      var startStr = startDate.toISOString()
      this.setState({ startTime: startStr.substring(0, startStr.length-1) })
    }

    if (this.props.end === null || this.props.end === undefined) {
      this.setState({ endTime: '' })
    } else {
      var endDate = new Date(this.props.end)
      var endStr = endDate.toISOString()
      this.setState({ endTime: endStr.substring(0, endStr.length-1) })
    }

    console.log('Name: ' + this.props.title)
    console.log('Description: ' + this.props.desc)
    console.log('Location: ' + this.props.loc)
    console.log('Website: ' + this.props.website)
    console.log('Start Time: ' + this.props.start)
    console.log('End Time: ' + this.props.end)
    console.log('Organization: ' + this.props.org)
    console.log('Categories: ' + this.props.cat)
    console.log('Is Free: ' + this.props.is_free)

    this.setState({ name: this.props.title })
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
      [name]: date.target.value
    })
  }

  handleCloseDialog = () => {
    this.setState({ openErrorDialog: false })
  }

  handleCloseServerErrorDialog = () => {
    this.setState({ openServerErrorDialog: false })
  }

  handleCloseSuccessDialog = () => {
    this.setState({ openSuccessDialog: false })
    this.props.history.push('/calendar')
  }

  handleCloseInvalidWebsiteDialog = () => {
    this.setState({ openInvalidWebsiteDialog: false })
  }

  handleCloseInvalidTimesDialog = () => {
    this.setState({ openInvalidTimesDialog: false })
  }

  handleCloseDuplicateEventDialog = () => {
    this.setState({ openDuplicateEventDialog: false })
  }

  submitEvent = () => {
    var url_event = url + 'submitEvent'
    console.log('Name: ' + this.state.name)
    console.log('Org: ' + this.state.org)
    console.log('Category: ' + this.state.category)
    console.log('Start time: ' + this.state.startTime)
    console.log('End time: ' + this.state.endTime)
    console.log('Website: ' + this.state.website)
    console.log('Description: ' + this.state.description)
    console.log('Is free: ' + this.state.isFree)

    // Check fields
    var errors = []
    if (!this.state.name.replace(/\s/g, '').length) {
      errors.push('event name')
    }
    if (!this.state.description.replace(/\s/g, '').length) {
      errors.push('description')
    }
    if (!this.state.location.replace(/\s/g, '').length) {
      errors.push('location')
    }
    if (!this.state.startTime.replace(/\s/g, '').length) {
      errors.push('start time')
    }
    if (!this.state.endTime.replace(/\s/g, '').length) {
      errors.push('end time')
    }
    if (!this.state.org.replace(/\s/g, '').length) {
      errors.push('organization')
    }
    if (this.state.category.length == 0) {
      errors.push('category')
    }
    if (this.state.isFree === '') {
      errors.push('is free')
    }

    var timeErrs = checkDates(
      new Date(this.state.startTime),
      new Date(this.state.endTime))

    if (errors.length > 0) {
      // Missing fields
      this.setState({
        missingFields: errors,
        openErrorDialog: true
      })
    } else if (this.state.website !== ''
               && !isValidURL(this.state.website)) {
      // Invalid website URL
      this.setState({
        openInvalidWebsiteDialog: true
      })
    } else if (timeErrs.length > 0) {
      // Invalid times
      this.setState({
        timeErrors: timeErrs,
        openInvalidTimesDialog: true
      })
    } else {
      axios.post(url_event, {
        params: {
          old_name: this.props.title,
          old_starttime: this.props.start,
          name: this.state.name,
          org: this.state.org,
          cat: this.state.category,
          start_datetime: this.state.startTime,
          end_datetime: this.state.endTime,
          location: this.state.location,
          website: this.state.website,
          description: this.state.description,
          is_free: this.state.isFree,
          email: this.state.email,
        }
      }).then((response) => {
        if (response.data === 'Edited event') {
          this.setState({ openSuccessDialog: true })
        } else if (response.data === 'Duplicate event') {
          this.setState({ openDuplicateEventDialog: true })
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
          open={this.state.openErrorDialog}
          onClose={this.handleCloseDialog}
        >
          <DialogTitle id="alert-dialog-title">
            {'Missing required fields'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The following fields are missing: {this.state.missingFields.join(', ')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openSuccessDialog}
          onClose={this.handleCloseSuccessDialog}
        >
          <DialogTitle id="alert-dialog-title">
            {'Success'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your event has been submitted. Please refresh the calendar to see your event.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseSuccessDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openServerErrorDialog}
          onClose={this.handleCloseServerErrorDialog}
        >
          <DialogTitle id="alert-dialog-title">
            {'Error'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              There was an error submitting your event.
              Please contact someone on the administrative team for help.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseServerErrorDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openInvalidWebsiteDialog}
          onClose={this.handleCloseInvalidWebsiteDialog}
        >
          <DialogTitle>
            {'Invalid Website'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please provide a valid website link (e.g., "https://whatsroaring.herokuapp.com")
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleCloseInvalidWebsiteDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openInvalidTimesDialog}
          onClose={this.handleCloseInvalidTimesDialog}
        >
          <DialogTitle>
            {'Invalid Times'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.timeErrors.join(' ')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleCloseInvalidTimesDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openDuplicateEventDialog}
          onClose={this.handleCloseDuplicateEventDialog}
        >
          <DialogTitle>
            {'Duplicate Event'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              An event with this name and start time already exists.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleCloseDuplicateEventDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  render() {
    const { classes } = this.props

    if (this.state.email === null) {
      this.props.history.push('/')
    }
    if (this.state.isAdmin === 'false') {
      console.log('Going to calendar')
      this.props.history.push('/calendar')
    }

    return (
      <div className='page'>
        <Header />
        <HomeButton />
        <MuiThemeProvider theme={Theme}>
          {this.renderDialogs()}
          <div className='main'>
            <Paper className='paper'>
              <div className='title'>
                <Typography variant="h3" color="primary">
                  Edit Event
                </Typography>
              </div>
              <div className='form'>
                <FormControl>
                  <TextField
                    required
                    id='event-name'
                    label='Event Name'
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin='normal'
                    variant='outlined'
                  />

                  <TextField
                    required
                    id='event-description'
                    label='Description'
                    className={classes.textField}
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    margin='normal'
                    variant='outlined'
                  />

                  <TextField
                    required
                    id='event-location'
                    label='Location'
                    className={classes.textField}
                    value={this.state.location}
                    onChange={this.handleChange('location')}
                    margin='normal'
                    variant='outlined'
                  />

                  <TextField
                    id='event-website'
                    label='Website'
                    className={classes.textField}
                    value={this.state.website}
                    onChange={this.handleChange('website')}
                    margin='normal'
                    variant='outlined'
                  />

                  <TextField
                    required
                    id="datetime-local"
                    label="Start Date & Time"
                    type="datetime-local"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={this.state.startTime}
                    onChange={this.handleDateChange('startTime')}
                  />

                  <TextField
                    required
                    id="datetime-local"
                    label="End Date & Time"
                    type="datetime-local"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={this.state.endTime}
                    onChange={this.handleDateChange('endTime')}
                  />
                </FormControl>
              </div>
              <div className='form'>
                <FormControl>
                  <InputLabel htmlFor="outlined-org-simple">
                    Organization *
                  </InputLabel>
                  <Select
                    value={this.state.org}
                    onChange={this.handleChange('org')}
                    className={classes.select}
                  >
                    {this.state.organizations.map(organization => (
                      <MenuItem key={organization} value={organization}>
                        {organization}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor="select-multiple-checkbox">Category *</InputLabel>
                  <Select
                    multiple
                    value={this.state.category}
                    onChange={this.handleChange('category')}
                    input={<Input id="select-multiple-checkbox" />}
                    renderValue={selected => selected.join(', ')}
                    className={classes.select}
                    MenuProps={MenuProps}
                  >
                    {this.state.categories.map(category => (
                      <MenuItem key={category} value={category}>
                        <Checkbox checked={this.state.category.indexOf(category) > -1} color='primary'/>
                        <ListItemText primary={category} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor="outlined-isfree-simple">
                    Free? *
                  </InputLabel>
                  <Select
                    value={this.state.isFree}
                    onChange={this.handleChange('isFree')}
                    className={classes.select}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='button'>
                <Button variant="contained" color="primary" onClick={this.submitEvent} size="large">
                  Submit Edits
                </Button>
              </div>
            </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    title: state.eventReducer.title,
    start: state.eventReducer.start,
    end: state.eventReducer.end,
    desc: state.eventReducer.desc,
    loc: state.eventReducer.loc,
    website: state.eventReducer.website,
    org: state.eventReducer.org,
    is_free: state.eventReducer.is_free,
    cat: state.eventReducer.cat
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(EditEvent)))

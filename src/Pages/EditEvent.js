import React, { Component } from 'react'
import moment from 'moment-timezone'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Grade from '@material-ui/icons/Grade'
import Share from '@material-ui/icons/Share'

// Material-UI
import { withStyles } from '@material-ui/core/styles'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
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
import Divider from '@material-ui/core/Divider'

import './Form.css'
// import Favorite from './Components/Favorite'

// Local
import Theme from '../Assets/Theme'
import Header from './Components/Header'
import HomeButton from './Components/HomeButton'
import CreateEvent from './CreateEvent'
import './Form.css'

const axios = require('axios')
const url = 'http://whatsroaring-api.herokuapp.com/'

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
      console.log('Start time: ' + this.state.startTime.toLocaleString())
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
        }
      }).then((response) => {
        if (response.data === 'Created event') {
          this.setState({
            openSuccessDialog: true
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
      </div>
    )
  }

  render() {
    const { classes } = this.props

    return (
      <CreateEvent/>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeToDetails: (event, month, organizations, categories, locations, checked_free, checked_fav) => dispatch({
      type: 'changeToDetails',
      payload: {
        title: event.title,
        start: event.start,
        end: event.end,
        desc: event.desc,
        loc: event.loc,
        website: event.website,
        org: event.org,
        is_free: event.is_free,
        cat: event.cat,
        month: month,
        categories_selected: categories,
        organizations_selected: organizations,
        locations_selected: locations,
        changed_view: true,
        checked_free: checked_free,
        checked_fav: checked_fav
      }
    })
  }
}

export default withStyles(styles)(withRouter(EditEvent))

import React, { Component } from 'react'
import moment from 'moment-timezone'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Grade from '@material-ui/icons/Grade'
import Share from '@material-ui/icons/Share'
import Event from '@material-ui/icons/Event'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Theme from '../Assets/Theme'
import { MuiThemeProvider } from '@material-ui/core/styles'
import './Details.css'
// import Favorite from './Components/Favorite'
import axios from 'axios'

import Header from './Components/Header'

// const url = 'http://whatsroaring-api.herokuapp.com/'
const url = 'http://localhost:8000/'

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Arch Sing',
      start: new Date(2018, 10, 18, 13, 0, 0),
      end: new Date(2018, 10, 18, 15, 0, 0),
      desc: 'Arch sing by the Princeton Nassoons',
      loc: '1897 Arch',
      website: 'http://www.nassoons.com/',
      org: 'Princeton Nassoons',
      cat: 'Music',
      is_free: true,
      email: localStorage.getItem('email'),
      openErrorDialog: false,
      openDeletedDialog: false,
      openFavoritedDialog: false,
      errorType: null,
      canEdit: null
    }
  }

  goToCalendar = () => {
    this.props.changeToCalendar(
      this.props.month,
      this.props.organizations_selected,
      this.props.categories_selected,
      this.props.locations_selected,
      this.props.checked_free,
      this.props.checked_fav,
    )
    this.props.history.push('/calendar')
  }


  favorite = () => {
    var url_favorite = url + 'addFavorite'
    var dtform = "ddd, DD MMM YYYY HH:mm:ss"
    var start = moment.tz(this.props.start, 'GMT').format(dtform) + ' GMT'
    axios.post(url_favorite, {params: {
        email: this.state.email,
        name: this.props.title,
        start_datetime: start
      }
    }).then((response) => {
        if (response.data === 'Success') 
          this.setState({openFavoritedDialog: true})
        else {
          this.setState({openErrorDialog: true})
          this.setState({errorType: 'favorite'}) 
        }
    }).catch((error) => {
        this.setState({openErrorDialog: true})
        this.setState({errorType: 'favorite'})
    })
    

  }

  edit = () => {
    var dtform = "ddd, DD MMM YYYY HH:mm:ss"
    var start = moment.tz(this.props.start, 'GMT').format(dtform) + ' GMT'
    this.props.history.push('/editEvent?name=' + this.props.title + '&start_datetime=' + start)
  }

  delete = () => {
    console.log('delete')
    var url_delete = url + 'deleteEvent'
    var dtform = "ddd, DD MMM YYYY HH:mm:ss"
    var start = moment.tz(this.props.start, 'GMT').format(dtform) + ' GMT'
    axios.post(url_delete, {params: {
          name: this.props.title,
          start_datetime: start
        }
      }).then((response) => {
          if (response.data === 'Success') 
            this.setState({openDeletedDialog: true})
          else {
            this.setState({openErrorDialog: true})
            this.setState({errorType: 'delete'}) 
          }
      }).catch((error) => {
          this.setState({openErrorDialog: true})
          this.setState({errorType: 'delete'})
      })
  }

  export = () => {
    var url = 'http://www.google.com/calendar/render?action=TEMPLATE'
    var dtform = "YYYYMMDD\THHmmss"

    var title = this.props.title
    title = title.replace(/ /g,"+");

    var start = moment.tz(this.props.start, 'GMT').format(dtform)
    var end = moment.tz(this.props.end, 'GMT').format(dtform)
    var details = this.props.desc
    var location = this.props.loc

    url = url + '&text=' + title + '&dates=' + start + 'Z/' + end + 'Z' 

    if (location != null && location != '') {
      location = location.replace(/ /g,"+");
      url = url + '&location=' + location
    }

    if (details != null && details != '') {
      details = details.replace(/ /g,"+");
      url = url + '&details=' + details
    }

    url = url + '&sf=true&output=xml'

    window.open(url);

  }

  handleCloseErrorDialog = () => {
    this.setState({ openErrorDialog: false })
  }

  handleCloseDeletedDialog = () => {
    this.props.history.push('/calendar')
  }

  handleCloseFavoritedDialog = () => {
    this.setState({ openFavoritedDialog: false })
  }

  renderDialog() {
    var message
    if (this.state.errorType === 'delete') 
      message = 'There was an error deleting your event.'
    else if (this.state.errorType === 'favorite')
      message = 'There was an error favoriting your event.'
    else message = 'There was an error loading this page. '
    return (
      <div className='dialogs'>
        <Dialog
          open={this.state.openErrorDialog}
          onClose={this.handleCloseErrorDialog}
        >
          <DialogTitle id="alert-dialog-title">
            {'Error'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message} 
              Please contact someone on the administrative team for help.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseErrorDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openDeletedDialog}
          onClose={this.handleCloseDeletedDialog}
        >
          <DialogTitle id="alert-dialog-title">
            {'Success'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This event has successfully been deleted.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDeletedDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.openFavoritedDialog}
          onClose={this.handleCloseFavoritedDialog}
        >
          <DialogTitle id="alert-dialog-title">
            {'Success'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This event has successfully been favorited.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseFavoritedDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  renderEditButtons() {
    if (this.state.canEdit === null) {
      var dtform = "ddd, DD MMM YYYY HH:mm:ss"
      var start = moment.tz(this.props.start, 'GMT').format(dtform) + ' GMT'
      var url_canEdit = url + 'checkAdminEvent'
      axios.post(url_canEdit, {params: {
          email: this.state.email,
          name: this.props.title,
          start_datetime: start
        }
      }).then((response) => {
          if (response.data === 'True') this.setState({canEdit: true})
          else this.setState({canEdit: false})
      }).catch((error) => {
          this.setState({openErrorDialog: true})
          this.setState({canEdit: false})
      })
    }
    if (this.state.canEdit === true) {
      return(
        <div>
          <IconButton color="primary" onClick={this.edit}>
            <Edit />
          </IconButton>
          <IconButton color="primary" onClick={this.delete}>
            <Delete />
          </IconButton>
        </div>
      )
    }
    else return(<div></div>)
  }

  render() {

    if (this.state.email === null) this.props.history.push('/')
    
    console.log(this.props)

    // Get event title.
    var title = this.props.title
    if (title === null || title === '') {
      title = 'Untitled Event'
    }

    // Get event description.
    var desc = this.props.desc

    // Get event time.
    var startTime = this.props.start
    var endTime = this.props.end
    var timeString = ''
    if (startTime != null && endTime != null) {
      timeString = startTime.toLocaleString() + ' \u2014 ' + endTime.toLocaleString()
    } else {
      timeString = 'unknown'
    }

    // Get event website.
    var website = this.props.website
    var websiteTitle = ''
    if (website !== null && website !== '') {
      if (!(website.includes('http://www.') 
            || website.includes('https://www.') 
            || website.includes('www.')
            || website.includes('https://'))) {
        website = 'http://' + website
      }
      websiteTitle = 'Website:'
    }

    // Get event location.
    var location = this.props.loc
    var locationTitle = 'Location:'
    if (location === null || location === '') {
      location = 'unknown'
    }

    // Get event is_free.
    var freeText = ''
    if (this.props.is_free) {
      freeText = 'This is a free event!'
    }

    // Get event organization.
    var organization = this.props.org
    var organizationTitle = 'Organization:'
    if (organization === null || organization === '' || typeof(organization) === 'undefined') {
      organizationTitle = ''
      organization = ''
    }

    // Get event category.
    var categories = this.props.cat
    var categoriesTitle = 'Event Type:'
    if (categories === null || typeof(categories) === 'undefined') {
      categoriesTitle = ''
      categories = ''
    } else {
      categories = categories.toString().replace(',', ', ')
    }

    return (
      <div className='page'>
        <Header />
        <MuiThemeProvider theme={Theme}>
          {this.renderDialog()}
          <div className='buttons'>
            <Grid
              container
              justify='space-between'
              alignItems='baseline'
            >
              <Grid item xs={6}>
                <div className='backButton'>
                  <IconButton color="primary" onClick={this.goToCalendar}>
                    <ArrowBack />
                  </IconButton>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="favButtons">
                  <IconButton color="primary" onClick={this.favorite}>
                    <Grade />
                  </IconButton>
                  <IconButton color="primary" onClick={this.export}>
                    <Event />
                  </IconButton>
                  {this.renderEditButtons()}
                </div>
              </Grid>
            </Grid>
          </div>

          <div className='details'>
            <Grid container>
              <Grid item xs={12} className="paper">
                <Paper elevation={1}>
                  <div className='paperUpper'>
                    <div className='text'>
                      <Typography variant="h4" color="primary">
                        {title}
                      </Typography>
                    </div>
                    <div className='text'>
                      <Typography variant="h5" color="default">
                        {desc}
                      </Typography>
                    </div>
                  </div>
                  <Divider />
                  <Divider />
                  <div className='paperLower'>
                    <div className='text'>
                      <Typography variant="h5" color="primary">
                        Time: 
                      </Typography>
                      <Typography variant="h5" color="default">
                        {timeString}
                      </Typography>
                    </div>
                    <div className='text'>
                      <Typography variant="h5" color="primary">
                        {locationTitle}
                      </Typography>
                      <Typography variant="h5" color="default">
                        {location}
                      </Typography>
                    </div>
                    <div className='text'>
                      <Typography variant="h5" color="primary">
                        {organizationTitle}
                      </Typography>
                      <Typography variant="h5" color="default">
                        {organization}
                      </Typography>
                    </div>
                    <div className='text'>
                      <Typography variant="h5" color="primary">
                        {categoriesTitle}
                      </Typography>
                      <Typography variant="h5" color="default">
                        {categories}
                      </Typography>
                    </div>
                    <div className='text'>
                      <Typography variant="h5" color="primary">
                        {websiteTitle}
                      </Typography>
                      <Typography variant="h5" color="default">
                        <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
                      </Typography>
                    </div>
                    <div className='text'>
                      <Typography variant="h5" color="default">
                        {freeText}
                      </Typography>
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
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
    cat: state.eventReducer.cat,
    month: state.calReducer.month,
    organizations: state.calReducer.organizations_selected,
    categories: state.calReducer.categories_selected,
    locations: state.calReducer.locations_selected,
    checked_free: state.calReducer.checked_free,
    checked_fav: state.calReducer.checked_fav
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeToCalendar: (month, organizations, categories, locations, checked_free, checked_fav) => dispatch({
      type: 'changeToCalendar',
      payload: {
        month: month,
        organizations_selected: organizations,
        categories_selected: categories,
        locations_selected: locations,
        changed_view: true,
        checked_free: checked_free,
        checked_fav: checked_fav,
      }
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Details))

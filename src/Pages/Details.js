import React, { Component } from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Done from '@material-ui/icons/Done'
import Clear from '@material-ui/icons/Clear'

import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Theme from '../Assets/Theme'
import { MuiThemeProvider } from '@material-ui/core/styles'
import './Details.css'

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
      is_free: true
    }
  }

  goToCalendar = () => {
    this.props.history.push('/')
  }

  render() {
    console.log(this.props)

    // Get event title.
    var title = this.props.title
    if (title == null || title == '') {
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
    if (website != null && website != '') {
      websiteTitle = 'Website:'
    }

    // Get event location.
    var location = this.props.loc
    var locationTitle = ''
    if (location != null) {
      locationTitle = 'Location:'
    }
    if (location == null || location == '') {
      location = 'unknown'
    }

    return (
      <MuiThemeProvider theme={Theme}>
        <div className="Page">
          <Grid item xs={1}>
            <IconButton color="primary" onClick={this.goToCalendar}>
              <ArrowBack />
            </IconButton>
          </Grid>
          <Grid container>
            <Grid item xs={11} className="MainPaper">
              <Paper elevation={1} >
                <div className="InnerPaperUpper">
                  <Typography variant="h4" component="h3" color="primary">
                    {title}
                  </Typography>
                  <Typography variant="h5" component="h3" color="default">
                    {desc}
                  </Typography>
                </div>
                <div className="InnerPaperDivider">
                  <Divider />
                  <Divider />
                </div>
                <Typography variant="h5" component="h3" color="primary">
                  Time:
                </Typography>
                <Typography variant="h5" component="h3" color="default">
                  {timeString}
                </Typography>
                <Typography variant="h5" component="h3" color="primary">
                  {locationTitle}
                </Typography>
                <Typography variant="h5" component="h3" color="default">
                  {location}
                </Typography>
                <Typography variant="h5" component="h3" color="primary">
                  {websiteTitle}
                </Typography>
                <Typography variant="h5" component="h3" color="default">
                  <a href={website}>{website}</a>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
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
    is_free: state.eventReducer.is_free
  }
}

const mapDispatchToProps = dispatch => {
  return {
    /*changeToDetails: (event) => dispatch({
      type: 'changeToDetails', 
      payload: {
        title: event.title, 
        start: event.start,
        end: event.end,
        desc: event.desc,
        location: event.location,
        website: event.website,
        org: event.org,
        is_free: event.is_free
      }
    })*/
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Details))

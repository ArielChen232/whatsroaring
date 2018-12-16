import React, { Component } from 'react'
import moment from 'moment-timezone'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Grade from '@material-ui/icons/Grade'
import Done from '@material-ui/icons/Done'
import Clear from '@material-ui/icons/Clear'

import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Theme from '../Assets/Theme'
import { MuiThemeProvider } from '@material-ui/core/styles'
import './Details.css'
// import Favorite from './Components/Favorite'
import axios from 'axios'

let imgUrl = 'sideways_background.png';

var sectionStyle = {
  width: "100%",
  height: "600px",
  backgroundImage: 'url(' + imgUrl + ')',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
};

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
      is_free: true,
      netid: ''
    }
  }

  goToCalendar = () => {
    this.props.history.push('/calendar')
  }

  favorite = () => {
    var url = 'http://whatsroaring-api.herokuapp.com/addFavorite'
    // var url = 'http://127.0.0.1:8000/addFavorite'
    var dtform = "ddd, DD MMM YYYY HH:mm:ss"
    var start = moment.tz(this.props.start, 'GMT').format(dtform) + ' GMT'
    console.log(start)
    url = url + "?user=" + sessionStorage.getItem('netid') + "&name=" + this.props.title + '&start_datetime=' + start
    axios.get(url)

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
    var locationTitle = 'Location'
    if (location == null || location == '') {
      location = 'unknown'
    }

    // Get event is_free.
    var freeText = ''
    if (this.props.is_free) {
      freeText = 'Free Event'
    }

    // Get event organization.
    var organization = this.props.org
    var organizationTitle = "Organization"
    if (organization == null || organization == '') {
      organization = 'unknown'
    }

    return (
      <div className="DetailsPage">
        <MuiThemeProvider theme={Theme}>

          <section style={ sectionStyle }>
          <div className="Page">

            <div class="buttons">
              <div class="backbutton">

                <IconButton color="primary" onClick={this.goToCalendar}>
                  <ArrowBack />
                </IconButton>
              </div>
              <div class="fav">
                <IconButton color="primary" onClick={this.favorite}>
                  <Grade />
                </IconButton>
              </div>
            </div>

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
                    {organizationTitle}
                  </Typography>
                  <Typography variant="h5" component="h3" color="default">
                    {organization}
                  </Typography>
                  <Typography variant="h5" component="h3" color="primary">
                    {websiteTitle}
                  </Typography>
                  <Typography variant="h5" component="h3" color="default">
                    <a href={website}>{website}</a>
                  </Typography>
                  <Typography variant="h5" component="h3" color="primary">
                    {freeText}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </div>

        </section>
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

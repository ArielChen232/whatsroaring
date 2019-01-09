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

import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Theme from '../Assets/Theme'
import { MuiThemeProvider } from '@material-ui/core/styles'
import './Details.css'
// import Favorite from './Components/Favorite'
import axios from 'axios'

import Header from './Components/Header'

class MyEvents extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  editThisEvent = (event) => {
    this.props.editThisEvent(
      event,
      this.state.month,
      this.state.organizations_selected,
      this.state.categories_selected,
      this.state.locations_selected,
      this.state.checkedFree,
      this.state.checkedFav)
    this.props.history.push('/editEvent')
  }

  renderMyEvents = () => {
    // if (this._isMounted === true) {
    //   for event in myEvents
    //   return (
    //     <div>
    // <div className='text'>
    //   <Typography variant="h4" color="primary">
    //     {title}
    //   </Typography>
    //     </div>
    //   )
    // }
  }

  render() {
    console.log(this.props)

    return (
      <div className='page'>
        <Header />
        <MuiThemeProvider theme={Theme}>
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
            </Grid>
          </div>

          <div className='MyEventsList'>
            {this.renderMyEvents()}
          </div>

        </MuiThemeProvider>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    changed_view: state.calReducer.changed_view,
    organizations_selected: state.calReducer.organizations_selected,
    categories_selected: state.calReducer.categories_selected,
    locations_selected: state.calReducer.locations_selected,
    month: state.calReducer.month,
    checked_free: state.calReducer.checked_free,
    checked_fav: state.calReducer.checked_fav,
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyEvents))

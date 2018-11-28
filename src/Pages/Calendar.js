import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'

// Styling
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'
import DropdownMultiple from './Components/DropdownMultiple'
import FilterForm from './Components/FilterForm'

const localizer = BigCalendar.momentLocalizer(moment)
//const url = 'https://whatsroaring-api.herokuapp.com/'
const url = 'http://127.0.0.1:8000/'
const orange = '#fb8c00'

function getOrgName(orgPk) {
  const url_orgName = url + 'getOrgName/' + orgPk
  axios.get(url_orgName).then(res => {
    const posts = JSON.parse(res.data.data)
    if (posts.length >= 1) {
      console.log('Org name: ' + posts[0].fields.name)
      return posts[0].fields.name
    }
  })
}

class Calendar extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      events: [],
      location: [
        {
          id: 0,
          title: 'Richardson',
          selected: false,
          key: 'location'
        },
        {
          id: 1,
          title: 'Baker Rink',
          selected: false,
          key: 'location'
        },
        {
          id: 2,
          title: 'McCarter Theater',
          selected: false,
          key: 'location'
        }
      ],
      eventtype: [
        {
          id: 0,
          title: 'Music',
          selected: false,
          key: 'eventtype'
        },
        {
          id: 1,
          title: 'Arts',
          selected: false,
          key: 'eventtype'
        },
        {
          id: 2,
          title: 'Sports',
          selected: false,
          key: 'eventtype'
        },
        {
          id: 3,
          title: 'Theater',
          selected: false,
          key: 'eventtype'
        }
      ],
      freeOrNot: [
        {
          id: 0,
          title: 'Free events only',
          selected: false,
          key: 'freeOrNot'
        }
      ]
     }
    this._isMounted = false
    this.eventStyleGetter = this.eventStyleGetter.bind(this)
  }

  toggleSelected = (id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp[id].selected = !temp[id].selected
    this.setState({
      [key]: temp
    })
    // THIS IS WHAT I ADDED
    var i;
    var locations = "";
    var freeornot = "";
    for (i = 0; i < this.state.location.length; i++) {
      if (this.state.location[i].selected == true) {
        locations += (this.state.location[i].title + ',');
      }
    }
    for (i = 0; i < this.state.freeOrNot.length; i++) {
      if (this.state.freeOrNot[i].selected = true) {
        freeornot = this.state.freeOrNot[i].selected;
      }
    }
    console.log(locations)
    console.log(freeornot)
    const url_getEvents = url + 'getEventsFilter'
    console.log(url_getEvents)
    // Repopulate calendar when things are toggled
    axios.get(url_getEvents, {
      params: {
        // CHANGE THIS BACK ONCE DROPDOWN IS FIXED
        // locations: locations
        locations: 'Richardson,McCarter Theater'
    }})
    .then(res => {
      console.log("reached this point")
      const posts = JSON.parse(res.data.Events_JSON)
      const events = [];
      posts.forEach(function(post){
        events.push({
          title: post.fields.name,
          start: new Date(post.fields.start_datetime),
          end: new Date(post.fields.end_datetime),
          desc: post.fields.description,
          loc: post.fields.location,
          website: post.fields.website,
          org: getOrgName(post.fields.org),
          is_free: post.fields.is_free
        })
      })
      this.setState({events})
      this._isMounted = true
    })
    .catch(function(error) {
      console.log(error);
      console.log(error.response.data);
    })
  }

  componentDidMount() {
    const url_getEvents = url + 'getEvents'
    axios.get(url_getEvents)
    .then(res => {
      const posts = JSON.parse(res.data.Events_JSON)
      const events = [];
      posts.forEach(function(post){
        events.push({
          title: post.fields.name,
          start: new Date(post.fields.start_datetime),
          end: new Date(post.fields.end_datetime),
          desc: post.fields.description,
          loc: post.fields.location,
          website: post.fields.website,
          org: getOrgName(post.fields.org),
          is_free: post.fields.is_free
        })
      })
      this.setState({events})
      this._isMounted = true
    })
    .catch(function(error) {
      console.log(error);
      console.log(error.response.data);
    })
  }

  seeDetails = (event) => {
    console.log('Org: ' + event.org)
    this.props.changeToDetails(event);
    this.props.history.push('/details')
  }

  eventStyleGetter(event) {
    var color = orange
    /* Can add logic here to color code */
    var style = {
      backgroundColor: color,
      opacity: 0.8,
      color: 'black',
      border: '0px'
    }
    return {
      style: style
    }
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <DropdownMultiple
            titleHelper="location"
            title="Select location"
            list={this.state.location}
            toggleItem={this.toggleSelected}
          />
          <DropdownMultiple
            titleHelper="event type"
            title="Select event type"
            list={this.state.eventtype}
            toggleItem={this.toggleSelected}
          />
          <DropdownMultiple
            titleHelper="free only"
            title="Free events only?"
            list={this.state.freeOrNot}
            toggleItem={this.toggleSelected}
          />
        </div>
        <div className='Calendar'>
          <BigCalendar
            localizer={localizer}
            events={this.state.events}
            defaultView={BigCalendar.Views.MONTH}
            onSelectEvent={this.seeDetails}
            views={['month', 'week', 'day']}
            eventPropGetter={(this.eventStyleGetter)}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    /*title: state.eventReducer.title,
    start: state.eventReducer.start,
    end: state.eventReducer.end,
    desc: state.eventReducer.desc,
    location: state.eventReducer.location,
    website: state.eventReducer.website,
    org: state.eventReducer.org,
    is_free: state.eventReducer.is_free*/
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeToDetails: (event) => dispatch({
      type: 'changeToDetails',
      payload: {
        title: event.title,
        start: event.start,
        end: event.end,
        desc: event.desc,
        loc: event.loc,
        website: event.website,
        org: event.org,
        is_free: event.is_free
      }
    })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Calendar))

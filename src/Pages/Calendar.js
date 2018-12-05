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
import LogInButton from './Components/LogInButton'
import AddEventButton from './Components/AddEventButton'

const localizer = BigCalendar.momentLocalizer(moment)
const url = 'https://whatsroaring-api.herokuapp.com/'
// const url = 'http://127.0.0.1:8000/'
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
      netid: '',
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
      category: [
        {
          id: 0,
          title: 'Music',
          selected: false,
          key: 'category'
        },
        {
          id: 1,
          title: 'Arts',
          selected: false,
          key: 'category'
        },
        {
          id: 2,
          title: 'Sports',
          selected: false,
          key: 'category'
        },
        {
          id: 3,
          title: 'Theater',
          selected: false,
          key: 'category'
        }
      ],
      freeOnly: [
        {
          id: 0,
          title: 'Free events only',
          selected: false,
          key: 'freeOnly'
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
    var i;
    var locations = "";
    var categories = "";
    var freeonly = "";
    for (i = 0; i < this.state.location.length; i++) {
      if (this.state.location[i].selected == true) {
        locations += (this.state.location[i].title + ',');
      }
    }
    for (i = 0; i < this.state.category.length; i++) {
      if (this.state.category[i].selected == true) {
        categories += (this.state.category[i].title + ',');
      }
    }
    if (this.state.freeOnly[0].selected == true) {
      freeonly = "true"
    }
    // remove trailing commas from strings
    locations = locations.substr(0, locations.length-1);
    categories = categories.substr(0, categories.length-1);

    console.log(locations)
    console.log(categories)
    console.log(freeonly)
    const url_getEvents = url + 'getEvents'
    console.log(url_getEvents)
    // Repopulate calendar when things are toggled
    axios.get(url_getEvents, {
      params: {
        locations: locations,
        categories: categories,
        is_free: freeonly
    }})
    .then(res => {
      console.log("reached this point")
      const posts = JSON.parse(res.data.Events_JSON)
      const events = [];
      posts.forEach((post) => {
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

  validate() {
    const query = new URLSearchParams(this.props.location.search)
    var ticket = query.get('ticket')
    if (ticket) {
      const url_netid = url + "netid?ticket=" + ticket
      axios.get(url_netid)
      .then(res => {
        this.setState({netid: res['data']})
      })
      .catch(function(error) {
        console.log(error);
      })
    }
  }

  render() {
    var addEvent
    const adminList = ['rachelsc', '-']
    this.validate()
    const isAdmin = adminList.includes(this.state.netid)
    if (isAdmin) {
      addEvent = <AddEventButton/>
    }
    else {
      addEvent = <div></div>
    }
    return (
      <div>
        <div className="right-wrapper">
          <LogInButton/>
          {addEvent}
        </div>
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
            list={this.state.category}
            toggleItem={this.toggleSelected}
          />
          <DropdownMultiple
            titleHelper="free only"
            title="Free events only?"
            list={this.state.freeOnly}
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

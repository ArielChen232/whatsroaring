import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'

// Styling
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'


const localizer = BigCalendar.momentLocalizer(moment)
//const url = 'https://whatsroaring-api.herokuapp.com/'
const url = 'http://127.0.0.1:8001/'
const orange = '#fb8c00'

function getOrgName(orgPk) {
  const url_orgName = url + 'getOrgName/' + orgPk
  axios.get(url_orgName).then(res => {
    const posts = JSON.parse(res.data.data)
    if (posts.length >= 1) {
      return posts[0].fields.name
    }
  })
}

class Calendar extends Component {
  constructor(...args) {
    super(...args)
    this.state = { events: [] }
    this._isMounted = false
    this.eventStyleGetter = this.eventStyleGetter.bind(this)
  }

  componentDidMount() {
    const url_getEvents = url + 'getEvents'
    axios.get(url_getEvents).then(res => {
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

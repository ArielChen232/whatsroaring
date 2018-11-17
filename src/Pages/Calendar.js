import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import './Calendar.css'
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'


const localizer = BigCalendar.momentLocalizer(moment)
const url = 'https://whatsroaring-api.herokuapp.com/getEvents'
const orange = '#fb8c00'

class Calendar extends Component {
  constructor(...args) {
    super(...args)
    this.state = { events:[] }
    this.eventStyleGetter = this.eventStyleGetter.bind(this)
  }

  componentDidMount() {
    axios.get(url).then(res => {
      const posts = JSON.parse(res.data.Events_JSON)
      const events = [];
      posts.forEach(function(post){
        events.push({
          title: post.fields.name, 
          start: new Date(post.fields.start_datetime), 
          end: new Date(post.fields.end_datetime),
          desc: post.fields.description,
          location: post.fields.location,
          website: post.fields.website,
          org: post.fields.org,
          is_free: post.fields.is_free
        });
      });
      console.log(posts)
      this.setState({events})
    })
  }

  seeDetails = (event) => {
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
          // titleAccessor="fields.name"
          // startAccessor="fields.start_datetime"
          // endAccessor="fields.end_datetime"
        />
      </div>
    )
  }
}

export default withRouter(Calendar)

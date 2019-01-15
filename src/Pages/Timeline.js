import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Explore from '@material-ui/icons/Explore' // Discover
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline'
import FeedBack from '@material-ui/icons/Feedback'
import SyncProblem from '@material-ui/icons/SyncProblem'
import DoneOutline from '@material-ui/icons/DoneOutline'
import Visibility from '@material-ui/icons/Visibility'
import GridOn from '@material-ui/icons/GridOn'
import LaptopMac from '@material-ui/icons/LaptopMac'
import Wifi from '@material-ui/icons/Wifi'
import FindInPage from '@material-ui/icons/FindInPage'
import Create from '@material-ui/icons/Create'
import Feedback from '@material-ui/icons/Feedback'
import Edit from '@material-ui/icons/Edit'
import { Avatar, Icon } from '@material-ui/core';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

// Local
import Header from './Components/Header'
import HomeButton from './Components/HomeButton'
import theme from '../Assets/Theme'
import './About.css'

const axios = require('axios')
const url = 'http://whatsroaring-api.herokuapp.com/'

const styles = {
  largeIcon: {
    width: 60,
    height: 60,
  },
  font: {
    fontSize: 1.5,
  }
}


class Timeline extends Component {

  render() {
    const { classes } = this.props
    return (
      <div className='page'>
        <MuiThemeProvider theme={theme}>
          <div className='main'>
            <div className='title'>
              <Typography variant="h2" style={{fontWeight: 'bold'}} color="primary">
                Project Timeline
              </Typography>
            </div>

            <VerticalTimeline>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: '#fff', color: '#fb8c00' }}
                icon={<PlayCircleOutline />}
              >
                <h1 className="vertical-timeline-element-title" style={{fontWeight: 'bold', color: '#fb8c00'}}>Week 1</h1>
                <h3>
                  During the first week, our team worked on establishing a solid project overview plan. We articulated our goals and milestones.
                </h3>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: '#fff', color: '#fb8c00' }}
                icon={<GridOn />}
              >
                <h1 className="vertical-timeline-element-title" style={{fontWeight: 'bold', color: '#fb8c00'}}>Week 2</h1>
                <h3>
                  During the second week, we worked on database structure and design.
                </h3>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: '#fff', color: '#fb8c00' }}
                icon={<LaptopMac />}
              >
                <h1 className="vertical-timeline-element-title" style={{fontWeight: 'bold', color: '#fb8c00'}}>Week 3</h1>
                <h3>
                  During the third week the backend team worked on learning Django and setting up the database; the frontend team researched options for and implemented a calendar setup.
                </h3>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: '#fff', color: '#fb8c00' }}
                icon={<Wifi />}
              >
                <h1 className="vertical-timeline-element-title" style={{fontWeight: 'bold', color: '#fb8c00'}}>Week 4</h1>
                <h3>
                  During the fourth week, we split app the app into frontend and backend portions for easy deployability and worked on components for the frontend.
                </h3>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: '#fff', color: '#fb8c00' }}
                icon={<FindInPage />}
              >
                <h1 className="vertical-timeline-element-title" style={{fontWeight: 'bold', color: '#fb8c00'}}>Week 5</h1>
                <h3>
                  During the fifth week, we began implementing filtering capabilities and the ability to add events. We also added a page for viewing event details, and started working on graphic design.
                </h3>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: '#fff', color: '#fb8c00' }}
                icon={<SyncProblem />}
              >
                <h1 className="vertical-timeline-element-title" style={{fontWeight: 'bold', color: '#fb8c00'}}>Week 6</h1>
                <h3>
                  During the sixth week, we expanded our filtering abilities, fixed synchronization issues between the frontend and backend, and debugged several issues.
                </h3>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: '#fff', color: '#fb8c00' }}
                icon={<Create />}
              >
                <h1 className="vertical-timeline-element-title" style={{fontWeight: 'bold', color: '#fb8c00'}}>Week 7</h1>
                <h3>
                  During the seventh week, we worked on user authentication, improved the create events function, and worked on debugging and design
                </h3>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: '#fff', color: '#fb8c00' }}
                icon={<Edit />}
              >
                <h1 className="vertical-timeline-element-title" style={{fontWeight: 'bold', color: '#fb8c00'}}>Week 8</h1>
                <h3>
                  During the eighth week, we worked on user testing and getting user feedback from various people in the Princeton community. We started implementing user suggestions such as export to Google Calendar, dialog boxes to confirm user submissions, and better design.
                </h3>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: '#fff', color: '#fb8c00' }}
                icon={<Feedback />}
              >
                <h1 className="vertical-timeline-element-title" style={{fontWeight: 'bold', color: '#fb8c00'}}>Week 9</h1>
                <h3>
                  During the ninth week, we continued implementing the features that users wanted - calendar export etc.
                </h3>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: '#fff', color: '#fb8c00' }}
                icon={<DoneOutline />}
              >
                <h1 className="vertical-timeline-element-title" style={{fontWeight: 'bold', color: '#fb8c00'}}>Week 10</h1>
                <h3>
                  During the last week, we polished the app and implemented admin access and favoriting. We learned that CAS authentication was not suitable for our application, and devised an app-specific authentication method. We added ability to edit and delete events.
                </h3>
              </VerticalTimelineElement>

            </VerticalTimeline>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}


export default withStyles(styles)(withRouter(Timeline))

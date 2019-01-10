import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Explore from '@material-ui/icons/Explore' // Discover
import FindReplace from '@material-ui/icons/FindReplace' // Filter
import PlaylistAdd from '@material-ui/icons/PlaylistAdd' // Integrate

import { Timeline } from 'react-material-timeline';
import { Avatar, Icon } from '@material-ui/core';

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

const events = [
  {
    title: 'Week 1',
    description: [ 'During the first week, our team worked on establishing a solid project overview plan. We articulated our goals and milestones.' ],
    icon: <Avatar><Icon></Icon></Avatar>,
  },
  {
    title: 'Week 2',
    subheader: new Date().toString(),
    description: [ 'During the second week, we worked on database structure and design.' ],
    icon: <Avatar><Icon></Icon></Avatar>,
  },
  {
    title: 'Week 3',
    description: [ 'During the third week the backend team worked on learning Django and setting up the database; the frontend team researched options for and implemented a calendar setup.' ],
    icon: <Avatar><Icon></Icon></Avatar>,
  },
  {
    title: 'Week 4',
    description: [ 'During the fourth week, we split app the app into frontend and backend portions for easy deployability and worked on components for the frontend.' ],
    icon: <Avatar><Icon></Icon></Avatar>,
  },
  {
    title: 'Week 5',
    description: [ 'During the fifth week, we began implementing filtering capabilities and the ability to add events. We also added a page for viewing event details, and started working on graphic design.' ],
    icon: <Avatar><Icon></Icon></Avatar>,
  },
  {
    title: 'Week 6',
    description: [ 'During the sixth week, we expanded our filtering abilities, fixed synchronization issues between the frontend and backend, and debugged several issues.' ],
    icon: <Avatar><Icon></Icon></Avatar>,
  },
  {
    title: 'Week 7',
    description: [ 'During the seventh week, we worked on user authentication, improved the create events function, and worked on debugging and design' ],
    icon: <Avatar><Icon></Icon></Avatar>,
  },
  {
    title: 'Week 8',
    description: [ 'During the eigth week, we worked on user testing and getting user feedback from various people in the Princeton community. We started implementing user suggestions such as export to Google Calendar, dialog boxes to confirm user submissions, and better design.' ],
    icon: <Avatar><Icon></Icon></Avatar>,
  },
  {
    title: 'Week 9',
    description: [ 'During the ninth week, we continued implementing the features that users wanted - calendar export etc.' ],
    icon: <Avatar><Icon></Icon></Avatar>,
  },
  {
    title: 'Week 10',
    description: [ 'During the last week, we polished the app and finished implementing user suggestions. We learned that CAS authentication was not suitable for our application, and devised an app-specific authentication method. We added ability to edit events.' ],
    icon: <Avatar><Icon></Icon></Avatar>,
  }
];

class Documentation extends Component {

  render() {
    const { classes } = this.props
    return (
      <div className='page'>
        <Header />

        <MuiThemeProvider theme={theme}>
          <div className='main'>
            <HomeButton />
            <div className='title'>
              <Typography variant="h3" color="primary">
                Team Documentation
              </Typography>
            </div>

            <Timeline events={events}/>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}


export default withStyles(styles)(withRouter(Documentation))

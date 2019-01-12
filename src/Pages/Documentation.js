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
// import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
// import 'react-vertical-timeline-component/style.min.css';

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


class Documentation extends Component {

  render() {
    const { classes } = this.props
    return (
      <div className='page'>
        <MuiThemeProvider theme={theme}>
          <div className='main'>
            <div className='title'>
              <Typography variant="h2" style={{fontWeight: 'bold'}}  color="primary">
                Team Documentation
              </Typography>
            </div>
            [coming soon!]
            </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
export default withStyles(styles)(withRouter(Documentation))

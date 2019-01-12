import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Home from '@material-ui/icons/Home'
import Explore from '@material-ui/icons/Explore' // Discover
import FindReplace from '@material-ui/icons/FindReplace' // Filter
import PlaylistAdd from '@material-ui/icons/PlaylistAdd' // Integrate

// Local
import Header from './Components/Header'
import theme from '../Assets/Theme'
import './About.css'
import './Components/Button.css'

const styles = {
  largeIcon: {
    width: 60,
    height: 60,
  },
  font: {
    fontSize: 1.5,
  }
}

class About extends Component {
  goToLanding = () => {
    this.props.history.push('/')
  }

  render() {
    const { classes } = this.props
    return (
      <div className='page'>
        <MuiThemeProvider theme={theme}>
          <div className='main'>
            <div className='title'>
              <Typography variant="h2" style={{fontWeight: 'bold'}} color="primary">
                About WhatsRoaring
              </Typography>
            </div>

            <div className='about'>
              <Typography variant='h4'>
                WhatsRoaring is your one-stop-shop for events in Princeton.
              </Typography>

              <br/>

              <br/>

              <div className='icons'>
                <Grid container>
                  <Grid item xs={4}>
                    <Explore className={classes.largeIcon} color='primary' />
                    <Typography variant='h4' color='primary'>
                      Discover
                    </Typography>
                    <br></br>
                    <Typography variant='h5'>
                      Discover events happening around campus and around town.
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <FindReplace className={classes.largeIcon} color='primary' />
                    <Typography variant='h4' color='primary'>
                      Filter
                    </Typography>
                    <br></br>
                    <Typography variant='h5'>
                      Filter events based on your interests and availability.
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <PlaylistAdd className={classes.largeIcon} color='primary' />
                    <Typography variant='h4' color='primary'>
                      Integrate
                    </Typography>
                    <br></br>
                    <Typography variant='h5'>
                      Integrate events into your personal calendar and add events to the community calendar.
                    </Typography>
                  </Grid>
                </Grid>
              </div>
              <br></br>
              <div className='description'>
              <Typography variant='h6'>
                WhatsRoaring was designed by five Princeton students who wanted to streamline
                the process of finding and saving events for Princeton students.
                Once you create a free account, you can browse events happening around Princeton
                campus and Princeton town and filter events based on your interests, such as
                Arts or Athletics. You can also favorite events and export them to your
                Google Calendar.

                If you're a member of an approved Princeton organization, you may register
                for administrative access. As an event administrator, you can add your
                organization's events to our community calendar.

                Shoutout to Leora Huebner '19 for coming up with our project name.
              </Typography>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}


export default withStyles(styles)(withRouter(About))

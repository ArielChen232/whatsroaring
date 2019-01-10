import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Material-UI
import { withStyles } from '@material-ui/core/styles'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Explore from '@material-ui/icons/Explore' // Discover
import FindReplace from '@material-ui/icons/FindReplace' // Filter
import PlaylistAdd from '@material-ui/icons/PlaylistAdd' // Integrate

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

class Team extends Component {

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
                The WhatsRoaring Team
              </Typography>
            </div>

            <div className='about'>
              <div className='icons'>
                <Grid container>

                  <Grid item xs={4}>
                    <Typography variant='h4' color='primary'>
                      Ariel Chen '20
                    </Typography>
                    <br></br>
                    <Typography variant='subtitle1'>
                      Front-end
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant='h4' color='primary'>
                      Becky Barber '20
                    </Typography>
                    <br></br>
                    <Typography variant='subtitle1'>
                      PM and Back-end
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant='h4' color='primary'>
                      Berthy Feng '19
                    </Typography>
                    <br></br>
                    <Typography variant='subtitle1'>
                      Front-end
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant='h4' color='primary'>
                      Claire Du '20
                    </Typography>
                    <br></br>
                    <Typography variant='subtitle1'>
                      Back-end
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant='h4' color='primary'>
                      Rachel Coe-Scharf '19
                    </Typography>
                    <br></br>
                    <Typography variant='subtitle1'>
                      Front-end
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}


export default withStyles(styles)(withRouter(Team))

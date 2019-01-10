import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Material-UI
import { withStyles } from '@material-ui/core/styles'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Local
import Header from './Components/Header'
import HomeButton from './Components/HomeButton'
import theme from '../Assets/Theme'
import './About.css'
import ariel from '../Assets/ariel.png'
import becky from '../Assets/becky.png'
import berthy from '../Assets/berthy.png'
import claire from '../Assets/claire.png'
import rachel from '../Assets/rachel.png'

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
                <Grid container
                justify="center">

                  <Grid item xs={4}>
                    <img src={ariel} />
                    <Typography variant='h4' color='primary'>
                      Ariel Chen '20
                    </Typography>
                    <Typography variant='h6'>
                      Front-end
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <img src={becky} />
                    <Typography variant='h4' color='primary'>
                      Becky Barber '20
                    </Typography>
                    <Typography variant='h6'>
                      PM and Back-end
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <img src={berthy} />
                    <Typography variant='h4' color='primary'>
                      Berthy Feng '19
                    </Typography>
                    <Typography variant='h6'>
                      Front-end
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <img src={claire} />
                    <Typography variant='h4' color='primary'>
                      Claire Du '20
                    </Typography>
                    <Typography variant='h6'>
                      Back-end
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <img src={rachel} />
                    <Typography variant='h4' color='primary'>
                      Rachel Coe-Scharf '19
                    </Typography>
                    <Typography variant='h6'>
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

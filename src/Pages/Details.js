import React, { Component } from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Done from '@material-ui/icons/Done'
import Clear from '@material-ui/icons/Clear'

import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Theme from '../Assets/Theme'
import { MuiThemeProvider } from '@material-ui/core/styles'
import './Details.css'

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Arch Sing',
      startTime: new Date(2018, 10, 16, 13, 0, 0),
      endTime: new Date(2018, 10, 16, 15, 0, 0),
      location: '1897 Arch',
      website: 'http://www.nassoons.com/',
      desc: 'Arch sing by the Princeton Nassoons',
      is_free: true
    }
  }

  goToCalendar = () => {
    this.props.history.push('/')
  }

  render() {
    var startTime = this.state.startTime
    var endTime = this.state.endTime
    var website = this.state.website

    return (
        <MuiThemeProvider theme={Theme}>
          <div className="Page">
            <Grid item xs={1}>
              <IconButton color="primary" onClick={this.goToCalendar}>
                <ArrowBack />
              </IconButton>
            </Grid>
            <Grid container>
              <Grid item xs={11} className="MainPaper">
                <Paper elevation={1} >
                  <div className="InnerPaperUpper">
                    <Typography variant="h4" component="h3" color="primary">
                      {this.state.title}
                    </Typography>
                    <Typography variant="h5" component="h3" color="default">
                      {this.state.desc}
                    </Typography>
                  </div>
                  <div className="InnerPaperDivider">
                    <Divider />
                    <Divider />
                  </div>
                  <Typography variant="h5" component="h3" color="primary">
                    Time:
                  </Typography>
                  <Typography variant="h5" component="h3" color="default">
                    {startTime.toLocaleString()} &mdash; {endTime.toLocaleString()}
                  </Typography>
                  <Typography variant="h5" component="h3" color="primary">
                    Location:
                  </Typography>
                  <Typography variant="h5" component="h3" color="default">
                    {this.state.location}
                  </Typography>
                  <Typography variant="h5" component="h3" color="primary">
                    Website:
                  </Typography>
                  <Typography variant="h5" component="h3" color="default">
                    <a href={website}>{website}</a>
                  </Typography>

                </Paper>
              </Grid>
            </Grid>
          </div>
        </MuiThemeProvider>
    )
  }
}

export default withRouter(Details)
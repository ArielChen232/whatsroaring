import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { MuiThemeProvider } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'

import theme from '../Assets/Theme'

//import DateTimePicker from 'react-datetime-picker'
import './UnderConstruction.css'

const axios = require('axios')
const url = 'http://whatsroaring-api.herokuapp.com/'
//const url = 'http://127.0.0.1:8000/'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
})


class UnderConstruction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
    }
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    const { classes } = this.props
    return (
      <div className="Page">
          <MuiThemeProvider theme={theme}>
            <div className='Header'>
              <Typography variant="h2" color="primary">
                Under Construction
              </Typography>
            </div>

            <div className='EventPaper'>

              <div className='ReturnButton'>
                <IconButton color='primary' onClick={this.goBack}>
                  <ArrowBack />
                </IconButton>
              </div>

              <Paper className='EventPaperInner'>
                This page is under construction.
              </Paper>
            </div>
          </MuiThemeProvider>
      </div>
    )
  }
}


export default withStyles(styles)(withRouter(UnderConstruction))

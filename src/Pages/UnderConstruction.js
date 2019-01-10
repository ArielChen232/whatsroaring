import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Material UI
import { MuiThemeProvider } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'

// Local
import Header from './Components/Header'
import theme from '../Assets/Theme'
import './UnderConstruction.css'

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
    return (
      <div className='underConstructionPage'>
        <Header />
        <MuiThemeProvider theme={theme}>
          <div className='header'>
            <Typography variant="h2" color="primary">
              Under Construction
            </Typography>
          </div>
          <div className='returnButton'>
            <IconButton color='primary' onClick={this.goBack}>
              <ArrowBack />
            </IconButton>
          </div>
          <div className='text'>
            <Typography variant='body1'>
              This page is under construction.
            </Typography>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}


export default withRouter(UnderConstruction)

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Home from '@material-ui/icons/Home'
import IconButton from '@material-ui/core/IconButton'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Theme from '../../Assets/Theme'

import './Button.css'

class HomeButton extends Component {

  goToCalendar = () => {
    this.props.history.push('/calendar')
  }

  render() {
    return (
      <MuiThemeProvider theme={Theme}>
        <div className='Button'>
          <IconButton color='primary' onClick={this.goToCalendar}>
            <Home />
          </IconButton>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(HomeButton)
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Theme from '../../Assets/Theme'
import Button from '@material-ui/core/Button'

import './Button.css'

class LogOutButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    localStorage.clear()
    this.props.history.push('/')
  }

  render () {
    return (
      <MuiThemeProvider theme={Theme}>
        <Button variant="outlined" color="primary" onClick={this.handleClick} size="medium">
            Log Out
        </Button>
      </MuiThemeProvider>
    )
  }
}
export default withRouter(LogOutButton);
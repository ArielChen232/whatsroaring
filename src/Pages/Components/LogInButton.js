import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Theme from '../../Assets/Theme'
import Button from '@material-ui/core/Button'

import './Button.css'

class LogInButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.history.push('/calendar')
  }

  render () {
    return (
      <MuiThemeProvider theme={Theme}>
        <div className='Button'>
          <Button variant="contained" color="primary" onClick={this.handleClick} size="medium">
            Log In
          </Button>
        </div>
      </MuiThemeProvider>
    )
  }
}
export default withRouter(LogInButton);

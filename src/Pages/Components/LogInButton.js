import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from '../../Assets/Theme'
import Button from '@material-ui/core/Button'

import './Button.css'

export default class LogInButton extends Component {

  constructor() {
    super()
    this.netid = null
    this.casURL = 'https://fed.princeton.edu/cas/'
    this.buttonClicked = false
    this.url = 'http://whatsroaring-api.herokuapp.com/'
    // this.url = 'http://127.0.0.1:8000/'
    this.handleClick = this.handleClick.bind(this)
  }


  handleClick() {
    if (true) {
      const url_login = this.url + "login"
      window.location.href = url_login
    }
    this.buttonClicked = true
  }

  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <div className='Button'>
          <Button variant="contained" color="primary" onClick={this.handleClick}>
            Log In
          </Button>
        </div>
      </MuiThemeProvider>
    );
  }
}

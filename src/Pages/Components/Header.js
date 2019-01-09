import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Theme from '../../Assets/Theme'

import imageName from "../../Assets/just_logo.png"
import './Header.css'

class Header extends Component {
  render () {
    return (
      <MuiThemeProvider theme={Theme}>
        <div className='Header'>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Header
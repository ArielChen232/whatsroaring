import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Theme from '../../Assets/Theme'

import './Header.css'

class Header extends Component {
  render () {
    return (
      <MuiThemeProvider theme={Theme}>
        <a href="https://whatsroaring.herokuapp.com">
          <div className='Header'>
          </div>
        </a>
      </MuiThemeProvider>
    )
  }
}

export default Header
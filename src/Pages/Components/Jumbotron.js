import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Theme from '../../Assets/Theme'

import './Jumbotron.css'

class Jumbotron extends Component {
  render () {
    return (
      <MuiThemeProvider theme={Theme}>
        <div className='Jumbotron'>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Jumbotron
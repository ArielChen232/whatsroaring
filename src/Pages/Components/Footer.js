import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Theme from '../../Assets/Theme'
import Button from '@material-ui/core/Button'

import './Footer.css'

class Footer extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.history.push('/underConstruction')
  }

  render () {
    return (
      <MuiThemeProvider theme={Theme}>
        <div className='Footer'>

          <div className='Copyright'>
            &copy; 2019 WhatsRoaring
          </div>
        </div>

      </MuiThemeProvider>
    )
  }
}

export default withRouter(Footer)

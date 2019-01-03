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
    this.props.history.push('/calendar')
  }

  render () {
    return (
      <MuiThemeProvider theme={Theme}>
        <div className='Header'>
          <div className='Links'>
            <Button color='secondary' onClick={this.handleClick} size='small'>
              About
            </Button>
            <Button color='secondary' onClick={this.handleClick} size='small'>
              Team
            </Button>
            <Button color='secondary' onClick={this.handleClick} size='small'>
              Project Docs
            </Button>
          </div>
        </div>

      </MuiThemeProvider>
    )
  }
}

export default withRouter(Footer)
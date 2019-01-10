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
    this.handleAbout = this.handleAbout.bind(this)
    this.handleTeam = this.handleTeam.bind(this)
    this.handleDocs = this.handleDocs.bind(this)
  }

  handleClick() {
    this.props.history.push('/underConstruction')
  }

  handleAbout() {
    this.props.history.push('/about')
  }

  handleTeam() {
    this.props.history.push('/team')
  }

  handleDocs() {
    this.props.history.push('/docs')
  }



  render () {
    return (
      <MuiThemeProvider theme={Theme}>
        <div className='Footer'>
          <div className='Links'>
            <Button color='secondary' onClick={this.handleAbout} size='small'>
              About
            </Button>
            <Button color='secondary' onClick={this.handleTeam} size='small'>
              Team
            </Button>
            <Button color='secondary' onClick={this.handleDocs} size='small'>
              Project Docs
            </Button>
          </div>
          <div className='Copyright'>
            &copy; 2019 WhatsRoaring
          </div>
        </div>

      </MuiThemeProvider>
    )
  }
}

export default withRouter(Footer)

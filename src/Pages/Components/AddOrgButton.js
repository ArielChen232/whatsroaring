import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from '../../Assets/Theme'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

import './Button.css'

const url = 'http://whatsroaring.herokuapp.com/addOrg'

class AddOrgButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    var win = window.open(url, '_blank')
    win.focus()
  }

  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <div className='Button'>
          <Button variant="contained" color="primary" onClick={this.handleClick} size="medium">
            Add Organization
          </Button>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(AddOrgButton)
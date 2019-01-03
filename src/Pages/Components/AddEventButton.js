import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from '../../Assets/Theme'
import Button from '@material-ui/core/Button'

import './Button.css'

const url = 'http://whatsroaring.herokuapp.com/submitEvent'

class AddEventButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    //this.props.history.push('/submitEvent')
    var win = window.open(url, '_blank')
    win.focus()
  }

  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <div className='Button'>
          <Button variant="contained" color="primary" onClick={this.handleClick}>
            Add Event
          </Button>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(AddEventButton)
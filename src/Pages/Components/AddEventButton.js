import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from '../../Assets/Theme'
import Button from '@material-ui/core/Button'

import './Button.css'

class AddEventButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    //window.open("http://whatsroaring-api.herokuapp.com/addevent", "_blank")
    this.props.history.push('/submitEvent')
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
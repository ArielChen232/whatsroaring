import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Theme from '../../Assets/Theme'
import Button from '@material-ui/core/Button'

import './Button.css'

const url = 'http://whatsroaring.herokuapp.com/myEvents'

class MyEventsButton extends Component {
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
      <MuiThemeProvider theme={Theme}>
        <div className='Button'>
          <Button variant="contained" color="primary" onClick={this.handleClick} size="medium">
            My Events
          </Button>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(MyEventsButton)

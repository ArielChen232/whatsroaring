import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './LogInButton.css'

class GoToCalendarButton extends Component {

    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
      // window.open("localhost:3000/calendar", "_blank")
      this.props.history.push('/calendar')
    }

    render () {
        return (
            <button class='LogInButton' onClick={this.handleClick}>
               see events calendar
            </button>
        );
    }
}

export default withRouter(GoToCalendarButton)

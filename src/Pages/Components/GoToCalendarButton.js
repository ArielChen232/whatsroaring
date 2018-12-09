import React, { Component } from 'react'
import './LogInButton.css'

export default class GoToCalendarButton extends Component {

    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }


    handleClick() {
      window.open("localhost:3000/calendar", "_blank")
    }
    render () {
        return (
            <button class='LogInButton' onClick={this.handleClick}>
               see events calendar
            </button>
        );
    }
}

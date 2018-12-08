import React, { Component } from 'react'
import './LogInButton.css'

export default class GoToCalendarButton extends Component {

    constructor() {
        super()
        this.buttonClicked = false
        this.url = 'http://whatsroaring.herokuapp.com/'
        // this.url = 'http://127.0.0.1:8000/'
        this.handleClick = this.handleClick.bind(this)
    }


    handleClick() {
        if (true) {
            const url_calendar = this.url + "calendar"
            window.location.href = url_calendar
        }
        this.buttonClicked = true
    }
    render () {
        return (
            <button class='GoToCalendarButton' onClick={this.handleClick}>
               see events calendar
            </button>
        );
    }
}

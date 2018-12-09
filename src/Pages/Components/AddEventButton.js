import React, { Component } from 'react'
import './LogInButton.css'

export default class AddEventButton extends Component {

    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        window.open("http://whatsroaring-api.herokuapp.com/addevent", "_blank")

    }
    render () {
        return (
            <button class='LogInButton' onClick={this.handleClick}>
               add event
            </button>
        );
    }
}

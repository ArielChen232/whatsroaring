import React, { Component } from 'react'
import './LogInButton.css'

export default class AddEventButton extends Component {

    constructor() {
        super()
        // this.netid = null
        // this.casURL = 'https://fed.princeton.edu/cas/'
        // this.buttonClicked = false
        // // this.url = 'http://whatsroaring-api.herokuapp.com/';
        // this.url = 'http://127.0.0.1:8000/'
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        window.open("http://whatsroaring-api.herokuapp.com/addevent", "_blank")

    }
    render () {
        return (
            <button class='LogInButton' onClick={this.handleClick}>
               Add Event
            </button>
        );
    }
}


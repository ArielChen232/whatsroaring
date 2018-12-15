import React, { Component } from 'react'
import './LogInButton.css'

export default class LogInButton extends Component {

    constructor() {
        super()
        this.netid = null
        this.casURL = 'https://fed.princeton.edu/cas/'
        this.buttonClicked = false
        this.url = 'http://whatsroaring-api.herokuapp.com/'
        // this.url = 'http://127.0.0.1:8000/'
        this.handleClick = this.handleClick.bind(this)
    }


    handleClick() {
        if (true) {
            const url_login = this.url + "login"
            window.location.href = url_login
        }
        this.buttonClicked = true
    }
    render () {
        return (
            <button class='LogInButton' onClick={this.handleClick}>
               log in
            </button>
        );
    }
}

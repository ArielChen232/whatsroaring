import React, { Component } from 'react'
import './LogInButton.css'

export default class MyFavoritesButton extends Component {

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
        // window.open("my favorites page", "_blank")

    }
    render () {
        return (
            <button class='LogInButton' onClick={this.handleClick}>
               My Favorites
            </button>
        );
    }
}

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './LogInButton.css'

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
            <button class='LogInButton' onClick={this.handleClick}>
               add event
            </button>
        );
    }
}

export default withRouter(AddEventButton)
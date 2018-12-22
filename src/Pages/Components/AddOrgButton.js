import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './AddOrgButton.css'

class AddOrgButton extends Component {

    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.history.push('/addOrg')

    }
    render () {
        return (
            <button className='AddOrgButton' onClick={this.handleClick}>
               Add Organization
            </button>
        );
    }
}

export default withRouter(AddOrgButton)
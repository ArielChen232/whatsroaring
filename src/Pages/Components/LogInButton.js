import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'
import axios from 'axios'
// import FontAwesome from 'react-fontawesome'
// import onClick from "react-onclick"
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

    // function authenticate() {
    //     if (this.buttonClicked) return;
    //     this.buttonClicked = true;
    //     if (cgi.getVar("ticket")) {
    //         this.netid = this.validate(cgi.getVar("ticket"));
    //         if (this.netid) {
    //             location.replace(this.serviceURL + "?ticket=" + cgi.getVar("ticket"));
    //             return;
    //         }
    //     }
    //     const loginURL = this.casURL + "login?service=" + encodeURI(this.serviceURL());
    //     location.replace(loginURL);
    // }

    // function validate(ticket) {
    //     const valURL = this.casURL + "validate?service=" +
    //         encodeURI(this.serviceURL()) + "&ticket=" + encodeURI(ticket);
    //     // const encoding = (options.encoding && iconv.encodingExists(options.encoding)) ? options.encoding : 'utf8';

    // }

    // function serviceURL() {
    //     return location.href();
    // }

    handleClick() {
        if (true) {
            const url_login = this.url + "login"
            // axios.get(url_login)
            window.location.href = url_login
        }
        this.buttonClicked = true
    }
    render () {
        // let button
        // if (this.buttonClicked) {
        //     button = <button>
        //                 Log Out
        //              </button>
        // }
        // else {
        //     button = <button onClick={this.handleClick}>
        //                 Log In
        //              </button>}
        return (
            <button class='LogInButton' onClick={this.handleClick}>
               Log In
            </button>
        );
    }
}




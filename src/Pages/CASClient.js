import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export default class Cas {
  casURL = 'https://fed.princeton.edu/cas/'

  validate = (ticket) => {
    const val_url = (this.casURL + 'validate?service=' +
        encodeURIComponent(this.serviceURL()) + '&ticket=' +
        encodeURIComponent(ticket))
    console.log('validate url = ' + val_url)
    var request = new XMLHttpRequest();
    request.open('GET', val_url, true);
    request.send();
    request.onreadystatechange = function () {
      console.log('url opened')
      if (request.readyState === 4 && request.status === 200) {
        var lines = request.responseText;
        lines = lines.split("\n")
        if (lines[0] == 'yes') {
          var netid = lines[1]
          console.log('set netid to: ' + netid)
          // set netid in localstorage
          localStorage.setItem('netid', netid)
        }
      }
    }
  }

  authenticate = () => {
    // is username is stored, then user was already authenticated
    var netid = localStorage.getItem('netid')
    console.log('netid: ' +  netid)
    if (netid) return

    // if request has a login ticket, try to validate it
    const urlParams = new URLSearchParams(window.location.search);
    const ticket = urlParams.get('ticket');
    console.log('ticket: ' + ticket)
    if (ticket) {
      console.log('ticket received')
      this.validate(ticket)
    }
    // No valid ticket; redirect the browser to the login page to get one
    console.log('no ticket found')
    var login_url = this.casURL + 'login?service=' + encodeURIComponent(this.serviceURL())
    console.log('Location: ' + login_url)
    window.location.href = login_url
  }

  serviceURL = () => {
    var url = window.location.href;
    // Remove the "ticket" parameter from the URL.
    url = url.split("?")[0];
    // Remove a trailing question mark and/or ampersand.
    url = url.replace("\\?&?$|&$", "");
    console.log('url:' + url)
    return url;
  }

}

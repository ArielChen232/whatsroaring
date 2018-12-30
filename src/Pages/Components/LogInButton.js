import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from '../../Assets/Theme'
import Button from '@material-ui/core/Button'

import './Button.css'

class LogInButton extends Component {

  // constructor(props) {
  //     super(props)
  //     this.state = {netid: sessionStorage.getItem('netid')}
  //     this.casURL = 'https://fed.princeton.edu/cas/'
  //     this.buttonClicked = false
  //     // this.url = 'http://whatsroaring-api.herokuapp.com/'
  //     this.url = 'http://localhost:8000/'
  //     this.front_url = 'http://localhost:3000/calendar'
  //     // this.front_url = 'http://whatsroaring.herokuapp.com/calendar'
  //     this.handleClick = this.handleClick.bind(this)
  // }
  //
  // validate(ticket) {
  //   const val_url = (this.casURL + 'validate?service=' +
  //       encodeURIComponent(this.serviceURL()) + '&ticket=' +
  //       encodeURIComponent(ticket))
  //   console.log('validate url = ' + val_url)
  //   var request = new XMLHttpRequest();
  //   request.open('GET', val_url, true);
  //   request.send();
  //   request.onreadystatechange = function () {
  //     console.log('url opened')
  //     if (request.readyState === 4 && request.status === 200) {
  //       var lines = request.responseText;
  //       console.log('lines' + lines)
  //       return lines
  //       }
  //     }
  //   console.log("didn't read correctly")
  //   return null
  // }
  //
  // authenticate() {
  //   // const query = new URLSearchParams(window.location.href)
  //   // var ticket = query.get('ticket')
  //   const return_url = this.front_url + 'calendar'
  //   // const return_url = 'http://whatsroaring.herokuapp.com/?netid='
  //   // var ticket = window.location.search.replace("?", ''); // remove the ?
  //
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const ticket = urlParams.get('ticket');
  //   console.log('ticket: ' + ticket)
  //   if (ticket) {
  //     console.log('ticket received')
  //     var netid = this.validate(ticket)
  //     if (netid) {
  //         sessionStorage.setItem('netid', netid)
  //         // window.location.href = return_url
  //         return
  //       }
  //   }
  //   // No valid ticket; redirect the browser to the login page to get one
  //   console.log('no ticket found')
  //   var login_url = this.casURL + 'login?service=' + encodeURIComponent(this.front_url)
  //   console.log('Location: ' + login_url)
  //   window.location.href = login_url
  // }
  //
  // serviceURL() {
  //   var url = window.location.href;
  //   // Remove the "ticket" parameter from the URL.
  //   url = url.split("?")[0];
  //   // Remove a trailing question mark and/or ampersand.
  //   url = url.replace("\\?&?$|&$", "");
  //   // add calendar extension
  //   url = url + '/calendar'
  //   console.log('url:' + url)
  //   return url;
  // }

  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
      // if (true) {
      //     const url_login = this.url + "login"
      //     window.location.href = url_login
      // }
      // this.buttonClicked = true
      this.props.history.push('/calendar')
  }
  render () {
      return (
          <button class='LogInButton' onClick={this.handleClick}>
             Log In
          </button>
      );
  }
}
export default withRouter(LogInButton);
//   constructor() {
//     super()
//     this.netid = null
//     this.casURL = 'https://fed.princeton.edu/cas/'
//     this.buttonClicked = false
//     // this.url = 'http://whatsroaring-api.herokuapp.com/'
//     this.url = 'http://localhost:8000/'
//     this.handleClick = this.handleClick.bind(this)
//   }
//
//
//   handleClick() {
//     if (true) {
//       const url_login = this.url + "login"
//       window.location.href = url_login
//     }
//     this.buttonClicked = true
//   }
//
//   render () {
//     return (
//       <MuiThemeProvider theme={theme}>
//         <div className='Button'>
//           <Button variant="contained" color="primary" onClick={this.handleClick}>
//             Log In
//           </Button>
//         </div>
//       </MuiThemeProvider>
//     );
//   }
// }

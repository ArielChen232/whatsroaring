import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Theme from '../../Assets/Theme'
import Button from '@material-ui/core/Button'

import './Button.css'

class LogInButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.history.push('/calendar')
  }

  render () {
    return (
      <MuiThemeProvider theme={Theme}>
        <div className='Button'>
          <Button variant="contained" color="primary" onClick={this.handleClick} size="large">
            Log In
          </Button>
        </div>
      </MuiThemeProvider>
    )
    /*return (
      <button class='LogInButton' onClick={this.handleClick}>
         Log In
      </button>
    )*/
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

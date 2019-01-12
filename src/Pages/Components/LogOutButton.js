import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'
import Theme from '../../Assets/Theme'
import Button from '@material-ui/core/Button'

import './Button.css'

const styles = theme => ({
  button: {
    width: 100,
    margin: 10,
    textTransform: 'none',
  }
})

class LogOutButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    localStorage.clear()
    this.props.history.push('/')
  }

  render () {
    const { classes } = this.props
    return (
      <MuiThemeProvider theme={Theme}>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={this.handleClick} 
          size="medium"
          className={classes.button}>
            Log Out
        </Button>
      </MuiThemeProvider>
    )
  }
}
export default withStyles(styles)(withRouter(LogOutButton));
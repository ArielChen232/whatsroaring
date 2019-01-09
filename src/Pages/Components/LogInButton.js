import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Theme from '../../Assets/Theme'
import Button from '@material-ui/core/Button'

import './Button.css'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: 200,
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
    width: 150,
  },
  continueButton: {
    marginBottom: theme.spacing.unit * 2,
  },
})

class LogInButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.history.push('/calendar')
  }

  render () {
    const { classes } = this.props
    return (
      <MuiThemeProvider theme={Theme}>
        <div className='Button'>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={this.handleClick} 
            size="medium"
            className={classes.button}>
            Log In
          </Button>
        </div>
      </MuiThemeProvider>
    )
  }
}
export default withStyles(styles)(withRouter(LogInButton))

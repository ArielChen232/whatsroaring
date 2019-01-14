import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'
import Theme from '../../Assets/Theme'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

import './Button.css'

const url = 'http://whatsroaring.herokuapp.com/submitEvent'

const styles = theme => ({
  button: {
    width: 100,
    margin: 10,
    textTransform: 'none',
  }
})

class AddEventButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    //this.props.history.push('/submitEvent')
    var win = window.open(url, '_blank')
    win.focus()
  }

  render () {
    const { classes } = this.props
    return (
      <MuiThemeProvider theme={Theme}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={this.handleClick} 
            className={classes.button}>
            <AddIcon></AddIcon> Event
          </Button>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(withRouter(AddEventButton))

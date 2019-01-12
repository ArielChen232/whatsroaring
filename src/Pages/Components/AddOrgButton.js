import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'
import theme from '../../Assets/Theme'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

import './Button.css'

const url = 'http://whatsroaring.herokuapp.com/addOrg'
//const url = 'http://localhost:3000/addOrg'

const styles = theme => ({
  button: {
    width: 150,
    margin: 10,
    textTransform: 'none',
  }
})
class AddOrgButton extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    var win = window.open(url, '_blank')
    win.focus()
  }

  render () {
    const { classes } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <Button 
            variant="contained" 
            color="primary" 
            onClick={this.handleClick} 
            className={classes.button}>
            <AddIcon></AddIcon> Organization
        </Button>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(withRouter(AddOrgButton))
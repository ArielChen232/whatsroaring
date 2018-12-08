import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import './LogInButton.css'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class LandingButtons extends Component {

  constructor() {
      super()
      this.netid = null
      this.casURL = 'https://fed.princeton.edu/cas/'
      this.buttonClicked = false
      this.url = 'http://whatsroaring-api.herokuapp.com/'
      // this.url = 'http://127.0.0.1:8000/'
      this.handleClick = this.handleClick.bind(this)
  }

  handleClickCal() {
      if (true) {
          const url_calendar = this.url + "calendar"
          window.location.href = url_calendar
      }
      this.buttonClicked = true
  }

  handleClickAdd() {
      if (true) {
          const url_add = this.url + "submitEvent"
          window.location.href = url_add
      }
      this.buttonClicked = true
  }

  render(props) {
    const { classes } = props;
    return (
      <div>
        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClickCal}>
          see events calendar
        </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClickAdd}>
          add an event
        </Button>
      </div>
    );
  }

}

LandingButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingButtons);

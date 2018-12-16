import React, { Component } from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Grade from '@material-ui/icons/Grade'
import Done from '@material-ui/icons/Done'
import Clear from '@material-ui/icons/Clear'

import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Theme from '../Assets/Theme'
import { MuiThemeProvider } from '@material-ui/core/styles'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GoToCalendarButton from './Components/GoToCalendarButton'
import LogInButton from './Components/LogInButton'
import AddEventButton from './Components/AddEventButton'
import Background from './homepage_background.png'

import axios from 'axios'
import './Landing.css'

let imgUrl = 'homepage_background.png';

var sectionStyle = {
  width: "100%",
  height: "600px",
  backgroundImage: 'url(' + imgUrl + ')',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
};

class Landing extends Component {


  constructor(...args) {
    super(...args)
    this.state = {
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="Jumbotron">
        </div>
        <div className="wrapper">
          <section style={ sectionStyle }>
          <br>

          </br>
            <GoToCalendarButton/> <LogInButton/>
          </section>
        </div>
      </div>
      )
    }

}

export default withRouter(Landing);

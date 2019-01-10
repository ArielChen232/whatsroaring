
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Material-UI
import { withStyles } from '@material-ui/core/styles'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Explore from '@material-ui/icons/Explore' // Discover
import FindReplace from '@material-ui/icons/FindReplace' // Filter
import PlaylistAdd from '@material-ui/icons/PlaylistAdd' // Integrate
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';

// Local
import Header from './Components/Header'
import HomeButton from './Components/HomeButton'
import theme from '../Assets/Theme'
import './About.css'

const axios = require('axios')
const url = 'http://whatsroaring-api.herokuapp.com/'

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
  font: {
    fontSize: 1.5,
  }
});

function getSteps() {
  return ['a', 'b', 'c'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `week 0 text`;
    case 1:
      return 'week 1 text';
    case 2:
      return `week 2 text`;
    default:
      return 'Unknown step';
  }
}

class Documentation extends Component {

  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className='page'>
        <Header />

        <MuiThemeProvider theme={theme}>
          <div className='main'>
            <HomeButton />
            <div className='title'>
              <Typography variant="h3" color="primary">
                Team Documentation
              </Typography>
            </div>

            <div className={classes.root}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                      <StepContent>
                        <Typography>{getStepContent(index)}</Typography>
                        <div className={classes.actionsContainer}>
                          <div>
                            <Button
                              disabled={activeStep === 0}
                              onClick={this.handleBack}
                              className={classes.button}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={this.handleNext}
                              className={classes.button}
                            >
                              {activeStep === steps.length - 1 ? 'Done' : 'Next'}
                            </Button>
                          </div>
                        </div>
                      </StepContent>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                  <Typography>Thanks for checking out our timeline!</Typography>
                  <Button onClick={this.handleReset} className={classes.button}>
                    Back to top
                  </Button>
                </Paper>
              )}
            </div>

          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

Documentation.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(withRouter(Documentation))

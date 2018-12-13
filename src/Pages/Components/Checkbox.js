import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import './DropdownMultiple.css'
const url = 'http://127.0.0.1:8000/'

const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};

class CheckboxLabels extends React.Component {
  state = {
    checkedA: false,
    checkedB: false,
  };

  handleCheckFree = name => {
    this.setState({ [name]: !this.state.checkedFree });
    var send_free = this.state.checkedFree;
    console.log(send_free)
    const url_getEvents = url + 'getEvents'
    console.log(url_getEvents)
  };

  handleCheckFav = name => {
    this.setState({ [name]: !this.state.checkedFav });
    var send_free = this.state.checkedFree;
    console.log(send_free)
    const url_getEvents = url + 'getEvents'
    console.log(url_getEvents)
  };

  render() {
    const { classes } = this.props;

    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedA}
              onChange={this.handleCheckFree('checkedA')}
              value="checkedA"
              color="primary"
            />
          }
          label="Free events only"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedB}
              onChange={this.handleCheckFree('checkedB')}
              value="checkedB"
              color="primary"
            />
          }
          label="Favorites"
        />

      </FormGroup>
    );
  }
}

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxLabels);

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import FontAwesome from 'react-fontawesome';
import onClickOutside from "react-onclickoutside";

import './Checkbox.css'

const url = 'https://whatsroaring-api.herokuapp.com/getEvents'
const orange = '#fb8c00'

class Checkbox extends Component{
  constructor(props){
    super(props)
    this.state = {
      checked: false
    }
  }

  handleCheckboxChange = event =>
    this.setState({ checked: event.target.checked })

  render() {
    return (
      <div>
        <label>
          <Checkbox
            checked={this.state.checked}
            onChange={this.handleCheckboxChange}
          />
          <span>Label Text</span>
        </label>
      </div>
    )
  }

}

export default Checkbox;

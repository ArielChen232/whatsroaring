import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

export default class DateTimePicker extends Component {
  render() {
    return (
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        //className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    )
  }
}


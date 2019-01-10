import React, { Component } from 'react'

// Material UI
import { MuiThemeProvider } from '@material-ui/core/styles'
import Theme from '../../Assets/Theme'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'

// Local
import './DropdownMultiple.css'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
}

class DropdownMultiple extends Component {
  constructor(props) {
    super(props)
    this.state = {
      headerTitle: this.props.title,
      selectedList: this.props.selectedList
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const count = nextProps.list.filter(function(a) { return a.selected; }).length;
    if(count === 0){
      return {headerTitle: nextProps.title}
    }
    else if(count === 1){
      return {headerTitle: `${count} ${nextProps.titleHelper}`}
    }
    else if(count > 1){
      return {headerTitle: `${count} ${nextProps.titleHelper}s`}
    }
  }

  handleChange = (updateFilterFn, headerTitle) => event => {
    console.log(event.target.value)
    this.setState({
      selectedList: event.target.value,
    })
    updateFilterFn(headerTitle.toLowerCase(), event.target.value)
  }

  render() {
    const{list, updateFilter} = this.props
    const{headerTitle} = this.state
    return (
      <MuiThemeProvider theme={Theme}>
        <InputLabel htmlFor="select-multiple-checkbox">{headerTitle}</InputLabel>
        <Select
          multiple
          value={this.state.selectedList}
          onChange={this.handleChange(updateFilter, headerTitle)}
          input={<Input id="select-multiple-checkbox" />}
          renderValue={selected => selected.length + ' selected'}
          MenuProps={MenuProps}
          autoWidth={true}
          variant="filled"
        >
          {list.map(item => (
            <MenuItem key={item.title} value={item.title}>
              <Checkbox checked={this.state.selectedList.indexOf(item.title) > -1} color='primary'/>
              <ListItemText primary={item.title} />
            </MenuItem>
          ))}
        </Select>
      </MuiThemeProvider>
    )
  }

}

export default DropdownMultiple

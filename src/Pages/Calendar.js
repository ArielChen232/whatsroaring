import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import CASClient from './CASClient'

// Components
import BigCalendar from 'react-big-calendar'
import DropdownMultiple from './Components/DropdownMultiple'
import AddEventButton from './Components/AddEventButton'
import AddOrgButton from './Components/AddOrgButton'
import Footer from './Components/Footer'
import Header from './Components/Header'

import { MuiThemeProvider } from '@material-ui/core/styles'
import Theme from '../Assets/Theme'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import ListItemText from '@material-ui/core/ListItemText'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Jumbotron,
    //Button
} from 'reactstrap';

// Styling
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'


const localizer = BigCalendar.momentLocalizer(moment)
const url = 'https://whatsroaring-api.herokuapp.com/'
const url_details = 'https://whatsroaring.herokuapp.com/details'
// const url = 'http://127.0.0.1:8000/'
const orange = '#fb8c00'
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

function getStartOfMonth() {
  var today = new Date()
  today.setDate(1)
  return today
}

// return array of location objects to populate dropdown
function getLocationObjects() {
  const url_locs = url + 'getLocations'
  var locs_arr = [];
  axios.get(url_locs).then(res => {
    var locs = res.data.locs
    locs.sort(compareDropdown)
    for (var i = 0; i < locs.length; i++) {
      locs_arr.push({
        id: i,
        title: locs[i],
        selected: false,
        key: 'locations'
      });
    }
  })
  return locs_arr
}

// return array of category objects to populate dropdown
function getCategoryObjects() {
  const url_cats = url + 'getCategories'
  var cats_arr = [];
  axios.get(url_cats).then(res => {
    var cats = res.data.cats
    cats.sort(compareDropdown)
    for (var i = 0; i < cats.length; i++) {
      cats_arr.push({
        id: i,
        title: cats[i],
        selected: false,
        key: 'categories'
      });
    }
  })
  return cats_arr
}

// return array of organization objects to populate dropdown
function getOrganizationObjects() {
  const url_orgs = url + 'getOrganizations'
  var orgs_arr = [];
  axios.get(url_orgs).then(res => {
    var orgs = res.data.orgs
    orgs.sort(compareDropdown)
    for (var i = 0; i < orgs.length; i++) {
      orgs_arr.push({
        id: i,
        title: orgs[i],
        selected: false,
        key: 'organizations'
      });
    }
  })
  return orgs_arr
}

// function to sort dropdown components
function compareDropdown(a, b) {
  var compA = a.toUpperCase();
  var compB = b.toUpperCase();
  if (compA < compB) return -1;
  if (compA > compB) return 1;
  return 0;
}


class Calendar extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      // loading: true,
      events: [],
      locations: [],
      categories: [],
      organizations: [],
      locations_selected: [],
      categories_selected: [],
      organizations_selected: [],
      checkedFree: false,
      checkedFav: false,
      start_datetime: new Date(),
      end_datetime: new Date(),
      display_date: new Date(),
      month: getStartOfMonth(),
      changed_view: false, // if user has changed calendar settings
    }
    this._isMounted = false
    this.eventStyleGetter = this.eventStyleGetter.bind(this)
    this.getCustomToolbar = this.getCustomToolbar.bind(this)
  }

  componentDidMount() {
    if (this.props.changed_view === false) {
      console.log('Default view')
      this.setState({
        locations: getLocationObjects(),
        categories: getCategoryObjects(),
        organizations: getOrganizationObjects(),
        locations_selected: [],
        categories_selected: [],
        organizations_selected: [],
        is_free: this.state.checkedFree,
        favorites: this.state.checkedFav
      }, () => this.filterEvents())
    } else {
      console.log('Recovering view')
      console.log('Recovered organizations: ' + this.props.organizations_selected)
      console.log('Recovered categories: ' + this.props.categories_selected)
      console.log('Recovered locations: ' + this.props.locations_selected)
      this.setState({
        locations: getLocationObjects(),
        categories: getCategoryObjects(),
        organizations: getOrganizationObjects(),
        locations_selected: this.props.locations_selected,
        categories_selected: this.props.categories_selected,
        organizations_selected: this.props.organizations_selected,
        is_free: this.props.checked_free,
        favorites: this.props.checked_fav,
        checkedFree: this.props.checked_free,
        checkedFav: this.props.checked_fav,
        month: this.props.month,
     }, () => this.filterEvents())
    }
    //this.updateCalendar()
    //this.filterEvents()
    this._isMounted = true
    // var cas = new CASClient()
    // cas.authenticate(() => this.setState({loading: false}))
  }

  nextMonth() {
    var day = new Date(this.state.month)
    if (day.getMonth() == 11) {
      day.setMonth(0)
      day.setFullYear(day.getFullYear() + 1)
    } else {
      day.setMonth(day.getMonth() + 1)
    }
    this.setState({
      month: new Date(day.toLocaleString())
    })
    return day
  }

  prevMonth() {
    var day = new Date(this.state.month)
    if (day.getMonth() == 0) {
      day.setMonth(11)
      day.setFullYear(day.getFullYear() - 1)
    } else {
      day.setMonth(day.getMonth() - 1)
    }
    this.setState({
      month: new Date(day.toLocaleString())
    })
    return day
  }

  getCustomToolbar = (toolbar) => {
    this.toolbarDate = toolbar.date
    const goToBack = () => {
      toolbar.onNavigate('back', this.prevMonth())
    }
    const goToNext = () => {
      toolbar.onNavigate('next', this.nextMonth())
    }
    const goToToday =() => {
      var day = new Date()
      this.setState({
        month: getStartOfMonth()
      })
      toolbar.onNavigate('today', day)
    }

    return (
      <div className='ToolbarCalendar'>
        <MuiThemeProvider theme={Theme}>
          <Grid container>
            <Grid item xs={6}>
              <Typography className="month" variant="h3" component="h3" color="primary">
                {monthNames[this.state.month.getMonth()] + ' ' +  this.state.month.getFullYear()}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <div className='ToolbarButtons'>
                <div className='ToolbarItem'>
                  <IconButton color="primary" onClick={goToBack} variant="contained" size="small">
                    <ArrowBack />
                  </IconButton>
                </div>
                <div className='ToolbarItem'>
                  <IconButton color="primary" onClick={goToNext} variant="contained" size="small">
                    <ArrowForward />
                  </IconButton>
                </div>
                <div className='ToolbarItem'>
                  <Button color="primary" onClick={goToToday} size="medium" variant="outlined">
                    Today
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </div>
    )
  }

  handleCheckFree = name => {
    console.log("free_selected")
    this.setState({
      checkedFree: !this.state.checkedFree
    }, () => this.filterEvents());
  };

  handleCheckFav = name => {
    console.log("fav_selected")
    this.setState({
      checkedFav: !this.state.checkedFav
    }, () => this.filterEvents());
  };

  onStartChange = date => {
    this.setState({
      start_datetime: date })};

  onEndChange = date => {
    this.setState({
      end_datetime: date })};

  toggleSelected = (id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp[id].selected = !temp[id].selected
    console.log("toggled")
    this.setState({
      [key]: temp
    }, () => this.filterEvents())
  }

  updateFilter = (listName, selectedList) => {
    console.log('updateFilter called')
    this.setState({
      [listName + '_selected']: selectedList,
    }, () => this.filterEvents())
  }

  getStateFromStorage(callback) {
    console.log('state gotten')
    var state = {}
    for (let key in this.state) {
      console.log(key)
      // if the key exists in sessionStorage
      if (sessionStorage.hasOwnProperty(key)) {
        // get the key's value from sessionStorage
        let value = sessionStorage.getItem(key);
        console.log(value)
        // parse the sessionStorage string and setState
        try {
          value = JSON.parse(value);
          state[key] = value;
        } catch (e) {
          // handle empty string
        }
      }
    }
    console.log(state)
    return state
  }

  saveStateToStorage() {
    // save state to local storage so it can be loaded
    console.log('state saved')
    for (let key in this.state) {
      if (key !== 'events') {
        sessionStorage.setItem(key, JSON.stringify(this.state[key]));
      }
    }
  }

  updateCalendar(locations="", categories="", organizations="", is_free="",
  start_date = "", end_date = "", favorites = "") {
    // empty string for parameters indicates select all of them
    // Repopulate calendar
    const url_getEvents = url + 'getEvents'
    const events = [];
    axios.get(url_getEvents, {
      params: {
        locations: locations,
        categories: categories,
        organizations: organizations,
        is_free: is_free,
        favorites: favorites
    }})
    .then(res => {
      const posts = JSON.parse(res.data.Events_JSON)

      posts.forEach((post) => {
        events.push({
          title: post.fields.name,
          start: new Date(post.fields.start_datetime),
          end: new Date(post.fields.end_datetime),
          desc: post.fields.description,
          loc: post.fields.location,
          website: post.fields.website,
          org: post.fields.org,
          is_free: post.fields.is_free,
          cat: post.fields.category
        })
      })
    })
    .then(res => {
      console.log(events)
      this.setState({events: events})
    })
    .catch(function(error) {
      console.log(error);
      console.log(error.response.data);
    })
  }

  filterEvents() {
    var i;
    var locations = "";
    var categories = "";
    var organizations = "";
    var is_free = "";
    var netid = localStorage.getItem('netid')
    var favorites = "";
    console.log('locations length: ' + this.state.locations.length)
    for (i = 0; i < this.state.locations.length; i++) {
      if (this.state.locations_selected.includes(this.state.locations[i].title)) {
        locations += (this.state.locations[i].title + ',');
      }
    }
    for (i = 0; i < this.state.categories.length; i++) {
      if (this.state.categories_selected.includes(this.state.categories[i].title)) {
        categories += (this.state.categories[i].title + ',');
      }
    }
    for (i = 0; i < this.state.organizations.length; i++) {
      if (this.state.organizations_selected.includes(this.state.organizations[i].title)) {
        organizations += (this.state.organizations[i].title + ',');
      }
    }
    // remove trailing commas from strings
    locations = locations.substr(0, locations.length-1);
    categories = categories.substr(0, categories.length-1);
    organizations = organizations.substr(0, organizations.length-1);
    if (this.state.checkedFree === true) {
      is_free = "true"
    }
    if (this.state.checkedFav === true) {
      favorites = "true"
    }
    console.log(locations)
    console.log(categories)
    console.log(organizations)
    console.log(is_free)
    console.log(netid)
    console.log(favorites)
    this.updateCalendar(locations,
                        categories,
                        organizations,
                        is_free,
                        favorites)
  }

  seeDetails = (event) => {
    this.props.changeToDetails(
      event, 
      this.state.month,
      this.state.organizations_selected,
      this.state.categories_selected,
      this.state.locations_selected,
      this.state.checkedFree,
      this.state.checkedFav)
    this.props.history.push('/details')
  }

  eventStyleGetter(event) {
    var color = orange
    /* Can add logic here to color code */
    var style = {
      backgroundColor: color,
      opacity: 0.8,
      color: 'black',
      border: '0px'
    }
    return {
      style: style
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  renderCalendar = () => {
    if (this._isMounted === true) {
      return (
        <BigCalendar
          localizer={localizer}
          events={this.state.events}
          defaultView={BigCalendar.Views.MONTH}
          onSelectEvent={this.seeDetails}
          views={['month', 'week']}
          eventPropGetter={(this.eventStyleGetter)}
          defaultDate={this.state.month}
          components={{toolbar: this.getCustomToolbar}}
        />
      )
    }
  }

  render() {
    // if authentication is not complete, display a loading page
    // if (this.state.loading == true) {
    //   return (
    //     <div className="container">
    //       <h4>Loading...</h4>
    //     </div>
    //   )
    // }
    var addEvent = <AddEventButton/>
    var addOrg = <AddOrgButton/>
    // const adminList = ['rachelsc', 'clairedu']
    // const isAdmin = adminList.includes(localStorage.getItem('netid'))
    // if (isAdmin) {
    //   addEvent = <AddEventButton/>
    //   addOrg = <AddOrgButton/>
    // }
    // else {
    //   addEvent = <div></div>
    //   addOrg = <div></div>
    // }
    if (this._isMounted === true) {
      return (
        <MuiThemeProvider theme={Theme}>
          <div className='CalendarPage'>

            <div className = "full-width">
              <header className="calendarhead">
              </header>
              <br></br>

              <div className='CalendarOptions'>
                <div className='FilterItemsTitle'>
                  <Typography className="month" variant="subtitle1" color="primary">
                    Filter Events
                  </Typography>
                </div>
                <div className='FilterItems'>
                  <div className='Menu'>
                    <DropdownMultiple
                      titleHelper="location"
                      title="Locations"
                      list={this.state.locations}
                      updateFilter={this.updateFilter}
                      selectedList={this.state.locations_selected}
                    />
                  </div>

                  <div className='Menu'>
                    <DropdownMultiple
                      titleHelper="event type"
                      title="Categories"
                      list={this.state.categories}
                      updateFilter={this.updateFilter}
                      selectedList={this.state.categories_selected}
                    />
                  </div>

                  <div className='Menu'>
                    <DropdownMultiple
                      titleHelper="organization"
                      title="Organizations"
                      list={this.state.organizations}
                      updateFilter={this.updateFilter}
                      selectedList={this.state.organizations_selected}
                    />
                  </div>

                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.checkedFree}
                          onChange={this.handleCheckFree}
                          value="checkedA"
                          color="primary"
                        />
                      }
                      label="Free Events"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.checkedFav}
                          onChange={this.handleCheckFav}
                          value="checkedA"
                          color="primary"
                        />
                      }
                      label="Favorites"
                    />

                  </FormGroup>
                </div>
              </div>

              <div className = "AddButtons">
                {addEvent}
                {addOrg}
              </div>

              
            </div>

            <div className='Calendar'>
              {this.renderCalendar()}
            </div>
          </div>

        </MuiThemeProvider>
      )
    } else {
      return (
        <div></div> /* Try loading sign */
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    changed_view: state.calReducer.changed_view,
    organizations_selected: state.calReducer.organizations_selected,
    categories_selected: state.calReducer.categories_selected,
    locations_selected: state.calReducer.locations_selected,
    month: state.calReducer.month,
    checked_free: state.calReducer.checked_free,
    checked_fav: state.calReducer.checked_fav,
    /*title: state.eventReducer.title,
    start: state.eventReducer.start,
    end: state.eventReducer.end,
    desc: state.eventReducer.desc,
    location: state.eventReducer.location,
    website: state.eventReducer.website,
    org: state.eventReducer.org,
    is_free: state.eventReducer.is_free*/
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeToDetails: (event, month, organizations, categories, locations, checked_free, checked_fav) => dispatch({
      type: 'changeToDetails',
      payload: {
        title: event.title,
        start: event.start,
        end: event.end,
        desc: event.desc,
        loc: event.loc,
        website: event.website,
        org: event.org,
        is_free: event.is_free,
        cat: event.cat,
        month: month,
        categories_selected: categories,
        organizations_selected: organizations,
        locations_selected: locations,
        changed_view: true,
        checked_free: checked_free,
        checked_fav: checked_fav
      }
    })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Calendar))

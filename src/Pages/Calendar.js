import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Theme from '../Assets/Theme'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'

// Components
import BigCalendar from 'react-big-calendar'
import DropdownMultiple from './Components/DropdownMultiple'
import AddEventButton from './Components/AddEventButton'
import AddOrgButton from './Components/AddOrgButton'
import RequestAdminButton from './Components/RequestAdminButton'
import MyEventsButton from './Components/MyEventsButton'
import Header from './Components/Header'
import LogOutButton from './Components/LogOutButton'

// Styling
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'

const localizer = BigCalendar.momentLocalizer(moment)
const url = 'https://whatsroaring-api.herokuapp.com/'
// const url ='http://127.0.0.1:8000/'
const orange = '#fb8c00'
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function getStartOfMonth() {
  var today = new Date()
  today.setDate(1)
  return today
}

function getStartOfWeek() {
  var today = new Date()
  var day = today.getDay()
  var diff = today.getDate() - day - 1 + (day === 0 ? -6:1)
  var newDate = new Date(today.setDate(diff))
  return newDate
}

// function to sort dropdown components
function compareDropdown(a, b) {
  var compA = a.toUpperCase();
  var compB = b.toUpperCase();
  if (compA < compB) return -1;
  if (compA > compB) return 1;
  return 0;
}

const styles = theme => ({
  formControl: {
    minWidth: 150,
    display: 'flex'
  },
  formGroup: {
    justifyContent: 'space-evenly',
    padding: theme.spacing.unit
  },
  select: {
    '&:before': {
      borderColor: orange,
    },
    '&:after': {
      borderColor: orange,
    },
  },
  icon: {
    fill: orange,
  },
  gridItem: {
    display: 'flex'
  },
  paper: {
    margin: theme.spacing.unit * 2,
    whiteSpace: 'nowrap',
    backgroundColor: '#f4f9f9',
    borderRadius: 3,
    alignItems: 'center'
  }
})

class Calendar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: localStorage.getItem('email'),
      isAdmin: localStorage.getItem('isAdmin'),
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
      displayDate: new Date(),
      view: 'month',
      changed_view: false, // if user has changed calendar settings
    }
    console.log('Email: ' + this.state.email)
    console.log('isAdmin: ' + this.state.isAdmin)
    this._isMounted = false
    this.eventStyleGetter = this.eventStyleGetter.bind(this)
    this.getCustomToolbar = this.getCustomToolbar.bind(this)
  }

  componentDidMount() {
    // Get location objects, then get category objects, then get organization objects.
    // Then apply filters and render the calendar.
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
      this.setState({
        locations: locs_arr
      }, () => this.setCategories())
    })
  }

  setCategories() {
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
      this.setState({
        categories: cats_arr
      }, () => this.setOrganizations())
    })
  }

  setOrganizations() {
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
      this.setState({
        organizations: orgs_arr
      }, () => this.applyFilters())
    })
  }

  applyFilters() {
    if (this.props.changed_view === false) {
      console.log('Default view')
      this.setState({
        locations_selected: [],
        categories_selected: [],
        organizations_selected: [],
        is_free: this.state.checkedFree,
        favorites: this.state.checkedFav
      }, () => this.filterEvents())
    } else {
      console.log('Recovering view')
      this.setState({
        locations_selected: this.props.locations_selected,
        categories_selected: this.props.categories_selected,
        organizations_selected: this.props.organizations_selected,
        is_free: this.props.checked_free,
        favorites: this.props.checked_fav,
        checkedFree: this.props.checked_free,
        checkedFav: this.props.checked_fav,
        displayDate: this.props.display_date,
        view: this.props.view,
     }, () => this.filterEvents())
    }
    this._isMounted = true
  }

  next() {
    var day = new Date(this.state.displayDate)
    if (this.state.view === 'day') {
      day.setDate(day.getDate() + 1)
    }
    if (this.state.view === 'week') {
      day.setDate(day.getDate() + 7)
    }
    if (this.state.view === 'month') {
      day.setMonth(day.getMonth() + 1)
    }
    this.setState({
      displayDate: new Date(day.toLocaleString())
    })
    return day
  }

  prev() {
    var day = new Date(this.state.displayDate)
    if (this.state.view === 'day') {
      day.setDate(day.getDate() - 1)
    }
    if (this.state.view === 'week') {
      day.setDate(day.getDate() - 7)
    }
    if (this.state.view === 'month') {
      day.setMonth(day.getMonth() - 1)
    }
    this.setState({
      displayDate: new Date(day.toLocaleString())
    })
    return day
  }

  getDisplayString() {
    var day = new Date(this.state.displayDate)
    if (this.state.view === 'day') {
      return monthNames[day.getMonth()] + ' ' + day.getDate() + ' ' + day.getFullYear()
    }
    if (this.state.view === 'week') {
      return 'Week of ' + monthNames[day.getMonth()] + ' ' + day.getDate() + ' ' + day.getFullYear()
    }
    if (this.state.view === 'day') {
      return monthNames[day.getMonth()] + ' ' + day.getDate() + ', ' + day.getFullYear()
    }
  }

  getCustomToolbar = (toolbar) => {
    const { classes } = this.props
    this.toolbarDate = toolbar.date
    const goToBack = () => {
      toolbar.onNavigate('back', this.prev())
    }
    const goToNext = () => {
      toolbar.onNavigate('next', this.next())
    }
    const goToToday = () => {
      var day = new Date()
      if (this.state.view === 'day') {
        this.setState({
          displayDate: new Date()
        }, () => console.log('New display date: ' + this.state.displayDate.toLocaleString()))
      }
      if (this.state.view === 'week') {
        this.setState({
          displayDate: new Date()
        }, () => console.log('New display date: ' + this.state.displayDate.toLocaleString()))
      }
      if (this.state.view === 'month') {
        this.setState({
          displayDate: new Date()
        }, () => console.log('New display date: ' + this.state.displayDate.toLocaleString()))
      }
      toolbar.onNavigate('today', day)
    }
    const handleViewChange = event => {
      var newView = event.target.value.toLowerCase()
      this.setState({ view: newView })
      if (newView === 'day') {
        this.setState({
          displayDate: new Date()
        }, () => toolbar.onView(newView, this.state.displayDate))
      }
      if (newView === 'week') {
        this.setState({
          displayDate: new Date()
        }, () => toolbar.onView(newView, this.state.displayDate))
      }
      if (newView === 'month') {
        this.setState({
          displayDate: new Date()
        }, () => toolbar.onView(newView, this.state.displayDate))
      }
    }
    var dispStr = ''
    var day = new Date(this.state.displayDate)
    if (this.state.view === 'day') {
      dispStr = monthNames[day.getMonth()] + ' ' + day.getDate() + ', ' + day.getFullYear()
    }
    if (this.state.view === 'week') {
      dispStr = 'Week of ' + monthNames[day.getMonth()] + ' ' + day.getDate() + ', ' + day.getFullYear()
    }
    if (this.state.view === 'month') {
      dispStr = monthNames[day.getMonth()] + ' ' + day.getFullYear()
    }


    return (
      <div className='ToolbarCalendar'>
        <MuiThemeProvider theme={Theme}>
          <Grid container alignItems='baseline'>
            <Grid item xs={5}>
              <Typography className="month" variant="h3" component="h3" color="primary">
                {dispStr}
              </Typography>
            </Grid>
            <Grid item xs={7}>
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
                <div className='ToolbarItem'>
                  <FormControl className={classes.formControl}>
                    <Select
                      value={capitalizeFirstLetter(this.state.view)}
                      onChange={handleViewChange}
                      input={
                        <OutlinedInput
                          labelWidth={0}
                          name='view'
                          className={classes.select}
                        />
                      }
                    >
                      <MenuItem value={'Month'}>Month</MenuItem>
                      <MenuItem value={'Week'}>Week</MenuItem>
                      <MenuItem value={'Day'}>Day</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </div>
    )
  }

  handleCheckFree = name => {
    this.setState({
      checkedFree: !this.state.checkedFree
    }, () => this.filterEvents());
  }

  handleCheckFav = name => {
    this.setState({
      checkedFav: !this.state.checkedFav
    }, () => this.filterEvents());
  }

  onStartChange = date => {
    this.setState({
      start_datetime: date })
  }

  onEndChange = date => {
    this.setState({
      end_datetime: date })
  }

  updateFilter = (listName, selectedList) => {
    this.setState({
      [listName + '_selected']: selectedList,
    }, () => this.filterEvents())
  }

  updateCalendar(locations="", categories="", organizations="", is_free="",
    favorites = "", email = "") {
    // empty string for parameters indicates select all of them
    // Repopulate calendar
    const url_getEvents = url + 'getEvents'
    const events = [];
    console.log('favorites: ', favorites)
    axios.get(url_getEvents, {
      params: {
        locations: locations,
        categories: categories,
        organizations: organizations,
        is_free: is_free,
        favorites: favorites,
        email: email
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
    // var netid = localStorage.getItem('netid')
    var email = this.state.email
    var favorites = "";
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
    console.log('favorites: ', favorites)
    this.updateCalendar(
      locations,
      categories,
      organizations,
      is_free,
      favorites,
      email)
  }

  seeDetails = (event) => {
    this.props.changeToDetails(
      event,
      this.state.displayDate,
      this.state.organizations_selected,
      this.state.categories_selected,
      this.state.locations_selected,
      this.state.checkedFree,
      this.state.checkedFav,
      this.state.view,)
    this.props.history.push('/details')
  }

  eventStyleGetter(event) {
    /* Can add logic here to color code */
    var style = {
      backgroundColor: orange,
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

  renderToolbar = () => {
    const { classes } = this.props
    var addEvent
    var requestAdmin
    var addOrg
    var myEvents = <div></div>
    var spacing = 'flex-start'
    if (this.state.isAdmin === 'true') {
      addEvent = <AddEventButton/>
      addOrg = <AddOrgButton/>
      spacing = 'space-between'
    }
    else {
      requestAdmin = <RequestAdminButton/>
      addEvent = <div></div>
      addOrg = <div></div>
    }
    return (
      <div class="toolbar" id="myToolbar" style={{zIndex: 999}}>
        <MuiThemeProvider theme={Theme}>
        <Grid
            container
            justify={spacing}
            alignItems='center'
          >
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <FormGroup row className={classes.formGroup}>
                  <FormControl className={classes.formControl}>
                    <DropdownMultiple
                      titleHelper="event type"
                      title="Categories"
                      list={this.state.categories}
                      updateFilter={this.updateFilter}
                      selectedList={this.state.categories_selected}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <DropdownMultiple
                      titleHelper="organization"
                      title="Organizations"
                      list={this.state.organizations}
                      updateFilter={this.updateFilter}
                      selectedList={this.state.organizations_selected}
                    />
                  </FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.checkedFree}
                        onChange={this.handleCheckFree}
                        color='primary'
                      />
                    }
                    label="Free Events"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.checkedFav}
                        onChange={this.handleCheckFav}
                        color='primary'
                      />
                    }
                    label="Favorites"
                  />
                  {addEvent}
                  {addOrg}
                  {requestAdmin}
                </FormGroup>
              </Paper>

              <Grid
                container
                justify='flex-end'
                alignItems='center'
              >
                <Grid item xs={3}>
                  <LogOutButton />
                </Grid>
              </Grid>


            </Grid>
          </Grid>
        </MuiThemeProvider>
      </div>
    )
  }

  renderCalendar = () => {
    var view
    if (this.state.view === 'day') {
      view = BigCalendar.Views.DAY
    }
    if (this.state.view === 'week') {
      view = BigCalendar.Views.WEEK
    }
    if (this.state.view === 'month') {
      view = BigCalendar.Views.MONTH
    }
    return (
      <BigCalendar
        localizer={localizer}
        events={this.state.events}
        defaultView={view}
        onSelectEvent={this.seeDetails}
        popup
        views={['month', 'week', 'day']}
        eventPropGetter={(this.eventStyleGetter)}
        defaultDate={this.state.displayDate}
        components={{toolbar: this.getCustomToolbar}}
      />
    )
  }

  render() {
    if (this.state.email === null) this.props.history.push('/')

    var toolbar = document.getElementById("myToolbar");
    if (toolbar != null) {
      var sticky = toolbar.offsetTop;
      function myFunction() {
        if (window.pageYOffset > sticky) {
          toolbar.classList.add("sticky");
        } else {
          toolbar.classList.remove("sticky");
        }
      }
      window.onscroll = function() {myFunction()};
    }

    if (this._isMounted === true) {
      return (
        <div className='CalendarPage'>
          <Header />
          {this.renderToolbar()}
          <MuiThemeProvider theme={Theme}>

              {/*<Paper elevation={1}>
                <Grid container direction='row' alignItems='baseline'>
                  <Grid item xs={2}>
                    <div className='Menu'>
                      <DropdownMultiple
                        titleHelper="location"
                        title="Locations"
                        list={this.state.locations}
                        updateFilter={this.updateFilter}
                        selectedList={this.state.locations_selected}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div className='Menu'>
                      <DropdownMultiple
                        titleHelper="event type"
                        title="Categories"
                        list={this.state.categories}
                        updateFilter={this.updateFilter}
                        selectedList={this.state.categories_selected}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div className='Menu'>
                      <DropdownMultiple
                        titleHelper="organization"
                        title="Organizations"
                        list={this.state.organizations}
                        updateFilter={this.updateFilter}
                        selectedList={this.state.organizations_selected}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={1}>
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
                  </Grid>
                  <Grid item xs={1}>
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
                  </Grid>
                  <Grid item xs={1}>
                    {myEvents}
                  </Grid>
                  <Grid item xs={1}>
                    {addEvent}
                  </Grid>
                  <Grid item xs={2}>
                    {addOrg}
                  </Grid>
                  <Grid item xs={2}>
                    {requestAdmin}
                  </Grid>
                  <Grid item xs={2}>
                    <LogOutButton/>
                  </Grid>
                </Grid>
              </Paper>*/}
            <div className='Calendar'>
              {this.renderCalendar()}
            </div>
          </MuiThemeProvider>
        </div>
      )
    } else {
      return (
        <div className='page'>
          <header className='calendarhead'></header>
          <div>Loading...</div>
        </div>
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
    display_date: state.calReducer.display_date,
    checked_free: state.calReducer.checked_free,
    checked_fav: state.calReducer.checked_fav,
    view: state.calReducer.view,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeToDetails: (event, display_date, organizations, categories, locations, checked_free, checked_fav, view) => dispatch({
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
        display_date: display_date,
        categories_selected: categories,
        organizations_selected: organizations,
        locations_selected: locations,
        changed_view: true,
        checked_free: checked_free,
        checked_fav: checked_fav,
        view: view,
      }
    })
  }
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(Calendar)))

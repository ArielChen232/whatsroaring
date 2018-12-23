import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'

// Components
import BigCalendar from 'react-big-calendar'
import DropdownMultiple from './Components/DropdownMultiple'
import AddEventButton from './Components/AddEventButton'
import AddOrgButton from './Components/AddOrgButton'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

// Styling
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'


const localizer = BigCalendar.momentLocalizer(moment)
const url = 'https://whatsroaring-api.herokuapp.com/'
//const url = 'http://127.0.0.1:8000/'
const orange = '#fb8c00'

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
      events: [],
      netid: 'rachelsc',
      locations: [],
      categories: [],
      organizations: [],
      checkedFree: false,
      checkedFav: false,
      start_datetime: new Date(),
      end_datetime: new Date(),
      display_date: new Date()
    }
    this.eventStyleGetter = this.eventStyleGetter.bind(this)
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
  start_date = "", end_date = "", netid = "rachelsc", favorites = "") {
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
        netid: netid,
        favorites: favorites
    }})
    .then(res => {
      const posts = JSON.parse(res.data.Events_JSON)

      // UNCOMMENT THIS TO FIX
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

      // COMMENT THIS BLOCK TO FIX
      /*posts.forEach((post) => {
        getOrgName(post.fields.org, function(orgname) {
          events.push({
            title: post.fields.name,
            start: new Date(post.fields.start_datetime),
            end: new Date(post.fields.end_datetime),
            desc: post.fields.description,
            loc: post.fields.location,
            website: post.fields.website,
            org: orgname,
            is_free: post.fields.is_free
          })
        })
      })*/
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
    var netid = "rachelsc";
    var favorites = "";
    for (i = 0; i < this.state.locations.length; i++) {
      if (this.state.locations[i].selected === true) {
        locations += (this.state.locations[i].title + ',');
      }
    }
    for (i = 0; i < this.state.categories.length; i++) {
      if (this.state.categories[i].selected === true) {
        categories += (this.state.categories[i].title + ',');
      }
    }
    for (i = 0; i < this.state.organizations.length; i++) {
      if (this.state.organizations[i].selected === true) {
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
                        netid,
                        favorites)
  }

  componentDidMount() {
    this.updateCalendar()
    this.setState({locations:getLocationObjects(),
                   categories:getCategoryObjects(),
                   organizations:getOrganizationObjects(),
                   is_free: this.state.checkedFree,
                   netid: this.state.netid,
                   favorites: this.state.checkedFav
                 })
  }

  seeDetails = (event) => {
    console.log('Org: ' + event.org)
    this.props.changeToDetails(event);
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

  validate() {
    // const query = new URLSearchParams(this.props.location.search)
    // if (this.state.netid === '') {
    //   const url_netid = url + "netid"
    //   axios.get(url_netid)
    //   .then(res => {
    //     this.setState({netid: res['data']})
    //     // this.setState({netid: query.get('netid')})
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   })
    // }
    // this.state.netid = 'rachelsc'
    if (this.state.netid === '') this.setState({netid: 'rachelsc'})
    sessionStorage.setItem('netid', 'rachelsc')
  }

  render() {
    console.log('render')
    console.log(this.state)
    var addEvent
    var addOrg
    const adminList = ['rachelsc', '-']
    this.validate()
    const isAdmin = adminList.includes(this.state.netid)
    if (isAdmin) {
      addEvent = <AddEventButton/>
      addOrg = <AddOrgButton/>
    }
    else {
      addEvent = <div></div>
      addOrg = <div></div>
    }
    return (
    <div className='CalendarPage'>

      <div className = "full-width">
      <div className="Jumbotron">
      </div>
      <br>


      </br>
        <div className = "alignleft">

          <DropdownMultiple
            titleHelper="location"
            title="Select location"
            list={this.state.locations}
            toggleItem={this.toggleSelected}
          />
          </div>


          <div className = "alignleft">
            <DropdownMultiple
              titleHelper="event type"
              title="Select event type"
              list={this.state.categories}
              toggleItem={this.toggleSelected}
            />
          </div>

          <div className = "alignleft">
            <DropdownMultiple
              titleHelper="organization"
              title="Select organization"
              list={this.state.organizations}
              toggleItem={this.toggleSelected}
            />
          </div>

          <div className = "alignright">
            {addEvent}
            {addOrg}
          </div>

          <div className = "alignleft">

          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedA}
                  onChange={this.handleCheckFree}
                  value="checkedA"
                  color="primary"
                />
              }
              label="Free events only"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedA}
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

        <div className='Calendar'>
          <BigCalendar
            localizer={localizer}
            events={this.state.events}
            defaultView={BigCalendar.Views.MONTH}
            onSelectEvent={this.seeDetails}
            views={['month', 'week', 'day']}
            eventPropGetter={(this.eventStyleGetter)}
            defaultDate={this.state.display_date}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
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
    changeToDetails: (event) => dispatch({
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
        cat: event.cat
      }
    })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Calendar))

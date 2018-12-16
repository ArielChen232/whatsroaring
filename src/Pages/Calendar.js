import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'

// Styling
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'
import DropdownMultiple from './Components/DropdownMultiple'
import FilterForm from './Components/FilterForm'
import LogInButton from './Components/LogInButton'
import AddEventButton from './Components/AddEventButton'
import CheckboxLabels from './Components/Checkbox'
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

const localizer = BigCalendar.momentLocalizer(moment)
// const url = 'https://whatsroaring-api.herokuapp.com/'
const url = 'http://127.0.0.1:8000/'
const orange = '#fb8c00'

let imgUrl = 'homepage_background.png';

var sectionStyle = {
  width: "100%",
  height: "100%",
  backgroundImage: 'url(' + imgUrl + ')',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
};

function getOrgName(orgPk) {
  const url_orgName = url + 'getOrgName/' + orgPk;
  var orgname;
  axios.get(url_orgName).then(res => {
    const posts = JSON.parse(res.data.data)
    if (posts.length >= 1) {
      orgname = posts[0].fields.name;
      // console.log('Org name: ' + orgname)
    }
  })
  // this isn't updated because asynchronous?
  // console.log('org name' + orgname)
  return orgname
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
      events: [],
      netid: '',
      locations: [],
      categories: [],
      organizations: [],
      freeOnly: false,
      favorites: false,
      checkedFree: false,
      checkedFav: false
    }
    this._isMounted = false
    this.eventStyleGetter = this.eventStyleGetter.bind(this)
  }

  toggleSelected = (id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp[id].selected = !temp[id].selected
    console.log("toggled")
    this.setState({
      [key]: temp
    }, () => this.filterEvents())
  }

  updateCalendar(locations="", categories="", organizations="") {
    // empty string for parameters indicates select all of them
    // Repopulate calendar
    const url_getEvents = url + 'getEvents'
    axios.get(url_getEvents, {
      params: {
        locations: locations,
        categories: categories,
        organizations: organizations,
    }})
    .then(res => {
      console.log("reached this point")
      const posts = JSON.parse(res.data.Events_JSON)
      const events = [];
      posts.forEach((post) => {
        events.push({
          title: post.fields.name,
          start: new Date(post.fields.start_datetime),
          end: new Date(post.fields.end_datetime),
          desc: post.fields.description,
          loc: post.fields.location,
          website: post.fields.website,
          org: getOrgName(post.fields.org),
          is_free: post.fields.is_free
        })
      })
      this.setState({events}, () => this._isMounted = true)
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
    for (i = 0; i < this.state.locations.length; i++) {
      if (this.state.locations[i].selected == true) {
        locations += (this.state.locations[i].title + ',');
      }
    }
    for (i = 0; i < this.state.categories.length; i++) {
      if (this.state.categories[i].selected == true) {
        categories += (this.state.categories[i].title + ',');
      }
    }
    for (i = 0; i < this.state.organizations.length; i++) {
      if (this.state.organizations[i].selected == true) {
        organizations += (this.state.organizations[i].title + ',');
      }
    }
    // remove trailing commas from strings
    locations = locations.substr(0, locations.length-1);
    categories = categories.substr(0, categories.length-1);
    organizations = organizations.substr(0, organizations.length-1);
    console.log(locations)
    console.log(categories)
    console.log(organizations)
    this.updateCalendar(locations=locations,
                        categories=categories,
                        organizations=organizations)
  }

  componentDidMount() {
    this.setState({locations:getLocationObjects(),
                   categories:getCategoryObjects(),
                   organizations:getOrganizationObjects()},
                 () => this.updateCalendar())
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
    const query = new URLSearchParams(this.props.location.search)
    var ticket = query.get('ticket')
    if (ticket) {
      const url_netid = url + "netid?ticket=" + ticket
      axios.get(url_netid)
      .then(res => {
        this.setState({netid: res['data']})
      })
      .catch(function(error) {
        console.log(error);
      })
    }
  }

  render() {
    var addEvent
    const adminList = ['rachelsc', '-']
    this.validate()
    const isAdmin = adminList.includes(this.state.netid)
    if (isAdmin) {
      addEvent = <AddEventButton/>
    }
    else {
      addEvent = <div></div>
    }
    return (
    <div className='CalendarPage'>

      <div class = "full-width">
      <div className="Jumbotron">
      </div>
      <br>


      </br>
        <div class = "alignleft">

          <DropdownMultiple
            titleHelper="location"
            title="Select location"
            list={this.state.locations}
            toggleItem={this.toggleSelected}
          />
          </div>


          <div class = "alignleft">
            <DropdownMultiple
              titleHelper="event type"
              title="Select event type"
              list={this.state.categories}
              toggleItem={this.toggleSelected}
            />
          </div>

          <div class = "alignleft">
            <DropdownMultiple
              titleHelper="organization"
              title="Select organization"
              list={this.state.organizations}
              toggleItem={this.toggleSelected}
            />
          </div>
          <div class = "alignright">
            <AddEventButton/>
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
        is_free: event.is_free
      }
    })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Calendar))

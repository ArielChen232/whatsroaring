import axios from 'axios';
import { Cookies } from 'react-cookie';
import React, { Component } from 'react';

// I added this super basic form just to test the connection bw frontend/backend
// code taken from https://www.reddit.com/r/django/comments/570qgn/how_do_i_pass_a_react_dom_states_information_to/
// The input box should take the name of some location to filter by
// The location should be sent to the backend as an Ajax request
// In the backend I modified the getEvents method to handle filtering by location

class FilterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location:'',
        }
    }

    // onChange handler saves subject to state
    handleLocationChange = (event) => {this.setState({location: event.target.value})};

    // Handler for the button/submit event
    handleSubmit = () => {
        // Gathering together the data you want to send to API
        const payload = {
            location: this.state.location,
        };

        // Method we're using to send data to API
        this.handleAjaxRequest(payload);
    };

    // Method to send ContactForm's data to backend
    handleAjaxRequest = (payload) => {
        // [1] This is a POST request, so we need a CSRF token (unless otherwise
        // omitted through Django, but omitted in this explanation)
        const csrftoken = Cookies.get('csrftoken');

        // Use your AJAX/HTTP library of choice. I'm using Axios[2] here.
        let request = axios({
            method: 'post',
            // backend url to send data to
            url: 'http://127.0.0.1:8000/getEvents',
            data: payload,
            headers: {'X-CSRFToken': csrftoken}
        });

        // Not sure what to do with this response. It should contain the new
        // events, but somehow need to populate the calendar with them.
        // Currently it seems that on form submit the calendar page is simply
        // reloaded without the new events, which is not what we want
        request.then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    };

    render() {
        return (
            // Basic form
            <form>
                <input value={this.state.location} onChange={this.handleLocationChange} />
                <button onClick={this.handleSubmit}>Send</button>
            </form>
        );
    }
}

export default FilterForm

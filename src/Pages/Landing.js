import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LogInButton from './Components/LogInButton'

import './Landing.css'

let imgUrl = 'homepage_background.png';

var sectionStyle = {
  width: "100%",
  height: "600px",
  backgroundImage: 'url(' + imgUrl + ')',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
};

class Landing extends Component {


  constructor(...args) {
    super(...args)
    this.state = {
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="Jumbotron">
        </div>
        <div className="wrapper">
          <section style={ sectionStyle }>
          <br>

          </br>
            <LogInButton/>
          </section>
        </div>
      </div>
      )
    }

}

export default withRouter(Landing);

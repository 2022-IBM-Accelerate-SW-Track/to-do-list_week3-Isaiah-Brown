import React, { Component } from "react";
import "./About.css";
import profile_pic from "../assets/profile_pic.jpeg";

export default class About extends Component {
  render() {
    return (
      <div>
        {/* <p>Design your About me page </p> */}
        <div class="split left">
          <div className="centered">
            <img
              className="profile_image"
              src={profile_pic}
              alt="Profile Pic"
            ></img>
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Isaiah Brown</div>
            <div className="brief_description">
              Salutations! I'm a rising junior at Franklin & Marshall College. 
              Awhile back my pet hamster "joe" died. Very sad. 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

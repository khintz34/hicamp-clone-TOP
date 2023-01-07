import React from "react";
import "../../styles/About.css";
import Header from "./Header";
import Tagline from "../reuseableComps/Tagline";
import AboutDivs from "../aboutComps/AboutDivs";
import Footer from "./Footer";
import AboutVerticals from "../aboutComps/AboutVerticals";

const About = (props) => {
  return (
    <div className="aboutDivContainer">
      <Header />
      <div id="aboutDivMain">
        <div id="aboutHeadingDiv">
          <Tagline />
          <AboutVerticals />
        </div>
        <div id="aboutInfoDiv">
          <div className="aboutHeading">
            From public parks to private land, we're the most comprehensive
            guide to getting outside.
          </div>
          <div className="aboutMidPara">
            We cover all National, State, Regional and Army Corps Parks in all
            52 States. Which comes out to 23,248 Parks, 37,608 Campgrounds and
            381,629 Campsites across the USA.
          </div>
          <AboutDivs />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;

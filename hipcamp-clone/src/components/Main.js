import React from "react";
import "../styles/Main.css";
import HalfDiv from "./HalfDiv";
import Where from "./Where";
import fallCozy from "../images/fall-cozy.jpeg";
import outdoorStairs from "../images/outdoor-stairs.jpeg";
import hillside from "../images/hillside.jpeg";
import FullDiv from "./FullDiv";
import VerticalDiv from "./VerticalDiv";
import tent from "../images/tent.jpeg";
import cabin from "../images/cabin.jpeg";
import butterfly from "../images/butterfly.jpeg";
import SquareDiv from "./SquareDiv";
import pool from "../images/pool.jpeg";
import car from "../images/car.jpeg";
import redTent from "../images/redTent.jpeg";
import rv from "../images/rv.jpeg";
import glamping from "../images/glamping.jpeg";
import stringLights from "../images/stringLights.jpeg";
import CircleDiv from "./circleDiv";
import circleBridge from "../images/circleBridge.jpeg";
import circleLlama from "../images/circleLlama.jpeg";
import circleBarrell from "../images/circleBarrell.jpeg";

const Main = () => {
  const orangeColor = {
    backgroundColor: "var(--orange-color)",
  };
  const greenColor = {
    backgroundColor: "var(--camo)",
  };
  const tentColor = {
    backgroundColor: "var(--tent)",
  };
  const butterflyColor = {
    backgroundColor: "var(--butterfly)",
  };
  const cabinColor = {
    backgroundColor: "var(--cabin)",
  };
  const poolColor = {
    backgroundColor: "var(--pool)",
  };
  const orangeFont = {
    color: "var(--orange-color)",
  };
  const greenFont = {
    color: "var(--camo)",
  };
  const borderOne = {
    borderRadius: "150px 100px 170px 100px",
  };
  const borderTwo = {
    borderRadius: "200px 130px 140px 250px",
  };
  const borderThree = {
    borderRadius: "1000px 500px 190px 400px",
  };

  return (
    <div id="mainDiv">
      <Where />
      <div className="sideBySide">
        <HalfDiv
          image={fallCozy}
          title="Cozy Fall Stays"
          comment="Find yourself outside at a cozy Hipcamp this autumn."
          style={orangeColor}
          font={orangeFont}
        />
        <HalfDiv
          image={outdoorStairs}
          title="Get outside this weekend"
          comment="Pitch your tent, roll up in your can or find a glamping stay."
          style={greenColor}
          font={greenFont}
        />
      </div>
      <div>
        <FullDiv
          image={hillside}
          title="Own Land? Earn money from Hipcamp"
          comment="Host our community of good-natured campers, glampers, and RV travelers on your land or at your cabin."
          style={orangeColor}
          font={orangeFont}
        />
      </div>
      <div id="verticalDivsContainer">
        <VerticalDiv
          image={tent}
          style={tentColor}
          title="Hidden gems"
          comment="Sites on the rise"
        />
        <VerticalDiv
          image={butterfly}
          style={butterflyColor}
          title="Project Monarch"
          comment="Hosts protecting Monarch Butterflies"
        />
        <VerticalDiv
          image={cabin}
          style={cabinColor}
          title="Cottage Stays"
          comment="Our top picks"
        />
      </div>
      <div id="discoverDiv">
        <h2>Discover top spots near you</h2>
      </div>
      <div id="squareDivsContainer">
        <SquareDiv
          image={stringLights}
          title="Available Tonight"
          style={greenColor}
        />
        <SquareDiv
          image={pool}
          title="Available this weekend"
          style={poolColor}
        />
        <SquareDiv
          image={redTent}
          title="Available next weekend"
          style={orangeColor}
        />
        <SquareDiv image={car} title="Camping near me" style={tentColor} />
        <SquareDiv
          image={glamping}
          title="Glamping near me"
          style={butterflyColor}
        />
        <SquareDiv image={rv} title="RV sites near me" style={cabinColor} />
      </div>
      <div id="mainCircleDiv">
        <div>
          <h1>Hipcamp is the simplest way to find yourself outside.</h1>
        </div>
        <div id="circleDivsContainer">
          <CircleDiv
            image={circleBridge}
            title="Unlock new access to unexpected places."
            comment="Easily book secluded outdoor tent sites, RV sites, and glamping stays on private lands -- from blueberry farms to lakeside yurts."
            border={borderOne}
          />
          <CircleDiv
            image={circleBarrell}
            title="Discover unique outdoor experiences."
            comment="Relax in an outdoor sauna, explore hidden swimming holes, do yoga with the goats, and eat wood-fired pizza under the stars."
            border={borderTwo}
          />
          <CircleDiv
            image={circleLlama}
            title="Protect our wild places."
            comment="By booking with Hipcamp, you're funding the protection of open spaces and supporting the people who support the land."
            border={borderThree}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;

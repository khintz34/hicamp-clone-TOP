import React, { useContext, useEffect, useState } from "react";
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
import bryceCanyon from "../images/bryceCanyon.webp";
import joshuaTree from "../images/joshuaTree.webp";
import shenandoah from "../images/shenandoah.jpeg";
import smoky from "../images/smoky.jpeg";
import yellowStone from "../images/yellowStone.jpeg";
import yosemite from "../images/yosemite.jpeg";
import SquareDivWTag from "./squareDivWTag";
import recreate from "../images/recreateResp.png";
import leaveNoTrace from "../images/leaveNoTrace.png";
import nationalWeather from "../images/national_weather.png";
import SafetyDiv from "./SafetyDiv";
import { SiteContext } from "../contexts/SiteContext";
import { db } from "../utils/firebase";
import { ref, onValue } from "firebase/database";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { CheckInContext } from "../contexts/CheckInContext";

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
  const showNone = {
    display: "none",
  };
  const noStyle = {
    listStyleType: "none",
  };
  const stretchImage = {
    width: "20vh",
  };
  const { currentAuth, setCurrentAuth } = useContext(AuthContext);
  const { checkInDate, setCheckInDate } = useContext(CheckInContext);
  console.log(checkInDate);

  const [fullSiteList, setFullSiteList] = useState([]);
  const { currentSiteList, setCurrentSiteList } = useContext(SiteContext);

  function getUserData() {
    const boardRef = ref(db, "SiteList/");
    let displayArray = [];
    onValue(
      boardRef,
      (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const childKey = childSnapShot.key;
          const childData = childSnapShot.val();
          let obj = {
            name: childData.name,
            guests: childData.guests,
            type: childData.type,
            city: childData.city,
            state: childData.state,
            acres: childData.acres,
            special: childData.special,
            available: childData.available,
            activities: childData.activities,
            features: childData.features,
            park: childData.park,
            pets: childData.pets,
            fires: childData.fires,
            lake: childData.lake,
            rating: childData.rating,
            reviewNum: childData.reviewNum,
            price: childData.price,
            info: childData.info,
            url: childData.url,
          };
          addData(obj);
        });
      },
      {
        onlyOnce: false,
      }
    );

    function addData(obj) {
      displayArray.push(obj);
      sortArray();
    }

    function sortArray() {
      displayArray.sort((a, b) => {
        return a.time - b.time;
      });
      setFullSiteList(displayArray);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div id="mainDiv">
      <Where list={fullSiteList} />
      <div className="sideBySide">
        <Link to={"/siteList"}>
          <HalfDiv
            image={fallCozy}
            title="Cozy Fall Stays"
            comment="Find yourself in MN at a cozy Hipcamp this autumn."
            style={orangeColor}
            font={orangeFont}
            list={fullSiteList}
          />
        </Link>
        <Link to={"/siteList"}>
          <HalfDiv
            image={outdoorStairs}
            title="Get outside in MT this weekend"
            comment="Pitch your tent, roll up in your can or find a glamping stay."
            style={greenColor}
            font={greenFont}
            list={fullSiteList}
          />
        </Link>
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
        <Link to={"/siteList"}>
          <VerticalDiv
            image={tent}
            style={tentColor}
            title="Hidden gems"
            comment="Sites on the rise"
            list={fullSiteList}
            special="hidden"
          />
        </Link>
        <Link to={"/siteList"}>
          <VerticalDiv
            image={butterfly}
            style={butterflyColor}
            title="Project Monarch"
            comment="Hosts protecting Monarch Butterflies"
            list={fullSiteList}
            special="monarchs"
          />
        </Link>
        <Link to={"/siteList"}>
          <VerticalDiv
            image={cabin}
            style={cabinColor}
            title="Cottage Stays"
            comment="Our top picks"
            list={fullSiteList}
            special="cottage"
          />
        </Link>
      </div>
      <div id="discoverDiv">
        <h2>Discover top spots near you</h2>
      </div>
      <div className="squareDivsContainer">
        <Link to="/SiteList" className="noUnderline">
          <SquareDiv
            image={stringLights}
            title="Pet friendly"
            style={greenColor}
            list={fullSiteList}
            item="pets"
          />
        </Link>
        <Link to="/SiteList" className="noUnderline">
          <SquareDiv
            image={pool}
            title="Lake access"
            style={poolColor}
            item="lake"
            list={fullSiteList}
          />
        </Link>
        <Link to="/SiteList" className="noUnderline">
          <SquareDiv
            image={redTent}
            title="Camp fires allowed"
            style={orangeColor}
            item="fires"
            list={fullSiteList}
          />
        </Link>
        <Link to="/SiteList" className="noUnderline">
          <SquareDiv
            image={car}
            title="Tent camping"
            style={tentColor}
            item="Tent"
            list={fullSiteList}
          />
        </Link>
        <Link to="/SiteList" className="noUnderline">
          <SquareDiv
            image={glamping}
            title="Lodging"
            style={butterflyColor}
            item="Lodging"
            list={fullSiteList}
          />
        </Link>
        <Link to="/SiteList" className="noUnderline">
          <SquareDiv
            image={rv}
            title="RV sites"
            style={cabinColor}
            item="RV"
            list={fullSiteList}
          />
        </Link>
      </div>
      <div id="mainCircleDiv">
        <div className="lTHolder">
          <div className="largeText">
            Hipcamp is the simplest way to find yourself outside.
          </div>
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
      <div id="placesToGoMainDiv" className="squareDivsContainer">
        <Link to="/SiteList" className="noUnderline">
          <SquareDivWTag
            image={bryceCanyon}
            title="Bryce Canyon"
            comment="Utah"
            list={fullSiteList}
            park="Bryce Canyon National Park"
          />
        </Link>
        <Link to="/SiteList" className="noUnderline">
          <SquareDivWTag
            image={joshuaTree}
            title="Joshua Tree"
            comment="California"
            list={fullSiteList}
            park="Joshua Tree National Park"
          />
        </Link>
        <Link to="/SiteList" className="noUnderline">
          <SquareDivWTag
            image={shenandoah}
            title="Shenandoah"
            comment="Virginia"
            list={fullSiteList}
            park="Shenandoah National Park"
          />
        </Link>
        <Link to="/SiteList" className="noUnderline">
          <SquareDivWTag
            image={smoky}
            title="Great Smoky Mountains"
            comment="Tennessee"
            list={fullSiteList}
            park="Great Smoky Mountains National Park"
          />
        </Link>
        <Link to="/SiteList" className="noUnderline">
          <SquareDivWTag
            image={yellowStone}
            title="Yellowstone"
            comment="Wyoming"
            list={fullSiteList}
            park="Yellowstone National Park"
          />
        </Link>
        <Link to="/SiteList" className="noUnderline">
          <SquareDivWTag
            image={yosemite}
            title="Yosemite"
            comment="California"
            list={fullSiteList}
            park="Yosemite National Park"
          />
        </Link>
      </div>
      <div id="safetyDivHolder">
        <div id="safetyDivMain">
          <SafetyDiv
            image={recreate}
            title="Recreate Responsibility"
            li1="Know before you go"
            li2="Practice physical distancing"
            li3="Plan ahead"
            li4="Explore locally"
            li5="Play it safe"
            li6="Leave no trace"
            li7="Build an inclusive outdoors"
            url="https://www.recreateresponsibly.org/"
          />
          <SafetyDiv
            image={leaveNoTrace}
            title="Leave No Trace"
            li1="Plan ahead and prepare"
            li2="Tavel and camp on durable surfaces"
            li3="Dispose of waste properly"
            li4="Leave what you find"
            li5="Minimize fire impacts"
            li6="Respect wildlife"
            li7="Be considerate of others"
            stretch={stretchImage}
            url="https://lnt.org/why/7-principles/"
          />

          <SafetyDiv
            image={nationalWeather}
            title="National Weather Service"
            comment="We integrate with the National Weather Service to provice valuable fire advisories to Hosts and Hipcampers. Real-time Red Flag Warnings help keep our community safe."
            show={showNone}
            type={noStyle}
            url="https://www.weather.gov/"
          />
        </div>
      </div>
    </div>
  );
};

export default Main;

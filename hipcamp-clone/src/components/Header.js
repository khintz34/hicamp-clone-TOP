import React, { useContext, useState, useEffect } from "react";
import { SiteContext } from "../contexts/SiteContext";
import "../styles/Header.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { db } from "../utils/firebase";
import { ref, onValue } from "firebase/database";

const Header = () => {
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

  const handleCurrentList = () => {
    let newArray = [];

    fullSiteList.map((value, key) => {
      if (value.state === "Montana") {
        newArray.push(value);
      }
    });
    setCurrentSiteList(newArray);
  };

  return (
    <div id="headerDiv">
      <div id="logo-div">
        <Link to="/">
          <img src={logo} alt="" className="logo" />
        </Link>
      </div>
      <div id="header-btns">
        <div className="header-btn" onClick={handleCurrentList}>
          <Link to="/siteList" className="noUnderline">
            Near Me
          </Link>
        </div>
        <div className="header-btn">
          <Link className="noUnderline" to="/about">
            About
          </Link>
        </div>
        <div className="header-btn">
          <Link className="noUnderline" to="/owners">
            Start hosting{" "}
          </Link>
        </div>
        <div className="header-btn">Log in</div>
        <button id="signUp-btn">Sign up</button>
      </div>
    </div>
  );
};

export default Header;

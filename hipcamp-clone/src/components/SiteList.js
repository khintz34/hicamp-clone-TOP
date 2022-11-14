import React, { useContext, useEffect, useState } from "react";
import "../styles/SiteList.css";
import Header from "./Header";
import { db } from "../utils/firebase";
import { ref, set, push, onValue } from "firebase/database";
import MiniSite from "./MiniSite";
import { SiteContext } from "../contexts/SiteContext";
import { Link } from "react-router-dom";
import { CurrentSiteContext } from "../contexts/CurrentSiteContext";

const SiteList = (props) => {
  const [siteArray, setSiteArray] = useState([]);
  const { currentSiteList, setCurrentSiteList } = useContext(SiteContext);
  const { currentSite, setCurrentSite } = useContext(CurrentSiteContext);
  const [maxVal, setMaxVal] = useState(0);
  const [minVal, setMinVal] = useState(0);
  const [currentVal, setCurrentVal] = useState(maxVal);
  const [maxAcres, setMaxAcres] = useState(0);
  const [minAcres, setMinAcres] = useState(0);
  const [currentAcres, setCurrentAcres] = useState(maxAcres);
  const [currentSiteHolder, setCurrentSiteHolder] = useState([]);

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
            rating: childData.rating,
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
        return a.name - b.name;
      });
      setCurrentSiteList(displayArray);
    }
  }

  function showType(type) {
    let newArray = [];

    currentSiteList.map((value, key) => {
      value.type.map((value2, key2) => {
        if (value2 === type) {
          newArray.push(value);
        }
      });
    });

    setCurrentSiteList(newArray);
  }

  function findMaxMin() {
    let numMax = 0;
    let numMin = 20;
    let acresMax = 0;
    let acresMin = 0;
    currentSiteList.map((value, key) => {
      if (value.guests > numMax) {
        numMax = value.guests;
      }
      if (value.guests < numMin) {
        numMin = value.guests;
      }
      if (value.acres > acresMax) {
        acresMax = value.acres;
      }
      if (value.acres < acresMin) {
        acresMin = value.acres;
      }
    });
    setMaxVal(numMax);
    setMinVal(numMin);
    setCurrentVal(numMax);
    setCurrentAcres(acresMax);
  }

  function handleGuestsChange(e) {
    setCurrentVal(e.target.value);
    let newGuestNum = e.target.value;
    let newArray = [];
    const FullList = currentSiteHolder;

    FullList.map((value, key) => {
      if (value.guests <= newGuestNum) {
        newArray.push(value);
      }
    });

    setCurrentSiteList(newArray);
  }

  function handleAcresChange(e) {
    setCurrentAcres(e.target.value);
    let newAcresNum = e.target.value;
    let newArray = [];
    const FullList = currentSiteHolder;

    FullList.map((value, key) => {
      if (value.acres <= newAcresNum) {
        newArray.push(value);
      }
    });

    setCurrentSiteList(newArray);
  }

  useEffect(() => {
    findMaxMin();
    setCurrentSiteHolder(currentSiteList);
  }, []);

  return (
    <div className="siteListContainer">
      <Header />
      <div id="siteListHeader">
        <button className="siteBtn" onClick={() => showType("Tent")}>
          Tents
        </button>
        <button className="siteBtn" onClick={() => showType("Lodging")}>
          Lodging
        </button>
        <button className="siteBtn" onClick={() => showType("RV")}>
          RVs
        </button>
        <div>
          <input
            type="range"
            id="guestSlider"
            name="guests"
            min={minVal}
            max={maxVal}
            step="1"
            onChange={(e) => {
              handleGuestsChange(e);
            }}
            value={currentVal}
          />
          <label htmlFor="guestSlider">Max Guests ({currentVal})</label>
        </div>
        <div>
          <input
            type="range"
            id="acres"
            name="acres"
            step="10"
            onChange={(e) => {
              handleAcresChange(e);
            }}
            value={currentAcres}
          />
          <label htmlFor="acres">Max Acres ({currentAcres})</label>
        </div>
      </div>
      <div id="siteListMainContainer">
        <div id="siteListMain">
          {currentSiteList.map((value, key) => {
            return (
              <Link to={"/sites"} className="noUnderline" key={`link-${key}`}>
                <MiniSite
                  name={value.name}
                  type={value.type}
                  acres={value.acres}
                  city={value.city}
                  state={value.state}
                  price={value.price}
                  rating={value.rating}
                  reviewNum={value.reviewNum}
                  fullSite={value}
                  key={`key-${value.name}`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SiteList;

import React, { useState, useContext } from "react";
import { SiteContext } from "../contexts/SiteContext";
import "../styles/Where.css";
import mtnCamp from "../images/mtn-camping.jpeg";
import { Link } from "react-router-dom";

const Where = (props) => {
  const { currentSiteList, setCurrentSiteList } = useContext(SiteContext);
  const [guestNum, setGuestNum] = useState(0);
  const [petAllowed, setPetAllowed] = useState();
  const [firesAllowed, setFiresAllowed] = useState();
  const [lakeNearby, setLakeNearby] = useState();
  const [lodgingState, setLodgingState] = useState();
  const [location, setLocation] = useState("");
  const [mainWhere, setMainWhere] = useState("location");
  const FullList = props.list;

  function showWhereTo() {
    //todo remove query selector
    const popUp = document.querySelector("#whereToPopUp");
    popUp.classList.remove("hide");
    setMainWhere("location");
  }

  function hideWhereTo() {
    //todo remove query selector
    const popUp = document.querySelector("#whereToPopUp");
    popUp.classList.add("hide");
  }

  function showGuests() {
    //todo remove query selector
    const popUp = document.querySelector("#guestsPopUp");
    popUp.classList.remove("hide");
  }

  function hideGuests() {
    //todo remove query selector
    const popUp = document.querySelector("#guestsPopUp");
    popUp.classList.add("hide");
  }

  function addGuests() {
    let num = guestNum + 1;
    setGuestNum(num);
  }

  function subGuests() {
    if (guestNum > 0) {
      let num = guestNum - 1;
      setGuestNum(num);
    }
  }

  function allowPet() {
    setPetAllowed(true);
  }

  function allowNoPet() {
    setPetAllowed(false);
  }

  function allowFires() {
    if (firesAllowed === false || firesAllowed === undefined) {
      setFiresAllowed(true);
    } else {
      setFiresAllowed(false);
    }
    setMainWhere("fires");
    setLocation("Fires Allowed");
  }

  function decideLoding() {
    if (lodgingState === false || lodgingState === undefined) {
      setLodgingState(true);
    } else {
      setLodgingState(false);
    }
    setMainWhere("lodging");
    setLocation("Lodging Available");
  }

  function decideLake() {
    if (lakeNearby === false || lakeNearby === undefined) {
      setLakeNearby(true);
    } else {
      setLakeNearby(false);
    }
    setMainWhere("lakes");
    setLocation("Lakes Nearby");
  }

  function createList() {
    let newArray = [];

    if (mainWhere === "location") {
      FullList.map((value, key) => {
        if (value.state === location) {
          newArray.push(value);
        } else if (value.park === location) {
          newArray.push(value);
        } else if (value.city === location) {
          newArray.push(value);
        }
      });
    } else if (mainWhere === "fires") {
      FullList.map((value, key) => {
        if (value.fires === firesAllowed) {
          newArray.push(value);
        }
      });
    } else if (mainWhere === "lakes") {
      FullList.map((value, key) => {
        if (value.lake === lakeNearby) {
          newArray.push(value);
        }
      });
    } else if (mainWhere === "lodging") {
      FullList.map((value, key) => {
        value.type.map((value2, key2) => {
          if (value2 === "Lodging") {
            newArray.push(value);
          }
        });
      });
    }

    if (newArray.length > 0) {
      let arrayTwo = [];
      newArray.map((value, key) => {
        if (value.guests >= guestNum) {
          arrayTwo.push(value);
        }
      });
      newArray = arrayTwo;
    } else {
      FullList.map((value, key) => {
        if (value.guests >= guestNum) {
          newArray.push(value);
        }
      });
    }

    if (petAllowed !== undefined) {
      if (newArray.length > 0) {
        let arrayTwo = [];
        newArray.map((value, key) => {
          if (value.pets === petAllowed) {
            arrayTwo.push(value);
          }
        });
        newArray = arrayTwo;
      } else {
        FullList.map((value, key) => {
          if (value.pets === petAllowed) {
            newArray.push(value);
          }
        });
      }
    }
    setCurrentSiteList(newArray);
  }

  // todo how to not have to exact match??

  return (
    <div id="whereDiv">
      <div id="searchContainer">
        <div id="searchDiv">
          <div className="inputContainer" id="whereToDiv">
            <label>WHERE TO?</label>
            <input
              type="text"
              className="inputField"
              placeholder="Try Yosemite National Park or Minnesota"
              onClick={showWhereTo}
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
            <div id="whereToPopUp" className="hide">
              <div className="whereToList">
                <div>X</div>
                <div className="bottomUnderline" onClick={() => allowFires()}>
                  <div>Fires Allowed</div>
                </div>
              </div>
              <div className="whereToList">
                <div>X</div>
                <div className="bottomUnderline" onClick={() => decideLake()}>
                  <div>Lake Nearby</div>
                </div>
              </div>
              <div className="whereToList">
                <div>X</div>
                <div className="bottomUnderline" onClick={() => decideLoding()}>
                  <div>Lodging</div>
                </div>
              </div>
              <div className="exitPopUp" onClick={hideWhereTo}>
                X
              </div>
            </div>
          </div>
          <div className="inputContainer" id="datesDiv">
            <label>DATES</label>
            <input type="date" className="inputField" />
          </div>
          <div className="inputContainer" id="guestsDiv">
            <label>GUESTS</label>
            <input
              type="text"
              className="inputField"
              onClick={showGuests}
              placeholder="Add Guests"
              value={guestNum}
              onChange={(e) => {
                setGuestNum(e.target.value);
              }}
            />
            <div id="guestsPopUp" className="hide">
              <div className="guestList">
                <div className="stack">
                  <div>Guests</div>
                </div>
                <div className="addSub">
                  <button className="circleBtn" onClick={() => subGuests()}>
                    -
                  </button>
                  <div>{guestNum}</div>
                  <button className="circleBtn" onClick={() => addGuests()}>
                    +
                  </button>
                </div>
              </div>
              <div className="guestList" style={{ border: "none" }}>
                <div className="stack">
                  <div>Any pets?</div>
                </div>
                <div className="addSub">
                  <button className="circleBtn" onClick={() => allowNoPet()}>
                    N
                  </button>
                  <div> </div>
                  <button className="circleBtn" onClick={() => allowPet()}>
                    Y
                  </button>
                </div>
              </div>
              <div className="exitPopUp" onClick={hideGuests}>
                X
              </div>
            </div>
          </div>
          {/* // todo onClick setCurrentSiteList with values from search bar */}
          <Link to="/siteList">
            <button id="circleSearchBtn" onClick={() => createList()}>
              Search
            </button>
          </Link>
        </div>
      </div>
      <img src={mtnCamp} alt="" className="eightyWidth" />
    </div>
  );
};

export default Where;

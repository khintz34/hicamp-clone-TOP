import React, { useState, useContext } from "react";
import { SiteContext } from "../contexts/SiteContext";
import "../styles/Where.css";
import mtnCamp from "../images/mtn-camping.jpeg";
import { Link } from "react-router-dom";
import { SearchContext } from "../contexts/SearchContext";
import { PetContext } from "../contexts/PetContext copy";

const Where = (props) => {
  const { currentSiteList, setCurrentSiteList } = useContext(SiteContext);
  const { searchItem, setSearchItem } = useContext(SearchContext);
  const { petSearch, setPetSearch } = useContext(PetContext);
  const [guestNum, setGuestNum] = useState(0);
  const [petAllowed, setPetAllowed] = useState();
  const [firesAllowed, setFiresAllowed] = useState();
  const [lakeNearby, setLakeNearby] = useState();
  const [lodgingState, setLodgingState] = useState();
  const [location, setLocation] = useState("");
  const [mainWhere, setMainWhere] = useState("");
  const FullList = props.list;

  const removeHiddenClass = "";
  const hiddenClass = "hide";
  const [wherePopUp, setWherePopUp] = useState(hiddenClass);
  const [guestPopUp, setGuestPopUp] = useState(hiddenClass);
  const [petYes, setPetYes] = useState("circleBtn");
  const [petNo, setPetNo] = useState("circleBtn");

  function showWhereTo() {
    setWherePopUp(removeHiddenClass);
    setMainWhere("location");
  }

  function hideWhereTo() {
    setWherePopUp(hiddenClass);
  }

  function showGuests() {
    setGuestPopUp(removeHiddenClass);
  }

  function hideGuests() {
    setGuestPopUp(hiddenClass);
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
    setPetYes("circleBtn petChoice");
    setPetNo("circleBtn");
  }

  function allowNoPet() {
    setPetAllowed(false);
    setPetYes("circleBtn");
    setPetNo("circleBtn petChoice");
  }

  function allowFires() {
    if (firesAllowed === false || firesAllowed === undefined) {
      setFiresAllowed(true);
    } else {
      setFiresAllowed(false);
    }
    setMainWhere("fires");
    setLocation("Fires Allowed");
    setSearchItem("Fires Allowed");
  }

  function decideLoding() {
    if (lodgingState === false || lodgingState === undefined) {
      setLodgingState(true);
    } else {
      setLodgingState(false);
    }
    setMainWhere("lodging");
    setLocation("Lodging Available");
    setSearchItem("Lodging Available");
  }

  function decideLake() {
    if (lakeNearby === false || lakeNearby === undefined) {
      setLakeNearby(true);
    } else {
      setLakeNearby(false);
    }
    setMainWhere("lakes");
    setLocation("Lakes Nearby");
    setSearchItem("Lake Nearby");
  }

  function createList() {
    let newArray = [];

    setSearchItem(location);
    if (mainWhere === "location" && location !== "") {
      let locationArray = location.match(/\w+/g);
      FullList.map((value, key) => {
        if (value.state.toLowerCase() === location) {
          newArray.push(value);
        } else if (value.park.toString().toLowerCase() === location) {
          newArray.push(value);
        } else if (value.city.toLowerCase() === location) {
          newArray.push(value);
        } else if (value.name.toLowerCase() === location) {
          newArray.push(value);
        } else {
          let newLength = locationArray.length;
          let parkWords = value.park.toString().toLowerCase().match(/\w+/g);
          let cityWords = value.city.toString().toLowerCase().match(/\w+/g);
          let nameWords = value.name.toString().toLowerCase().match(/\w+/g);
          let matchArray = Array.from(Array(newLength).keys());
          parkWords.map((word) => {
            matchArray.shift();
            matchArray.push(word);
            if (
              matchArray.every((val, index) => val === locationArray[index])
            ) {
              newArray.push(value);
            }
          });
          cityWords.map((word) => {
            matchArray.shift();
            matchArray.push(word);
            if (
              matchArray.every((val, index) => val === locationArray[index])
            ) {
              newArray.push(value);
            }
          });
          nameWords.map((word) => {
            matchArray.shift();
            matchArray.push(word);
            if (
              matchArray.every((val, index) => val === locationArray[index])
            ) {
              newArray.push(value);
            }
          });
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
    } else if (guestNum !== 0) {
      console.log(guestNum);
      FullList.map((value, key) => {
        if (value.guests >= guestNum) {
          newArray.push(value);
        }
      });
    }

    if (petAllowed !== undefined) {
      setPetSearch(petAllowed);
      if (newArray.length > 0) {
        let arrayTwo = [];
        newArray.map((value, key) => {
          if (value.pets === petAllowed) {
            arrayTwo.push(value);
          }
        });
        newArray = arrayTwo;
      } else {
        setPetSearch(petAllowed);
        FullList.map((value, key) => {
          if (value.pets === petAllowed) {
            newArray.push(value);
          }
        });
      }
    } else {
      setPetSearch(petAllowed);
    }
    setCurrentSiteList(newArray);
  }

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
                setLocation(e.target.value.toString().toLowerCase());
              }}
            />
            <div id="whereToPopUp" className={wherePopUp}>
              <div className="whereToList">
                <div>X</div>
                <div className="bottomUnderline" onClick={allowFires}>
                  <div>Fires Allowed</div>
                </div>
              </div>
              <div className="whereToList">
                <div>X</div>
                <div className="bottomUnderline" onClick={decideLake}>
                  <div>Lake Nearby</div>
                </div>
              </div>
              <div className="whereToList">
                <div>X</div>
                <div className="bottomUnderline" onClick={decideLoding}>
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
            <div id="guestsPopUp" className={guestPopUp}>
              <div className="guestList">
                <div className="stack">
                  <div>Guests</div>
                </div>
                <div className="addSub">
                  <button className="circleBtn" onClick={subGuests}>
                    -
                  </button>
                  <div>{guestNum}</div>
                  <button className="circleBtn" onClick={addGuests}>
                    +
                  </button>
                </div>
              </div>
              <div className="guestList" style={{ border: "none" }}>
                <div className="stack">
                  <div>Any pets?</div>
                </div>
                <div className="addSub">
                  <button className={petNo} onClick={allowNoPet}>
                    N
                  </button>
                  <div> </div>
                  <button className={petYes} onClick={allowPet}>
                    Y
                  </button>
                </div>
              </div>
              <div className="exitPopUp" onClick={hideGuests}>
                X
              </div>
            </div>
          </div>
          <Link to="/siteList">
            <button id="circleSearchBtn" onClick={createList}>
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

import React, { useState, useContext, useEffect } from "react";
import { SiteContext } from "../../contexts/SiteContext";
import "../../styles/Where.css";
import mtnCamp from "../../images/mtn-camping.jpeg";
import { Link } from "react-router-dom";
import { SearchContext } from "../../contexts/SearchContext";
import { PetSearchContext } from "../../contexts/PetSearchContext";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import { CheckInContext } from "../../contexts/CheckInContext";
import { CheckOutContext } from "../../contexts/CheckOutContext";
import { emojiWhereList } from "../../assets/EmojiLists";

const Where = (props) => {
  const { currentSiteList, setCurrentSiteList } = useContext(SiteContext);
  const { searchItem, setSearchItem } = useContext(SearchContext);
  const { petSearch, setPetSearch } = useContext(PetSearchContext);
  const { checkOutDate, setCheckOutDate } = useContext(CheckOutContext);
  const { checkInDate, setCheckInDate } = useContext(CheckInContext);
  const [guestNum, setGuestNum] = useState(0);
  const [petAllowed, setPetAllowed] = useState("null");
  const [firesAllowed, setFiresAllowed] = useState("null");
  const [lakeNearby, setLakeNearby] = useState("null");
  const [lodgingState, setLodgingState] = useState("null");
  const [location, setLocation] = useState("");
  const [mainWhere, setMainWhere] = useState("null");

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
    if (
      firesAllowed === false ||
      firesAllowed === undefined ||
      firesAllowed === "null"
    ) {
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
    setLocation("Lodging");
    setSearchItem("Lodging");
  }

  function decideLake() {
    if (
      lakeNearby === false ||
      lakeNearby === undefined ||
      lakeNearby === "null"
    ) {
      setLakeNearby(true);
    } else {
      setLakeNearby(false);
    }
    setMainWhere("lakes");
    setLocation("Lakes Nearby");
    setSearchItem("Lake Nearby");
  }

  function locationCheck() {
    if (location === "") {
      setLocation("anywhere");
    }
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
                <div>{emojiWhereList.fire}</div>
                <div className="bottomUnderline" onClick={allowFires}>
                  <div>Fires Allowed</div>
                </div>
              </div>
              <div className="whereToList">
                <div>{emojiWhereList.lake}</div>
                <div className="bottomUnderline" onClick={decideLake}>
                  <div>Lake Nearby</div>
                </div>
              </div>
              <div className="whereToList">
                <div>{emojiWhereList.lodging}</div>
                <div className="bottomUnderline" onClick={decideLoding}>
                  <div>Lodging</div>
                </div>
              </div>
              <div className="exitPopUp" onClick={hideWhereTo}>
                X
              </div>
            </div>
          </div>

          <div className="inputContainer sideFlex" id="datesDiv">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Check-In"
                value={checkInDate}
                onChange={(newDate) => {
                  setCheckInDate(newDate);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Check-Out"
                value={checkOutDate}
                onChange={(newDate) => setCheckOutDate(newDate)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
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
          {location === "" ? (
            <Link
              to={`/siteList/anywhere/${guestNum}/${petAllowed}/${firesAllowed}/${lakeNearby}/${lodgingState}/${mainWhere}`}
            >
              <button id="circleSearchBtn" onClick={locationCheck}>
                Search
              </button>
            </Link>
          ) : (
            <Link
              to={`/siteList/${location}/${guestNum}/${petAllowed}/${firesAllowed}/${lakeNearby}/${lodgingState}/${mainWhere}`}
            >
              <button id="circleSearchBtn" onClick={locationCheck}>
                Search
              </button>
            </Link>
          )}
        </div>
      </div>
      <img src={mtnCamp} alt="" className="eightyWidth" />
    </div>
  );
};

export default Where;

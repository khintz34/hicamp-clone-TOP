import React, { useState } from "react";
import "../../styles/Where.css";
import mtnCamp from "../../images/mtn-camping.jpeg";
import { Link } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import { emojiWhereList } from "../../assets/EmojiLists";
import { useDateStore } from "../../stores/dateStore";
import { useSearchStore } from "../../stores/searchStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";

const WhereMobile = (props) => {
  const changeSearch = useSearchStore((state) => state.changeSearch);
  const [guestNum, setGuestNum] = useState(0);
  const [petAllowed, setPetAllowed] = useState("null");
  const [firesAllowed, setFiresAllowed] = useState("null");
  const [lakeNearby, setLakeNearby] = useState("null");
  const [lodgingState, setLodgingState] = useState("null");
  const [location, setLocation] = useState("");
  const [mainWhere, setMainWhere] = useState("null");

  const checkInDate = useDateStore((state) => state.checkInDate);
  const checkOutDate = useDateStore((state) => state.checkOutDate);
  const changeInDate = useDateStore((state) => state.changeInDate);
  const changeOutDate = useDateStore((state) => state.changeOutDate);

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
    changeSearch("Fires Allowed");
  }

  function decideLoding() {
    if (lodgingState === false || lodgingState === undefined) {
      setLodgingState(true);
    } else {
      setLodgingState(false);
    }
    setMainWhere("lodging");
    setLocation("Lodging");
    changeSearch("Lodging");
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
    changeSearch("Lake Nearby");
  }

  function locationCheck() {
    if (location === "") {
      setLocation("anywhere");
    }
  }
  return (
    <div id="whereDivMobile">
      <div id="searchContainer">
        <div id="searchDivMobile">
          <div className="inputContainerMobile">
            <label className="wMobileHeader">WHERE ARE YOU HEADED?</label>
            <input
              type="text"
              className="inputFieldMobile"
              placeholder="Yosemite National Park?? Minnesota??"
              onClick={showWhereTo}
              value={location}
              onChange={(e) => {
                setLocation(e.target.value.toString().toLowerCase());
              }}
            />
          </div>
          <h2 className="wMobileHeader">WHEN IS YOUR TRIP?</h2>
          <div className="inputContainerMobile" id="datesDivMobile">
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              className="datePickMobile"
            >
              <DatePicker
                label="Check-In Date"
                value={checkInDate}
                onChange={(newDate) => {
                  changeInDate(newDate);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              className="datePickMobile"
            >
              <DatePicker
                label="Check-Out Date"
                value={checkOutDate}
                onChange={(newDate) => changeOutDate(newDate)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="inputContainerMobile" id="guestsDiv">
            <label className="wMobileHeader">HOW MANY IN YOUR PARTY?</label>

            <div id="guestsPopUpMobile">
              <div className="guestListMobile">
                <div className="addSubMobile">
                  <button className="circleBtnMobile" onClick={subGuests}>
                    -
                  </button>
                  <input
                    type="num"
                    className="inputField guestInput"
                    placeholder="Add Guests"
                    value={guestNum}
                    onChange={(e) => {
                      setGuestNum(e.target.value);
                    }}
                  />
                  <button className="circleBtnMobile" onClick={addGuests}>
                    +
                  </button>
                </div>
              </div>
              <div
                className="guestListMobile petMobile"
                style={{ border: "none" }}
              >
                <div className="stack">
                  <div className="mobileFont">Any pets?</div>
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
            </div>
          </div>
          {location === "" ? (
            <Link
              to={`/siteList/anywhere/${guestNum}/${petAllowed}/${firesAllowed}/${lakeNearby}/${lodgingState}/${mainWhere}`}
            >
              <button id="circleSearchBtnMobile" onClick={locationCheck}>
                SEARCH AVAILABLE SITES
              </button>
            </Link>
          ) : (
            <Link
              to={`/siteList/${location}/${guestNum}/${petAllowed}/${firesAllowed}/${lakeNearby}/${lodgingState}/${mainWhere}`}
            >
              <button id="circleSearchBtnMobile" onClick={locationCheck}>
                SEARCH AVAILABLE SITES
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhereMobile;

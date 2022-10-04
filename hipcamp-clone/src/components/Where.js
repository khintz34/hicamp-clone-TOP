import React from "react";
import "../styles/Where.css";
import mtnCamp from "../images/mtn-camping.jpeg";
import { Link } from "react-router-dom";

const Where = () => {
  function showWhereTo() {
    const popUp = document.querySelector("#whereToPopUp");
    popUp.classList.remove("hide");
  }

  function showGuests() {
    const popUp = document.querySelector("#guestsPopUp");
    popUp.classList.remove("hide");
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
              placeholder="Try Yosemite, Napa, Moab..."
              onClick={showWhereTo}
            />
            <div id="whereToPopUp" className="hide">
              <div className="whereToList">
                <div>X</div>
                <div className="bottomUnderline">
                  <div>Current Location</div>
                </div>
              </div>
              <div className="whereToList">
                <div>X</div>
                <div className="bottomUnderline">
                  <div>Fires Allowed</div>
                </div>
              </div>
              <div className="whereToList">
                <div>X</div>
                <div className="bottomUnderline">
                  <div>Lake Nearby</div>
                </div>
              </div>
              <div className="whereToList">
                <div>X</div>
                <div className="bottomUnderline">
                  <div>Glamping</div>
                </div>
              </div>
              <div className="whereToList">
                <div>X</div>
                <div className="bottomUnderline" style={{ border: "none" }}>
                  <div>Pet Friendly</div>
                </div>
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
            />
            <div id="guestsPopUp" className="hide">
              <div className="guestList">
                <div className="stack">
                  <div>ADULTS</div>
                  <div>Ages 13 or above</div>
                </div>
                <div className="addSub">
                  <button className="circleBtn">-</button>
                  <div>Number</div>
                  <button className="circleBtn">+</button>
                </div>
              </div>
              <div className="guestList">
                <div className="stack">
                  <div>CHILDREN</div>
                  <div>Ages 12 or below</div>
                </div>
                <div className="addSub">
                  <button className="circleBtn">-</button>
                  <div>Number</div>
                  <button className="circleBtn">+</button>
                </div>
              </div>
              <div className="guestList" style={{ border: "none" }}>
                <div className="stack">
                  <div>Any pets?</div>
                </div>
                <div className="addSub">
                  <button className="circleBtn">-</button>
                  <div>Number</div>
                  <button className="circleBtn">+</button>
                </div>
              </div>
            </div>
          </div>

          <button id="circleSearchBtn">
            <Link to="/sites">Search</Link>
          </button>
        </div>
      </div>
      <img src={mtnCamp} alt="" className="eightyWidth" />
    </div>
  );
};

export default Where;

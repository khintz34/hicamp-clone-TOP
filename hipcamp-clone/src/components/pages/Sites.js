import React, { useContext, useEffect, useState } from "react";
import "../../styles/Sites.css";
import Header from "./Header";
import { CurrentSiteContext } from "../../contexts/CurrentSiteContext";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import { CheckInContext } from "../../contexts/CheckInContext";
import { CheckOutContext } from "../../contexts/CheckOutContext";
import {
  EmojiTypeList,
  emojiFeatList,
  emojiActList,
} from "../../assets/EmojiLists";

const Sites = (props) => {
  const { currentSite, setCurrentSite } = useContext(CurrentSiteContext);
  const { currentAuth, setCurrentAuth } = useContext(AuthContext);
  const [urlState, setURLState] = useState("");
  const storage = getStorage();
  const specRef = ref(storage, currentSite.url);
  const [petStatus, setPetStatus] = useState();
  const [subClass, setSubClass] = useState("disableBtn");
  const [disabledBtn, setDisabledBtn] = useState(true);
  const { checkOutDate, setCheckOutDate } = useContext(CheckOutContext);
  const { checkInDate, setCheckInDate } = useContext(CheckInContext);

  useEffect(() => {
    if (currentSite.pets) {
      setPetStatus("Yes");
    } else {
      setPetStatus("No");
    }

    const fetchData = async () => {
      const result = await getDownloadURL(specRef);
      setURLState(result);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (currentAuth) {
      setSubClass("ableBtn");
      setDisabledBtn(false);
    } else {
      setSubClass("disableBtn");
      setDisabledBtn(true);
    }
  }, [currentAuth]);

  return (
    <div className="sitesContainer">
      <Header />
      <div id="sitesMainHolder">
        <div id="sitesMain">
          <div id="sitesHeader">
            <div id="locations">
              <div id="locationCountry">USA</div>
              <div>&gt;</div>
              <div id="locationState">{currentSite.state}</div>
            </div>
            <div>
              <div id="siteName">{currentSite.name}</div>
              <div id="bookBtnContainer">
                {!currentAuth ? (
                  <div className="signInToBook">Sign in to be able to book</div>
                ) : (
                  <div style={{ display: "none" }}></div>
                )}
                <Link to="/booking" className="noUnderline">
                  <button
                    id="bookBtn"
                    className={subClass}
                    disabled={disabledBtn}
                  >
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
            <div id="siteReviews">
              <div id="siteRating">{currentSite.rating}% Rating</div>
              <div>&gt;</div>
              <div id="ratingNumber">{currentSite.reviewNum} Reviews</div>
            </div>
          </div>
          <div id="siteInfoMain">
            <div id="siteImageHolder" className="siteImageDiv">
              <img src={urlState} alt="" className="siteImg" />
            </div>
            <div id="siteInfoHolder">
              <h2>Site Info</h2>
              <div id="siteInfo">{currentSite.info} </div>
            </div>
          </div>
          <div id="additionalSpecs">
            <div id="siteSpecs" className="specDivSmall">
              <h2>Site Specs</h2>
              <div>Capactity: {currentSite.guests}</div>
              <div>Acres: {currentSite.acres}</div>
              <div className="typeMap">
                Type:
                {currentSite.type.map((value, key) => {
                  if (key !== currentSite.type.length - 1) {
                    return (
                      <div
                        style={{ marginLeft: "3px" }}
                        key={`${currentSite.name}-site-${value}`}
                      >
                        {EmojiTypeList[value]}
                        {value}
                        {","}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        style={{ marginLeft: "3px" }}
                        key={`${currentSite.name}-site-${value}`}
                      >
                        {EmojiTypeList[value]}
                        {value}
                      </div>
                    );
                  }
                })}
              </div>
              <div>Pets Allowed: {petStatus}</div>
            </div>
            <div id="activitySpecs" className="specDivSmall">
              <h2>Activities</h2>
              {currentSite.activities.map((value, key) => {
                return (
                  <div
                    style={{ marginLeft: "3px" }}
                    key={`${value}-activity-${currentSite.name}`}
                  >
                    {emojiActList[value]}
                    {value}
                  </div>
                );
              })}
            </div>
            <div id="featureSpecs" className="specDivSmall">
              <h2>Natural Features</h2>
              {currentSite.features.map((value, key) => {
                return (
                  <div
                    style={{ marginLeft: "3px" }}
                    key={`${value}-feature-${currentSite.name}`}
                  >
                    {emojiFeatList[value]}
                    {value}
                  </div>
                );
              })}
            </div>
          </div>
          <div id="availableSites">
            <div className="specDiv datePickHolder">
              <h2>Select Dates</h2>

              <div
                className=" inputContainer sideFlex calContain"
                id="datesDiv"
              >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sites;

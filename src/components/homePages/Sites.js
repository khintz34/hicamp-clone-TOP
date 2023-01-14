import React, { useContext, useEffect, useState } from "react";
import "../../styles/Sites.css";
import Header from "./Header";
import { CurrentSiteContext } from "../../contexts/CurrentSiteContext";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Link, useParams } from "react-router-dom";
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
import { db } from "../../utils/firebase";
import { onValue, ref as databaseRef } from "firebase/database";
import { useDateStore } from "../../stores/dateStore";

const Sites = (props) => {
  const { currentSite, setCurrentSite } = useContext(CurrentSiteContext);
  const { currentAuth, setCurrentAuth } = useContext(AuthContext);
  const [urlState, setURLState] = useState("");
  const storage = getStorage();
  const specRef = ref(storage, currentSite.url);
  const [petStatus, setPetStatus] = useState();
  const [subClass, setSubClass] = useState("disableBtn");
  const [disabledBtn, setDisabledBtn] = useState(true);
  const { nameParam } = useParams();
  const checkInDate = useDateStore((state) => state.checkInDate);
  const checkOutDate = useDateStore((state) => state.checkOutDate);
  const changeInDate = useDateStore((state) => state.changeInDate);
  const changeOutDate = useDateStore((state) => state.changeOutDate);

  const [siteFlag, setSiteFlag] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDownloadURL(specRef);
      setURLState(result);
    };
    if (siteFlag) {
      fetchData();
      if (currentSite.pets) {
        setPetStatus("Yes");
      } else {
        setPetStatus("No");
      }
    }
  }, [siteFlag]);

  useEffect(() => {
    if (currentAuth) {
      setSubClass("ableBtn");
      setDisabledBtn(false);
    } else {
      setSubClass("disableBtn");
      setDisabledBtn(true);
    }
  }, [currentAuth]);

  async function getUserData() {
    const boardRef = databaseRef(db, "SiteList/");
    let displayArray = [];
    await onValue(
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
          if (obj.name === nameParam) {
            setCurrentSite(obj);
            setSiteFlag(true);
          }
        });
      },
      {
        onlyOnce: false,
      }
    );
  }

  return (
    <div className="sitesContainer">
      <Header />
      <div id="sitesMainHolder">
        {currentSite.length === 0 ? (
          <div className="siteNotFound">
            <h1>Site Not Found</h1>
          </div>
        ) : (
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
                    <div className="signInToBook">
                      Sign in to be able to book
                    </div>
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
                <h2 className="infoTitle">Site Info</h2>
                <div id="siteInfo">{currentSite.info} </div>
              </div>
            </div>
            <div id="additionalSpecs">
              <div id="siteSpecs" className="specDivSmall">
                <div className="specTitle">Site Specs</div>
                <div className="sitesColumns">
                  Capactity: {currentSite.guests}
                </div>
                <div className="sitesColumns">Acres: {currentSite.acres}</div>
                <div className="typeMap sitesColumns">
                  Type:
                  {currentSite.length === 0 ? (
                    <div>loading</div>
                  ) : (
                    currentSite.type.map((value, key) => {
                      if (key !== currentSite.type.length - 1) {
                        return (
                          <div
                            style={{ marginLeft: "3px" }}
                            key={`${currentSite.name}-site-${value}`}
                            className="sitesColumns"
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
                    })
                  )}
                </div>
                <div className="sitesColumns">Pets Allowed: {petStatus}</div>
              </div>
              <div id="activitySpecs" className="specDivSmall">
                <div className="specTitle">Activities</div>
                {currentSite.length === 0 ? (
                  <div>loading</div>
                ) : (
                  currentSite.activities.map((value, key) => {
                    return (
                      <div
                        style={{ marginLeft: "3px" }}
                        key={`${value}-activity-${currentSite.name}`}
                        className="sitesColumns"
                      >
                        <span style={{ marginRight: "10px" }}>
                          {emojiActList[value]}
                        </span>
                        {value}
                      </div>
                    );
                  })
                )}
              </div>
              <div id="featureSpecs" className="specDivSmall">
                <div className="specTitle">Natural Features</div>
                {currentSite.length === 0 ? (
                  <div>loading</div>
                ) : (
                  currentSite.features.map((value, key) => {
                    return (
                      <div
                        style={{ marginLeft: "3px" }}
                        key={`${value}-feature-${currentSite.name}`}
                        className="sitesColumns"
                      >
                        <span style={{ marginRight: "10px" }}>
                          {emojiFeatList[value]}
                        </span>
                        {value}
                      </div>
                    );
                  })
                )}
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
                        changeInDate(newDate);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Check-Out"
                      value={checkOutDate}
                      onChange={(newDate) => changeOutDate(newDate)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sites;

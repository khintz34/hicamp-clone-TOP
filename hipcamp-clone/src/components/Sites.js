import React, { useContext, useEffect, useState } from "react";
import "../styles/Sites.css";
import Header from "./Header";
import hillside from "../images/hillside.jpeg";
import { CurrentSiteContext } from "../contexts/CurrentSiteContext";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { current } from "@reduxjs/toolkit";

const Sites = (props) => {
  const { currentSite, setCurrentSite } = useContext(CurrentSiteContext);
  const [urlState, setURLState] = useState("");
  const storage = getStorage();
  const storageRef = ref(storage);
  const specRef = ref(storage, currentSite.url);
  const [petStatus, setPetStatus] = useState();

  useEffect(() => {
    if (currentSite.pets === "true") {
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
            <div id="siteName">{currentSite.name}</div>
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
                      <div style={{ marginLeft: "3px" }} key={value.id}>
                        {value}
                        {","}
                      </div>
                    );
                  } else {
                    return (
                      <div style={{ marginLeft: "3px" }} key={value.id}>
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
                  <div style={{ marginLeft: "3px" }} key={value.id}>
                    {value}
                  </div>
                );
              })}
            </div>
            <div id="featureSpecs" className="specDivSmall">
              <h2>Natural Features</h2>
              {currentSite.features.map((value, key) => {
                return (
                  <div style={{ marginLeft: "3px" }} key={value.id}>
                    {value}
                  </div>
                );
              })}
            </div>
          </div>
          <div id="availableSites" className="specDiv">
            <h2>Available Dates</h2>
            <div>Enter Calendar Here</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sites;

import React, { useContext, useEffect, useState } from "react";
import { SiteContext } from "../../contexts/SiteContext";
import "../../styles/HalfDiv.css";
import { useSearchParams } from "react-router-dom";

const HalfDiv = (props) => {
  const { currentSiteList, setCurrentSiteList } = useContext(SiteContext);
  const FullList = props.list;

  function createList() {
    let item;
    if (props.title === "Cozy Fall Stays") {
      item = "Minnesota";
    } else {
      item = "Montana";
    }

    let newArray = [];

    FullList.map((value, key) => {
      if (value.state === item) {
        newArray.push(value);
      }
    });
    setCurrentSiteList(newArray);
  }

  return (
    <div
      className="halfDivContainer"
      onClick={() => {
        createList();
      }}
    >
      <img src={props.image} alt="" className="halfImage" />
      <div className="halfDivBottom" style={props.style}>
        <div className="halfDivWriting">
          <h3 className="titleH2">{props.title}</h3>
        </div>
        <div className="halfButtonContainer">
          <button className="halfBtn" style={props.font}>
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HalfDiv;

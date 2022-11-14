import React, { useContext } from "react";
import { SiteContext } from "../contexts/SiteContext";
import "../styles/VerticalDiv.css";

const VerticalDiv = (props) => {
  const { currentSiteList, setCurrentSiteList } = useContext(SiteContext);
  const FullList = props.list;

  function getNewList(special) {
    let newArray = [];
    FullList.map((value, key) => {
      if (value.special === special) {
        newArray.push(value);
      }
    });
    setCurrentSiteList(newArray);
  }

  return (
    <div
      className="vertDivContainer"
      onClick={() => {
        getNewList(props.special);
      }}
    >
      <img src={props.image} alt="" className="vertImage" />
      <div className="vertDivBottom" style={props.style}>
        <div className="vertDivWriting">
          <div style={{ fontSize: "28px" }}>{props.title}</div>
          <div style={{ fontSize: "20px" }}>{props.comment}</div>
        </div>
      </div>
    </div>
  );
};

export default VerticalDiv;

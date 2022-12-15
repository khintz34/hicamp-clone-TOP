import React, { useContext } from "react";
import { SiteContext } from "../../contexts/SiteContext";
import "../../styles/SquareDiv.css";

const SquareDiv = (props) => {
  const FullList = props.list;
  const { currentSiteList, setCurrentSiteList } = useContext(SiteContext);

  function getNewList(item) {
    let newArray = [];

    FullList.map((value, key) => {
      if (item === "pets") {
        if (value.pets === true) {
          newArray.push(value);
        }
      } else if (item === "fires") {
        if (value.fires === true) {
          newArray.push(value);
        }
      } else if (item === "lake") {
        if (value.lake === true) {
          newArray.push(value);
        }
      } else if (item === "Tent" || item === "RV" || item === "Lodging") {
        value.type.map((value2, key2) => {
          if (value2 === item) newArray.push(value);
        });
      }
    });
    setCurrentSiteList(newArray);
  }
  return (
    <div
      className="squareDivContainer"
      onClick={() => {
        getNewList(props.item);
      }}
    >
      <img src={props.image} alt="" className="squareImage" />
      <div className="squareDivBottom">
        <div className="squareButtonContainer">
          <button className="squareBtn" style={props.style}>
            {props.title}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SquareDiv;

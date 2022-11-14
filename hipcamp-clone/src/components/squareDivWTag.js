import React, { useContext } from "react";
import { SiteContext } from "../contexts/SiteContext";
import "../styles/SquareDiv.css";

const SquareDivWTag = (props) => {
  const FullList = props.list;
  const { currentSiteList, setCurrentSiteList } = useContext(SiteContext);

  function getNewList(park) {
    let newArray = [];

    FullList.map((value, key) => {
      if (value.park === park) {
        newArray.push(value);
      }
    });

    setCurrentSiteList(newArray);
  }

  return (
    <div
      className="squareDivWTagContainer"
      onClick={() => {
        getNewList(props.park);
      }}
    >
      <img
        src={props.image}
        alt={props.title}
        className="squareImage hoverMove"
      />
      <div className="squareDivWriting">
        <div className="squareDivTitle">{props.title}</div>
        <div className="squareDivComment">{props.comment}</div>
      </div>
    </div>
  );
};

export default SquareDivWTag;

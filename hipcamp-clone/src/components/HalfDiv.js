import React from "react";
import "../styles/HalfDiv.css";

const HalfDiv = (props) => {
  return (
    <div className="halfDivContainer">
      <img src={props.image} alt="" className="halfImage" />
      <div className="halfDivBottom" style={props.style}>
        <div className="halfDivWriting">
          <div style={{ fontSize: "large" }}>{props.title}</div>
          <div style={{ fontSize: "22px" }}>{props.comment}</div>
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

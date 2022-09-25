import React from "react";
import "../styles/FullDiv.css";

const FullDiv = (props) => {
  return (
    <div className="fullDivContainer">
      <img src={props.image} alt="" className="fullImage" />
      <div className="fullDivBottom" style={props.style}>
        <div className="fullDivWriting">
          <div style={{ fontSize: "28px" }}>{props.title}</div>
          <div style={{ fontSize: "20px" }}>{props.comment}</div>
        </div>
        <div className="fullButtonContainer">
          <button className="fullBtn" style={props.font}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullDiv;

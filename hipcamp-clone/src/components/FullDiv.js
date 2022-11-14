import React from "react";
import { Link } from "react-router-dom";
import "../styles/FullDiv.css";

const FullDiv = (props) => {
  return (
    <div className="fullDivContainer">
      <img src={props.image} alt="" className="fullImage" />
      <div className="fullDivBottom" style={props.style}>
        <div className="fullDivWriting">
          <div style={{ fontSize: "2em" }}>{props.title}</div>
          <div style={{ fontSize: "1.2em" }}>{props.comment}</div>
        </div>
        <div className="fullButtonContainer">
          <Link to="/owners">
            <button className="fullBtn" style={props.font}>
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FullDiv;

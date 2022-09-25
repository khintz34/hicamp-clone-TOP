import React from "react";
import "../styles/VerticalDiv.css";

const VerticalDiv = (props) => {
  return (
    <div className="vertDivContainer">
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

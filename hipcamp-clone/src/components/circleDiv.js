import React from "react";
import "../styles/CircleDiv.css";

const CircleDiv = (props) => {
  return (
    <div className="circleDivContainer">
      <img
        src={props.image}
        alt=""
        className="circleImage"
        style={props.border}
      />
      <div className="circleDivBottom">
        <div className="circleDivWriting">
          <div style={{ fontSize: "28px" }}>{props.title}</div>
          <div style={{ fontSize: "20px" }}>{props.comment}</div>
        </div>
      </div>
    </div>
  );
};

export default CircleDiv;

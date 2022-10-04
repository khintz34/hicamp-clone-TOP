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
          <div className="circleDivTitle">{props.title}</div>
          <div className="circleDivComment">{props.comment}</div>
        </div>
      </div>
    </div>
  );
};

export default CircleDiv;

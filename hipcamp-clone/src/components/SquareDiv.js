import React from "react";
import "../styles/SquareDiv.css";

const SquareDiv = (props) => {
  return (
    <div className="squareDivContainer">
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

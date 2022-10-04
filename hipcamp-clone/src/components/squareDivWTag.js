import React from "react";
import "../styles/SquareDiv.css";

const SquareDivWTag = (props) => {
  return (
    <div className="squareDivWTagContainer">
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

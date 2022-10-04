import React from "react";
import "../styles/SafetyDiv.css";

const SafetyDiv = (props) => {
  return (
    <div className="safetyDivContainer">
      <img
        src={props.image}
        alt=""
        className="safetyImage"
        style={props.stretch}
      />
      <div className="safetyDivBottom">
        <div className="safetyDivWriting">
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>
            {props.title}
          </div>
          <ol style={props.type} className="safetyOL">
            <li style={props.show}>{props.li1}</li>
            <li style={props.show}>{props.li2}</li>
            <li style={props.show}>{props.li3}</li>
            <li style={props.show}>{props.li4}</li>
            <li style={props.show}>{props.li5}</li>
            <li style={props.show}>{props.li6}</li>
            <li style={props.show}>{props.li7}</li>
          </ol>
          <div className="safetyCommentDiv" style={props.hide}>
            {props.comment}
          </div>
        </div>
      </div>
      <div className="safetyBtnContainer">
        <button className="safetyBtn">Learn More</button>
      </div>
    </div>
  );
};

export default SafetyDiv;

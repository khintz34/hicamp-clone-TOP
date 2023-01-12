import React from "react";
import "../../styles/Footer.css";

const LinkList = (props) => {
  return (
    <div className="linkListContainer">
      <div className="LinkTitleContainer">
        <div className="linkTitle">{props.title}</div>
      </div>
      <div className="linkNameContainer">
        <div className="linkName">{props.link1}</div>
        <div className="linkName">{props.link2}</div>
        <div className="linkName">{props.link3}</div>
        <div className="linkName">{props.link4}</div>
        <div className="linkName">{props.link5}</div>
      </div>
    </div>
  );
};

export default LinkList;

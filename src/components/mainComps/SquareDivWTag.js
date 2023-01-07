import React from "react";
import { Link } from "react-router-dom";
import bryceCanyon from "../../images/bryceCanyon.webp";
import joshuaTree from "../../images/joshuaTree.webp";
import shenandoah from "../../images/shenandoah.jpeg";
import smoky from "../../images/smoky.jpeg";
import yellowStone from "../../images/yellowStone.jpeg";
import yosemite from "../../images/yosemite.jpeg";

import "../../styles/SquareDiv.css";

const SquareDivWTag = (props) => {
  const holdingArray = [
    {
      to: "/siteList/bryce%20canyon/0/null/null/null/null/location",
      image: bryceCanyon,
      title: "Bryce Canyon",
      comment: "Utah",
      park: "Bryce Canyon National Park",
    },
    {
      to: "/siteList/joshua%20tree/0/null/null/null/null/location",
      image: joshuaTree,
      title: "Joshua Tree",
      comment: "California",
      park: "Joshua Tree National Park",
    },
    {
      to: "/siteList/shenandoah/0/null/null/null/null/location",
      image: shenandoah,
      title: "Shenandoah",
      comment: "Virginia",
      park: "Shenandoah National Park",
    },
    {
      to: "/siteList/great%20smoky/0/null/null/null/null/location",
      image: smoky,
      title: "Great Smoky Mountains",
      comment: "Tennessee",
      park: "Great Smoky Mountains National Park",
    },
    {
      to: "/siteList/yellowstone/0/null/null/null/null/location",
      image: yellowStone,
      title: "Yellowstone",
      comment: "Wyoming",
      park: "Yellowstone National Park",
    },
    {
      to: "/siteList/yosemite/0/null/null/null/null/location",
      image: yosemite,
      title: "Yosemite",
      comment: "California",
      park: "Yosemite National Park",
    },
  ];
  return (
    <div id="placesToGoMainDiv" className="squareDivsContainer">
      {holdingArray.map((value) => {
        return (
          <Link to={value.to} className="noUnderline">
            <div className="squareDivWTagContainer">
              <img
                src={value.image}
                alt={props.value}
                className="squareImage hoverMove"
              />
              <div className="squareDivWriting">
                <div className="squareDivTitle">{value.title}</div>
                <div className="squareDivComment">{value.comment}</div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SquareDivWTag;

import React, { useContext } from "react";
import { SiteContext } from "../../contexts/SiteContext";
import "../../styles/HalfDiv.css";
import fallCozy from "../../images/fall-cozy.jpeg";
import outdoorStairs from "../../images/outdoor-stairs.jpeg";
import { Link } from "react-router-dom";

const HalfDivPart = (props) => {
  const orangeColor = {
    backgroundColor: "var(--orange-color)",
  };
  const orangeFont = {
    color: "var(--orange-color)",
  };
  const greenColor = {
    backgroundColor: "var(--camo)",
  };
  const greenFont = {
    color: "var(--camo)",
  };

  const halfDivArray = [
    {
      to: "/siteList/minnesota/0/null/null/null/null/location",
      image: fallCozy,
      title: "Cozy Fall Stays",
      comment: "Find yourself in MN at a cozy Hipcamp this autumn.",
      style: orangeColor,
      font: orangeFont,
    },
    {
      to: "/siteList/montana/0/null/null/null/null/location",
      image: outdoorStairs,
      title: "Explore MT this weekend",
      comment: "Pitch your tent, roll up in your can or find a glamping stay.",
      style: greenColor,
      font: greenFont,
    },
  ];

  return (
    <div className="sideBySide">
      {halfDivArray.map((value) => {
        return (
          <Link to={value.to} key={`${value.title}`}>
            <div className="halfDivContainer">
              <img src={value.image} alt="" className="halfImage" />
              <div className="halfDivBottom" style={value.style}>
                <div className="halfDivWriting">
                  <h3 className="titleH2">{value.title}</h3>
                </div>
                <div className="halfButtonContainer">
                  <button className="halfBtn" style={value.font}>
                    Book now
                  </button>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default HalfDivPart;

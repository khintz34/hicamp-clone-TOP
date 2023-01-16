import React from "react";
import "../../styles/SquareDiv.css";
import stringLights from "../../images/stringLights.jpeg";
import pool from "../../images/pool.jpeg";
import car from "../../images/car.jpeg";
import redTent from "../../images/redTent.jpeg";
import rv from "../../images/rv.jpeg";
import glamping from "../../images/glamping.jpeg";
import { Link } from "react-router-dom";

const SquareDiv = (props) => {
  const greenColor = {
    backgroundColor: "var(--camo)",
  };
  const poolColor = {
    backgroundColor: "var(--pool)",
  };
  const orangeColor = {
    backgroundColor: "var(--orange-color)",
  };
  const tentColor = {
    backgroundColor: "var(--tent)",
  };
  const butterflyColor = {
    backgroundColor: "var(--butterfly)",
  };
  const cabinColor = {
    backgroundColor: "var(--cabin)",
  };

  const squareDivArray = [
    {
      to: "/siteList/anywhere/0/true/null/null/null/location",
      image: stringLights,
      title: "Pet friendly",
      style: greenColor,
      item: "pets",
    },
    {
      to: "/siteList/anywhere/0/null/null/true/null/location",
      image: pool,
      title: "Lake access",
      style: poolColor,
      item: "lake",
    },
    {
      to: "/siteList/anywhere/0/null/true/null/null/location",
      image: redTent,
      title: "Camp fires",
      style: orangeColor,
      item: "fires",
    },
    {
      to: "/siteList/Tent/0/null/true/null/null/lodging",
      image: car,
      title: "Tent camping",
      style: tentColor,
      item: "Tent",
    },
    {
      to: "/siteList/Lodging/0/null/true/null/null/lodging",
      image: glamping,
      title: "Lodging",
      style: butterflyColor,
      item: "Lodging",
    },
    {
      to: "/siteList/RV/0/null/true/null/null/lodging",
      image: rv,
      title: "RV sites",
      style: cabinColor,
      item: "RV",
    },
  ];

  return (
    <div className="squareDivsContainer">
      {squareDivArray.map((value, key) => {
        return (
          <Link
            to={value.to}
            className="noUnderline"
            key={`squareDiv-${value.item}-${key}`}
          >
            <div className="squareDivContainer">
              <img src={value.image} alt="" className="squareImage" />
              <div className="squareDivBottom">
                <div className="squareButtonContainer">
                  <button className="squareBtn" style={value.style}>
                    {value.title}
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

export default SquareDiv;

import React from "react";
import "../../styles/SafetyDiv.css";
import image1 from "../../images/canada-tent.jpeg";
import image2 from "../../images/canada-sheep.jpeg";
import image3 from "../../images/canada-au.jpeg";

const AboutVerticals = () => {
  const verticalDivArray = [
    {
      image: image1,
    },
    {
      image: image2,
    },
    {
      image: image3,
    },
  ];

  return (
    <div id="verticalDivsContainer">
      {verticalDivArray.map((value) => {
        return (
          <div className="vertDivContainer">
            <img src={value.image} alt="" className="vertImage" />
          </div>
        );
      })}
    </div>
  );
};

export default AboutVerticals;

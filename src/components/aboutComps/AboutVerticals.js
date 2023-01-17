import React from "react";
import "../../styles/SafetyDiv.css";
import image1 from "../../images/canada-tent.jpeg";
import image2 from "../../images/canada-sheep.jpeg";
import image3 from "../../images/canada-au.jpeg";

const AboutVerticals = () => {
  const verticalDivArray = [
    {
      image: image1,
      key: "image1",
    },
    {
      image: image2,
      key: "image2",
    },
    {
      image: image3,
      key: "image3",
    },
  ];

  return (
    <div id="aboutVerticalDivsContainer">
      {verticalDivArray.map((value) => {
        return (
          <div className="aboutVertDivContainer" key={`aboutVert-${value.key}`}>
            <img src={value.image} alt="" className="aboutVertImage" />
          </div>
        );
      })}
    </div>
  );
};

export default AboutVerticals;

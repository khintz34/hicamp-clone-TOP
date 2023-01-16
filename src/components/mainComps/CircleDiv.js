import React from "react";
import "../../styles/CircleDiv.css";
import circleBridge from "../../images/circleBridge.jpeg";
import circleLlama from "../../images/circleLlama.jpeg";
import circleBarrell from "../../images/circleBarrell.jpeg";

const CircleDiv = (props) => {
  const borderOne = {
    borderRadius: "150px 100px 170px 100px",
  };
  const borderTwo = {
    borderRadius: "200px 130px 140px 250px",
  };
  const borderThree = {
    borderRadius: "1000px 500px 190px 400px",
  };

  const circleDivArray = [
    {
      image: circleBridge,
      title: "Find unexpected places.",
      comment:
        "Easily book secluded outdoor tent sites, RV sites, and glamping stays on private lands -- from blueberry farms to lakeside yurts.",
      border: borderOne,
      key: "bridge",
    },
    {
      image: circleBarrell,
      title: "Discover unique experiences.",
      comment:
        "Relax in an outdoor sauna, explore hidden swimming holes, do yoga with the goats, and eat wood-fired pizza under the stars.",
      border: borderTwo,
      key: "barrell",
    },
    {
      image: circleLlama,
      title: "Protect our wild places.",
      comment:
        "By booking with Hipcamp, you're funding the protection of open spaces and supporting the people who support the land.",
      border: borderThree,
      key: "llama",
    },
  ];

  return (
    <div id="mainCircleDiv">
      <div className="lTHolder">
        <div className="largeText">
          Hipcamp is the simplest way to find yourself outside.
        </div>
      </div>
      <div id="circleDivsContainer">
        {circleDivArray.map((value, key) => {
          return (
            <div
              className="circleDivContainer"
              key={`circleDiv-${value.key}-${key}}`}
            >
              <img
                src={value.image}
                alt=""
                className="circleImage"
                style={value.border}
              />
              <div className="circleDivBottom">
                <div className="circleDivWriting">
                  <div className="circleDivTitle">{value.title}</div>
                  <div className="circleDivComment">{value.comment}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CircleDiv;

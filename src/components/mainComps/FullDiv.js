import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/FullDiv.css";
import hillside from "../../images/hillside.jpeg";

const FullDiv = (props) => {
  const [windowWidth, setWindowWidth] = useState("block");
  useEffect(() => {
    decideWidth();
  }, []);

  useEffect(() => {
    function handleResize() {
      decideWidth();
    }

    window.addEventListener("resize", handleResize);
  });

  function decideWidth() {
    if (window.innerWidth < 1300) {
      setWindowWidth("none");
    } else {
      setWindowWidth("block");
    }
  }

  const orange = {
    backgroundColor: "var(--orange-color)",
    color: "var(--orange-color)",
  };

  return (
    <div className="fullDivContainer">
      <img src={hillside} alt="" className="fullImage" />
      <div
        className="fullDivBottom"
        style={{ backgroundColor: orange.backgroundColor }}
      >
        <div className="fullDivWriting">
          <div style={{ fontSize: "2vw" }}>
            Own Land? Earn money from Hipcamp
          </div>
          <div style={{ fontSize: "1em", display: windowWidth }}>
            Host our community of good-natured campers, glampers, and RV
            travelers on your land or at your cabin.
          </div>
        </div>
        <div className="fullButtonContainer">
          <Link to="/owners">
            <button className="fullBtn" style={{ color: orange.color }}>
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FullDiv;

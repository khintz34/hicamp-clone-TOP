import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/FullDiv.css";

const FullDiv = (props) => {
  const [windowWidth, setWindowWidth] = useState("block");
  useEffect(() => {
    decideWidth();
  }, []);

  useEffect(() => {
    function handleResize() {
      console.log("resized to: ", window.innerWidth, "x", window.innerHeight);
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

  return (
    <div className="fullDivContainer">
      <img src={props.image} alt="" className="fullImage" />
      <div className="fullDivBottom" style={props.style}>
        <div className="fullDivWriting">
          <div style={{ fontSize: "1.8em" }}>{props.title}</div>
          <div style={{ fontSize: "1em", display: windowWidth }}>
            {props.comment}
          </div>
        </div>
        <div className="fullButtonContainer">
          <Link to="/owners">
            <button className="fullBtn" style={props.font}>
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FullDiv;

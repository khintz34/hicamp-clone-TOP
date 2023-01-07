import React from "react";
import "../../styles/SafetyDiv.css";
import recreate from "../../images/recreateResp.png";
import leaveNoTrace from "../../images/leaveNoTrace.png";
import nationalWeather from "../../images/national_weather.png";

const SafetyDiv = () => {
  const showNone = {
    display: "none",
  };
  const noStyle = {
    listStyleType: "none",
  };
  const stretchImage = {
    width: "20vh",
  };
  const safetyDivArray = [
    {
      image: recreate,
      title: "Recreate Responsibility",
      li1: "Know before you go",
      li2: "Practice physical distancing",
      li3: "Plan ahead",
      li4: "Explore locally",
      li5: "Play it safe",
      li6: "Leave no trace",
      li7: "Build an inclusive outdoors",
      url: "https://www.recreateresponsibly.org/",
    },
    {
      image: leaveNoTrace,
      title: "Leave No Trace",
      li1: "Plan ahead and prepare",
      li2: "Tavel and camp on durable surfaces",
      li3: "Dispose of waste properly",
      li4: "Leave what you find",
      li5: "Minimize fire impacts",
      li6: "Respect wildlife",
      li7: "Be considerate of others",
      stretch: stretchImage,
      url: "https://lnt.org/why/7-principles/",
    },
    {
      image: nationalWeather,
      title: "National Weather Service",
      comment:
        "We integrate with the National Weather Service to provice valuable fire advisories to Hosts and Hipcampers. Real-time Red Flag Warnings help keep our community safe.",
      show: showNone,
      type: noStyle,
      url: "https://www.weather.gov/",
    },
  ];

  function openURL(url) {
    window.open(url);
  }
  return (
    <div id="safetyDivHolder">
      <div id="safetyDivMain">
        {safetyDivArray.map((value) => {
          return (
            <div
              className="safetyDivContainer"
              onClick={() => {
                openURL(value.url);
              }}
            >
              <img
                src={value.image}
                alt=""
                className="safetyImage"
                style={value.stretch}
              />
              <div className="safetyDivBottom">
                <div className="safetyDivWriting">
                  <div style={{ fontSize: "2vw", fontWeight: "bold" }}>
                    {value.title}
                  </div>
                  <ol style={value.type} className="safetyOL">
                    <li style={value.show}>{value.li1}</li>
                    <li style={value.show}>{value.li2}</li>
                    <li style={value.show}>{value.li3}</li>
                    <li style={value.show}>{value.li4}</li>
                    <li style={value.show}>{value.li5}</li>
                    <li style={value.show}>{value.li6}</li>
                    <li style={value.show}>{value.li7}</li>
                  </ol>
                  <div className="safetyCommentDiv" style={value.hide}>
                    {value.comment}
                  </div>
                </div>
              </div>
              <div className="safetyBtnContainer">
                <button className="safetyBtn">Learn More</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SafetyDiv;

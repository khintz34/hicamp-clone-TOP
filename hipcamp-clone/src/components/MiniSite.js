import React, { useContext } from "react";
import "../styles/MiniSite.css";
import hillside from "../images/hillside.jpeg";
import { CurrentSiteContext } from "../contexts/CurrentSiteContext";

const MiniSite = (props) => {
  const { currentSite, setCurrentSite } = useContext(CurrentSiteContext);

  // todo onClick set props to currentSite.
  // todo in Sites.js use props to populate

  return (
    <div
      className="miniSiteContainer"
      onClick={() => setCurrentSite(props.fullSite)}
    >
      <div className="miniImgContainer">
        <img src={hillside} alt="" />
      </div>
      <div id="siteReviews">
        <div id="siteRating">{props.rating}% Rating</div>
        <div>·</div>
        <div id="ratingNumber">{props.reviewNum} Reviews</div>
      </div>
      <div id="siteNameMini">{props.name}</div>
      <div id="siteType">
        {props.type.map((value, key) => {
          if (key !== props.type.length - 1) {
            return (
              <div>
                {value}
                {","}
              </div>
            );
          } else {
            return value;
          }
        })}
      </div>
      <div className="miniDeetsSide">
        <div id="siteAcres">{props.acres} Acres · </div>
        <div id="siteDeets" className="miniDeetsSide">
          {props.city}, {props.state}
        </div>
      </div>
      <div>${props.price}/night</div>
    </div>
  );
};

export default MiniSite;

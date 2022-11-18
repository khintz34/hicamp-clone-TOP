import React, { useContext, useEffect, useState } from "react";
import "../styles/MiniSite.css";
import { CurrentSiteContext } from "../contexts/CurrentSiteContext";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const MiniSite = (props) => {
  //todo add each image to google storage
  //todo add URL key to each site
  //todo use url to download image
  const { currentSite, setCurrentSite } = useContext(CurrentSiteContext);
  const [urlState, setURLState] = useState("");
  // useEffect(() => {
  //   setURLState(props.url);
  // }, []);
  const newRef = props.url;
  console.log(newRef);
  const storage = getStorage();
  const storageRef = ref(storage);

  // ! update second parm with url
  const specRef = ref(storage, urlState);

  getDownloadURL(specRef).then((url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open("GET", url);
    xhr.send();
    setURLState(url);
  });

  return (
    <div
      className="miniSiteContainer"
      onClick={() => setCurrentSite(props.fullSite)}
    >
      <div className="miniImgContainer">
        <img src={urlState} alt="" />
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
              <div key={value}>
                {value}
                {","}
              </div>
            );
          } else {
            return <div key={value}>value</div>;
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

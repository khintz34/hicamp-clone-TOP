import React from "react";
import Header from "./Header";
import "../styles/Confirmation.css";
import bike from "../images/bike.jpeg";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

//todo figure out how to upload / download images.
// JS FILE API . BLOB API

const Confirmation = (props) => {
  const storage = getStorage();
  const storageRef = ref(storage);
  const specRef = ref(storage, "tts.webp");

  getDownloadURL(specRef).then((url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open("GET", url);
    xhr.send();
    const img = document.getElementById("myImg");
    img.setAttribute("src", url);
  });

  return (
    <div>
      <Header />
      <div id="confirmHolder">
        <h1 id="confirmMsg">
          Congrats on becoming a Hipcamp Host! We cant wait for campers to see
          your beautiful property!{" "}
        </h1>
        <img src={bike} alt="" id="myImg" />
      </div>
    </div>
  );
};

export default Confirmation;

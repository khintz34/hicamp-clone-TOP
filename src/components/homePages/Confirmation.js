import React from "react";
import Header from "./Header";
import "../../styles/Confirmation.css";
import bike from "../../images/bike.jpeg";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Footer from "./Footer";

const Confirmation = (props) => {
  const storage = getStorage();
  const storageRef = ref(storage);
  const specRef = ref(storage, "tts.webp");

  return (
    <div>
      <Header />
      <div id="confirmHolder">
        <h1 id="confirmMsg">
          Congrats on becoming a Hipcamp Host! We cant wait for campers to see
          your beautiful property!{" "}
        </h1>
      </div>
      <Footer />
    </div>
  );
};

export default Confirmation;

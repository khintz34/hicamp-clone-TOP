import "../src/styles/App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sites from "./components/Sites";
import SiteList from "./components/SiteList";
import { db } from "./utils/firebase.js";
import { ref, set, push, onValue } from "firebase/database";
import { type } from "@testing-library/user-event/dist/type";
import { useEffect, useState } from "react";
import { SiteContext } from "./contexts/SiteContext.js";
import { CurrentSiteContext } from "./contexts/CurrentSiteContext.js";
import InputLand from "./components/InputLand";
import Confirmation from "./components/Confirmation";

//todo compenent folder structure

function App() {
  const [currentSiteList, setCurrentSiteList] = useState([]);
  const [currentSite, setCurrentSite] = useState([]);

  function writeUserData(
    name,
    guests,
    acres,
    available,
    type,
    state,
    city,
    activities,
    features,
    park,
    special,
    pets,
    fires,
    lake,
    rating,
    reviewNum,
    price,
    info
  ) {
    const reference = ref(db, "SiteList/");

    const newItem = push(reference);

    set(newItem, {
      name: name,
      guests: guests,
      acres: acres,
      available: available,
      type: type,
      state: state,
      city: city,
      activities: activities,
      features: features,
      park: park,
      special: special,
      pets: pets,
      fires: fires,
      lake: lake,
      rating: rating,
      reviewNum: reviewNum,
      price: price,
      info: info,
    });
  }

  function writeAllData() {
    console.log("writing");
    writeUserData(
      "Hudson and Wendy's Land",
      6,
      5,
      true,
      ["Tent", "RV", "Lodging"],
      "California",
      "Oakhurst",
      [
        "Hiking",
        "Biking",
        "Horseback Riding",
        "Fishing",
        "Boating",
        "Wildlife watching",
      ],
      ["Forest", "Swimming hole", "River", "Waterfall"],
      "Yosemite National Park",
      false,
      false,
      true,
      false,
      99,
      89,
      72,
      "Welcome to Hidden Falls Yosemite Camp. We can't wait for you to stay with us and enjoy what the area has to offer."
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <SiteContext.Provider value={{ currentSiteList, setCurrentSiteList }}>
          <CurrentSiteContext.Provider value={{ currentSite, setCurrentSite }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sites" element={<Sites />} />
              <Route path="/siteList" element={<SiteList />} />
              <Route path="/owners" element={<InputLand />} />
              <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
          </CurrentSiteContext.Provider>
        </SiteContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;

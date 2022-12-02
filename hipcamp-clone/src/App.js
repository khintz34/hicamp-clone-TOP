import "../src/styles/App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sites from "./components/Sites";
import SiteList from "./components/SiteList";
import { useState } from "react";
import { SiteContext } from "./contexts/SiteContext.js";
import { CurrentSiteContext } from "./contexts/CurrentSiteContext.js";
import InputLand from "./components/InputLand";
import Confirmation from "./components/Confirmation";
import About from "./components/About";
import BookedSite from "./components/BookedSite";
import { SearchContext } from "./contexts/SearchContext";
import { PetContext } from "./contexts/PetContext";
import { AuthContext } from "./contexts/AuthContext";
import { CheckInContext } from "./contexts/CheckInContext";
import { CheckOutContext } from "./contexts/CheckOutContext";

//todo authentication on InputLand
//todo pass dates to other pages. Currently only in Where.js
//todo css for screen sizes
//todo compenent folder structure
//todo Link query parameters -> pass an id or some param for search terms

function App() {
  const [currentSiteList, setCurrentSiteList] = useState([]);
  const [currentSite, setCurrentSite] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [petSearch, setPetSearch] = useState("");
  // let targetDate = new Date();
  // targetDate.setDate(targetDate.getDate() + 5);
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [currentAuth, setCurrentAuth] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <SiteContext.Provider value={{ currentSiteList, setCurrentSiteList }}>
          <CurrentSiteContext.Provider value={{ currentSite, setCurrentSite }}>
            <SearchContext.Provider value={{ searchItem, setSearchItem }}>
              <PetContext.Provider value={{ petSearch, setPetSearch }}>
                <CheckInContext.Provider
                  value={{ checkInDate, setCheckInDate }}
                >
                  <CheckOutContext.Provider
                    value={{ checkOutDate, setCheckOutDate }}
                  >
                    <AuthContext.Provider
                      value={{ currentAuth, setCurrentAuth }}
                    >
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sites" element={<Sites />} />
                        <Route path="/siteList" element={<SiteList />} />
                        <Route path="/owners" element={<InputLand />} />
                        <Route
                          path="/confirmation"
                          element={<Confirmation />}
                        />
                        <Route path="/about" element={<About />} />
                        <Route path="/booking" element={<BookedSite />} />
                      </Routes>
                    </AuthContext.Provider>
                  </CheckOutContext.Provider>
                </CheckInContext.Provider>
              </PetContext.Provider>
            </SearchContext.Provider>
          </CurrentSiteContext.Provider>
        </SiteContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;

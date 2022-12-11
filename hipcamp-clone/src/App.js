import "../src/styles/App.css";
import Home from "./components/pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sites from "./components/pages/Sites";
import SiteList from "./components/pages/SiteList";
import { useState } from "react";
import { SiteContext } from "./contexts/SiteContext.js";
import { CurrentSiteContext } from "./contexts/CurrentSiteContext.js";
import InputLand from "./components/pages/InputLand";
import Confirmation from "./components/pages/Confirmation";
import About from "./components/pages/About";
import BookedSite from "./components/pages/BookedSite";
import { SearchContext } from "./contexts/SearchContext";
import { PetSearchContext } from "./contexts/PetSearchContext";
import { AuthContext } from "./contexts/AuthContext";
import { CheckInContext } from "./contexts/CheckInContext";
import { CheckOutContext } from "./contexts/CheckOutContext";

//todo finish url params
// todo css on sites lists
// todo css confirmation
//todo css booked
//todo css inoutLand

function App() {
  const [currentSiteList, setCurrentSiteList] = useState([]);
  const [currentSite, setCurrentSite] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [petSearch, setPetSearch] = useState("");
  let firstDate = new Date();
  let secondDate = firstDate.setDate(firstDate.getDate() + 5);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [currentAuth, setCurrentAuth] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <CheckInContext.Provider value={{ checkInDate, setCheckInDate }}>
          <SiteContext.Provider value={{ currentSiteList, setCurrentSiteList }}>
            <CurrentSiteContext.Provider
              value={{ currentSite, setCurrentSite }}
            >
              <SearchContext.Provider value={{ searchItem, setSearchItem }}>
                <PetSearchContext.Provider value={{ petSearch, setPetSearch }}>
                  <CheckOutContext.Provider
                    value={{ checkOutDate, setCheckOutDate }}
                  >
                    <AuthContext.Provider
                      value={{ currentAuth, setCurrentAuth }}
                    >
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sites" element={<Sites />} />
                        <Route
                          path="/siteList/:locationParam/:guestParam/:petParam/:fireParam/:lakeParam/:lodgingParam/:whereParam"
                          element={<SiteList />}
                        />
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
                </PetSearchContext.Provider>
              </SearchContext.Provider>
            </CurrentSiteContext.Provider>
          </SiteContext.Provider>
        </CheckInContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;

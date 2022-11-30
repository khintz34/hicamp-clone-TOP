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
import { PetContext } from "./contexts/PetContext copy";

//todo siteList.js todos
//todo calendar function 00 MUI datepicker -- date adapter section in package installation
//todo authentication for sign up / login buttons
//todo hide Sign up if logged in.
//todo make log in --> log out if logged in
//todo css for screen sizes
//todo compenent folder structure
//todo Link query parameters -> pass an id or some param for search terms

function App() {
  const [currentSiteList, setCurrentSiteList] = useState([]);
  const [currentSite, setCurrentSite] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [petSearch, setPetSearch] = useState("");
  return (
    <BrowserRouter>
      <div className="App">
        <SiteContext.Provider value={{ currentSiteList, setCurrentSiteList }}>
          <CurrentSiteContext.Provider value={{ currentSite, setCurrentSite }}>
            <SearchContext.Provider value={{ searchItem, setSearchItem }}>
              <PetContext.Provider value={{ petSearch, setPetSearch }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/sites" element={<Sites />} />
                  <Route path="/siteList" element={<SiteList />} />
                  <Route path="/owners" element={<InputLand />} />
                  <Route path="/confirmation" element={<Confirmation />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/booking" element={<BookedSite />} />
                </Routes>
              </PetContext.Provider>
            </SearchContext.Provider>
          </CurrentSiteContext.Provider>
        </SiteContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;

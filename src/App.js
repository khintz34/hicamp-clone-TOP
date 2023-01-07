import "../src/styles/App.css";
import Home from "./components/homePages/Home";
import { Routes, Route, HashRouter } from "react-router-dom";
import Sites from "./components/homePages/Sites";
import SiteList from "./components/homePages/SiteList";
import { useState } from "react";
import { SiteContext } from "./contexts/SiteContext.js";
import { CurrentSiteContext } from "./contexts/CurrentSiteContext.js";
import InputLand from "./components/homePages/InputLand";
import Confirmation from "./components/homePages/Confirmation";
import About from "./components/homePages/About";
import BookedSite from "./components/homePages/BookedSite";
import { AuthContext } from "./contexts/AuthContext";

//todo optimize for mobiles

function App() {
  const [currentSiteList, setCurrentSiteList] = useState([]);
  const [currentSite, setCurrentSite] = useState([]);
  const [currentAuth, setCurrentAuth] = useState(false);

  return (
    <HashRouter>
      <div className="App">
        <SiteContext.Provider value={{ currentSiteList, setCurrentSiteList }}>
          <CurrentSiteContext.Provider value={{ currentSite, setCurrentSite }}>
            <AuthContext.Provider value={{ currentAuth, setCurrentAuth }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sites/:nameParam" element={<Sites />} />
                <Route
                  path="/siteList/:locationParam/:guestParam/:petParam/:fireParam/:lakeParam/:lodgingParam/:whereParam"
                  element={<SiteList />}
                />
                <Route path="/owners" element={<InputLand />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/about" element={<About />} />
                <Route path="/booking" element={<BookedSite />} />
              </Routes>
            </AuthContext.Provider>
          </CurrentSiteContext.Provider>
        </SiteContext.Provider>
      </div>
    </HashRouter>
  );
}

export default App;

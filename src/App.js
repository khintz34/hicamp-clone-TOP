import "../src/styles/App.css";
import Home from "./components/pages/Home";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Sites from "./components/pages/Sites";
import SiteList from "./components/pages/SiteList";
import { useState } from "react";
import { SiteContext } from "./contexts/SiteContext.js";
import { CurrentSiteContext } from "./contexts/CurrentSiteContext.js";
import InputLand from "./components/pages/InputLand";
import Confirmation from "./components/pages/Confirmation";
import About from "./components/pages/About";
import BookedSite from "./components/pages/BookedSite";
import { AuthContext } from "./contexts/AuthContext";

//todo fix aboutDiv verticals

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

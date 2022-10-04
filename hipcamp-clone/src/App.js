import "../src/styles/App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sites from "./components/Sites";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sites" element={<Sites />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

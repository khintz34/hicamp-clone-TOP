import "../src/styles/App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Tagline from "./components/Tagline";
import Terms from "./components/Terms";

function App() {
  return (
    <div className="App">
      <Terms />
      <Header />
      <Tagline />
      <Main />
    </div>
  );
}

export default App;

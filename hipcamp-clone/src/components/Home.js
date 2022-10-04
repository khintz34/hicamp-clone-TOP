import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Tagline from "../components/Tagline";
import Terms from "../components/Terms";
import Footer from "../components/Footer";
import "../styles/App.css";

const Home = (props) => {
  return (
    <div className="Home">
      <Terms />
      <Header />
      <Tagline />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;

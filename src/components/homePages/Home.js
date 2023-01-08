import React from "react";
import Header from "./Header";
import Main from "./Main";
import Tagline from "../reuseableComps/Tagline";
import Footer from "./Footer";
import "../../styles/App.css";

const Home = (props) => {
  return (
    <div className="Home">
      <Header />
      <Tagline />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;

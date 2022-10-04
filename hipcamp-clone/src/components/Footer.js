import React from "react";
import "../styles/Footer.css";
import logo from "../images/logo.png";
import LinkList from "./LinkList";

const Footer = (props) => {
  return (
    <div className="footerContainer">
      <div id="footerImageContainer">
        <img src={logo} alt="" className="footerImage" />
      </div>
      <div id="footerMain">
        <LinkList
          title="About us"
          link1="Careers"
          link2="Journal"
          link3="Gift Cards"
          link4="Contact"
          link5="Hipcamper FAQ"
        />
        <LinkList
          title="Hosting"
          link1="Becoming a Host"
          link2="is my land a fit?"
          link3="Insurance"
          link4="Standards"
          link5="Hosting FAQ"
        />

        <div id="footerParas">
          <div
            style={{ color: "#28400c", fontWeight: "bold", fontSize: "20px" }}
          >
            Hipcamp is the most comprehensive resource for unique outdoor stays.
          </div>
          <div
            style={{
              marginTop: "3vh",
              fontSize: "18px",
              color: "rgb(129, 129, 129)",
            }}
          >
            Discover and book tent camping, RV parks, cabins, treehouses, and
            glamping.
          </div>
        </div>
      </div>
      <div id="footerFooter">
        <div>© 2022 Hipcamp, Inc. All rights reserved</div>
        <div>Terms of Service</div>
        <div>Privacy Policy</div>
        <div>Sitemap</div>
        <div>Social Media Links</div>
      </div>
      <div id="footerBottom">
        Hipcamp is created with ❤️ and hope for our future.
      </div>
    </div>
  );
};

export default Footer;

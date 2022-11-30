import React, { useContext, useEffect, useState } from "react";
import "../styles/BookedSite.css";
import Header from "./Header";
import { CurrentSiteContext } from "../contexts/CurrentSiteContext";

const BookedSite = (props) => {
  const { currentSite, setCurrentSite } = useContext(CurrentSiteContext);
  const [pets, setPets] = useState("");

  let petStatus = "";

  const handlePetStatus = () => {
    if (currentSite.pets) {
      setPets("Yes");
    } else {
      setPets("No");
    }
  };

  useEffect(() => {
    handlePetStatus();
  }, []);

  return (
    <div className="bookedSiteContainer">
      <Header />
      <div id="bookedSiteMain">
        <h1>
          Congrats you just booked{" "}
          <span className="bookedSpan">{currentSite.name}</span>!
        </h1>
        <h1>
          Located in <span className="bookedSpan">{currentSite.city}</span>,{" "}
          <span className="bookedSpan">{currentSite.state}</span>!
        </h1>
        <h2>
          Dates Booked: <span className="bookedSpan2">XXXX</span>
        </h2>
        <h2>
          Guests Allowed:{" "}
          <span className="bookedSpan">{currentSite.guests}</span>
        </h2>
        <h2>
          Pets Allowed: <span className="bookedSpan">{pets}</span>
        </h2>
        <h3>Make sure you pack for: </h3>
        <div id="sidewaysFlex">
          {currentSite.activities.map((value, key) => {
            if (key !== currentSite.activities.length - 1) {
              return (
                <div key={value.id} className="bookedPara">
                  {value}
                  {", "}
                </div>
              );
            } else {
              return (
                <div key={value.id} className="bookedPara">
                  and {value}
                </div>
              );
            }
          })}
        </div>
        <h1>Enjoy your Stay!</h1>
      </div>
    </div>
  );
};

export default BookedSite;

import React, { useContext, useEffect, useState } from "react";
import "../../styles/BookedSite.css";
import Header from "./Header";
import { CurrentSiteContext } from "../../contexts/CurrentSiteContext";
import { CheckInContext } from "../../contexts/CheckInContext";
import { CheckOutContext } from "../../contexts/CheckOutContext";
import { differenceInCalendarDays, isBefore } from "date-fns";

const BookedSite = (props) => {
  const { currentSite, setCurrentSite } = useContext(CurrentSiteContext);
  const [pets, setPets] = useState("");
  const { checkOutDate, setCheckOutDate } = useContext(CheckOutContext);
  const { checkInDate, setCheckInDate } = useContext(CheckInContext);
  const [checkInFormat, setCheckInFormat] = useState(
    checkInDate.toString().slice(0, 15)
    // ""
  );
  const [checkOutFormat, setCheckOutFormat] = useState(
    checkOutDate.toString().slice(0, 15)
    // ""
  );
  const [dayCheckFormat, setDayCheckFormat] = useState(
    new Date().toString().slice(0, 15)
  );
  const [days, setDays] = useState("");
  const dateCheck = isBefore(checkInDate, checkOutDate);
  const inCheck = isBefore(checkInDate, new Date());
  const outCheck = isBefore(checkOutDate, new Date());

  let petStatus = "";

  const handlePetStatus = () => {
    if (currentSite.pets) {
      setPets("Yes");
    } else {
      setPets("No");
    }
  };

  const reverseDates = () => {
    console.log("reverse Dates");
    let inNew = checkInDate;
    let outNew = checkOutDate;

    setCheckInDate(outNew);
    setCheckInDate(inNew);
    setCheckInFormat(checkOutDate.toString().slice(0, 15));
    setCheckOutFormat(checkInDate.toString().slice(0, 15));
    setDays(differenceInCalendarDays(checkInDate, checkOutDate));
  };

  const setTomorrowDate = (num) => {
    let today;
    if (!inCheck) {
      today = checkInDate;
    } else {
      today = new Date();
    }
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + num);
    setCheckOutDate(tomorrow);
  };

  const validateDates = () => {
    if (dayCheckFormat === checkInFormat && dayCheckFormat === checkOutFormat) {
      setTomorrowDate(1);
    } else if (outCheck && inCheck) {
      setCheckInDate(new Date());
      setTomorrowDate(3);
      console.log(1);
    } else if (!inCheck && !outCheck & !dateCheck) {
      reverseDates();
      console.log(2);
    } else if (inCheck) {
      setCheckInDate(new Date());
      console.log(3);
    } else if (outCheck) {
      setTomorrowDate(3);
      console.log(4);
    }
  };

  useEffect(() => {
    setCheckInFormat(checkInDate.toString().slice(0, 15));
    setCheckOutFormat(checkOutDate.toString().slice(0, 15));
    setDays(differenceInCalendarDays(checkOutDate, checkInDate));
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    handlePetStatus();
    validateDates();
    console.log("CheckIn:", checkInDate, inCheck, checkInFormat);
    console.log("CheckOut:", checkOutDate, outCheck, checkOutFormat);
    // console.log(new Date());
    console.log(dayCheckFormat);
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
          Dates Booked:{" "}
          <span className="bookedSpan2">
            {checkInFormat} - {checkOutFormat} ({days})
          </span>
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
                <div key={`${value}-bookedPara`} className="bookedPara">
                  {value}
                  {", "}
                </div>
              );
            } else {
              return (
                <div key={`${value}-bookedPara`} className="bookedPara">
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

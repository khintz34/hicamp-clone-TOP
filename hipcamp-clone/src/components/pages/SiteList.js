import React, { useContext, useEffect, useState } from "react";
import "../../styles/SiteList.css";
import Header from "./Header";
import { db } from "../../utils/firebase";
import { ref, set, push, onValue } from "firebase/database";
import MiniSite from "../reuseableComps/MiniSite";
import { SiteContext } from "../../contexts/SiteContext";
import { Link } from "react-router-dom";
import { CurrentSiteContext } from "../../contexts/CurrentSiteContext";
import { SearchContext } from "../../contexts/SearchContext";
import { PetSearchContext } from "../../contexts/PetSearchContext";
import { useParams } from "react-router-dom";

//todo add a way to organize the specials in createList
//todo need to add a critieria to handle camping type

const SiteList = () => {
  const [siteArray, setSiteArray] = useState([]);
  const { currentSiteList, setCurrentSiteList } = useContext(SiteContext);
  const { currentSite, setCurrentSite } = useContext(CurrentSiteContext);
  const { searchItem, setSearchItem } = useContext(SearchContext);
  const { petSearch, setPetSearch } = useContext(PetSearchContext);
  const [maxVal, setMaxVal] = useState(0);
  const [minVal, setMinVal] = useState(0);
  const [currentVal, setCurrentVal] = useState(maxVal);
  const [maxAcres, setMaxAcres] = useState(0);
  const [minAcres, setMinAcres] = useState(20);
  const [currentAcreVal, setCurrentAcreVal] = useState(maxAcres);
  const [currentAcres, setCurrentAcres] = useState(maxAcres);
  const [currentSiteHolder, setCurrentSiteHolder] = useState([]);
  const [petSearchTranslate, setPetSearchTranslate] = useState("");
  const [maxMinEQ, setMaxMinEQ] = useState(false);
  const [urlFlag, setUrlFlag] = useState(false);
  const [createdFlag, setCreatedFlag] = useState(false);
  const [fullList, setFullList] = useState([]);

  const { locationParam } = useParams();
  const { guestParam } = useParams();
  const { petParam } = useParams();
  const { fireParam } = useParams();
  const { lakeParam } = useParams();
  const { lodgingParam } = useParams();
  const { whereParam } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      const callNextUp = await nextUp();
    };

    function nextUp() {
      console.log("location:", locationParam);
      console.log("guestNum: ", guestParam);
      console.log("petParam: ", petParam);
      console.log("fire: ", fireParam);
      console.log("lake: ", lakeParam);
      console.log("lodging: ", lodgingParam);
      console.log("where: ", whereParam);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (fullList.length !== 0) {
      console.log("fullList: ", fullList);
      setUrlFlag(true);
    }
  }, [fullList]);

  useEffect(() => {
    if (urlFlag) {
      createList();
      setCreatedFlag(true);
    }
  }, [urlFlag]);

  useEffect(() => {
    findMaxMin();
    setCurrentSiteHolder(currentSiteList);
    console.log("currentSiteList: ", currentSiteList);
  }, [createdFlag]);

  useEffect(() => {
    if (petSearch === "true") {
      setPetSearchTranslate("Yes");
    } else if (petSearch === "false") {
      setPetSearchTranslate("No");
    } else {
      setPetSearchTranslate("");
    }
  }, [petSearch]);

  function createList() {
    let newArray = [];
    console.log("fullList: ", fullList);
    setSearchItem(locationParam);
    if (whereParam === "location" && locationParam !== "") {
      let locationArray = locationParam.match(/\w+/g);
      fullList.map((value, key) => {
        if (value.state.toLowerCase() === locationParam) {
          newArray.push(value);
        } else if (value.park.toString().toLowerCase() === locationParam) {
          newArray.push(value);
        } else if (value.city.toLowerCase() === locationParam) {
          newArray.push(value);
        } else if (value.name.toLowerCase() === locationParam) {
          newArray.push(value);
        } else {
          let newLength = locationArray.length;
          let parkWords = value.park.toString().toLowerCase().match(/\w+/g);
          let cityWords = value.city.toString().toLowerCase().match(/\w+/g);
          let nameWords = value.name.toString().toLowerCase().match(/\w+/g);
          let matchArray = Array.from(Array(newLength).keys());
          parkWords.map((word) => {
            matchArray.shift();
            matchArray.push(word);
            if (
              matchArray.every((val, index) => val === locationArray[index])
            ) {
              newArray.push(value);
            }
          });
          cityWords.map((word) => {
            matchArray.shift();
            matchArray.push(word);
            if (
              matchArray.every((val, index) => val === locationArray[index])
            ) {
              newArray.push(value);
            }
          });
          nameWords.map((word) => {
            matchArray.shift();
            matchArray.push(word);
            if (
              matchArray.every((val, index) => val === locationArray[index])
            ) {
              newArray.push(value);
            }
          });
          console.log("newArray", newArray);
        }
      });
    } else if (whereParam === "fires") {
      fullList.map((value, key) => {
        if (value.fires.toString() === fireParam) {
          newArray.push(value);
        }
      });
    } else if (whereParam === "lakes") {
      fullList.map((value, key) => {
        if (value.lake.toString() === lakeParam) {
          newArray.push(value);
        }
      });
    } else if (whereParam === "lodging") {
      fullList.map((value, key) => {
        value.type.map((value2, key2) => {
          console.log(value.acres, value);
          if (value2 === "Lodging") {
            newArray.push(value);
          }
        });
      });
    }

    if (newArray.length > 0) {
      let arrayTwo = [];
      newArray.map((value, key) => {
        let newNum = Number(value.guests);
        if (newNum >= guestParam) {
          arrayTwo.push(value);
        }
      });
      newArray = arrayTwo;
    } else if (guestParam !== 0) {
      fullList.map((value, key) => {
        let newNum = Number(value.guests);
        if (newNum >= guestParam) {
          newArray.push(value);
        }
      });
    }

    if (petParam !== "null") {
      setPetSearch(petParam);
      if (newArray.length > 0) {
        let arrayTwo = [];
        newArray.map((value, key) => {
          console.log(value.pets, petParam);
          if (value.pets.toString() === petParam.toString()) {
            arrayTwo.push(value);
            console.log("MATCH PETS");
          }
        });
        newArray = arrayTwo;
      } else {
        setPetSearch(petParam);
        fullList.map((value, key) => {
          if (value.pets === petParam) {
            newArray.push(value);
          }
        });
      }
    } else {
      setPetSearch(petParam);
    }
    setCurrentSiteList(newArray);
  }

  async function getUserData() {
    console.log("getting userData");
    const boardRef = ref(db, "SiteList/");
    let displayArray = [];
    await onValue(
      boardRef,
      (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const childKey = childSnapShot.key;
          const childData = childSnapShot.val();
          let obj = {
            name: childData.name,
            guests: childData.guests,
            type: childData.type,
            city: childData.city,
            state: childData.state,
            acres: childData.acres,
            special: childData.special,
            available: childData.available,
            activities: childData.activities,
            features: childData.features,
            park: childData.park,
            pets: childData.pets,
            fires: childData.fires,
            lake: childData.lake,
            rating: childData.rating,
            reviewNum: childData.reviewNum,
            price: childData.price,
            info: childData.info,
            url: childData.url,
          };
          addData(obj);
        });
      },
      {
        onlyOnce: false,
      }
    );

    function addData(obj) {
      displayArray.push(obj);
      sortArray();
    }

    function sortArray() {
      displayArray.sort((a, b) => {
        return a.name - b.name;
      });
      setFullList(displayArray);
    }
  }

  function showType(type) {
    let newArray = [];

    currentSiteList.map((value, key) => {
      value.type.map((value2, key2) => {
        if (value2 === type) {
          newArray.push(value);
        }
      });
    });

    setCurrentSiteList(newArray);
  }

  function findMaxMin() {
    let numMax = 0;
    let numMin = 20;
    let acresMax = 0;
    let acresMin = 20;
    currentSiteList.map((value, key) => {
      if (value.guests > numMax) {
        numMax = value.guests;
      }
      if (value.guests < numMin) {
        numMin = value.guests;
      }
      if (value.acres > acresMax) {
        acresMax = value.acres;
      }
      if (value.acres < acresMin) {
        acresMin = value.acres;
      }
    });
    setMaxVal(Number(numMax));
    setMinVal(Number(numMin));
    setCurrentVal(Number(numMax));
    setMinAcres(Number(acresMin));
    setMaxAcres(Number(acresMax));
    setCurrentAcres(Number(acresMax));

    console.log("acresMin: ", acresMin);
    console.log("acresMax: ", acresMax);
  }

  useEffect(() => {
    if (maxVal === minVal) {
      setMaxMinEQ(true);
    } else {
      setMaxMinEQ(false);
    }
  });

  function handleGuestsChange(e) {
    setCurrentVal(e.target.value);
    let newGuestNum = e.target.value;
    let newArray = [];
    const FullList = currentSiteHolder;

    FullList.map((value, key) => {
      if (value.guests <= newGuestNum) {
        newArray.push(value);
      }
    });

    let newerArray = [];
    newArray.map((value) => {
      if (value.acres <= currentAcres) {
        newerArray.push(value);
      }
    });

    setCurrentSiteList(newerArray);
  }

  function handleAcresChange(e) {
    setCurrentAcres(e.target.value);
    let newAcresNum = Number(e.target.value);
    let newArray = [];
    const FullList = currentSiteHolder;

    FullList.map((value, key) => {
      if (Number(value.acres) <= newAcresNum) {
        newArray.push(value);
      }
    });

    let newerArray = [];
    newArray.map((value) => {
      if (Number(value.guests) <= currentVal) {
        newerArray.push(value);
      }
    });

    setCurrentSiteList(newerArray);
  }

  return (
    <div className="siteListContainer">
      <Header />
      <div id="siteListHeader">
        <button className="siteBtn" onClick={() => showType("Tent")}>
          Tents
        </button>
        <button className="siteBtn" onClick={() => showType("Lodging")}>
          Lodging
        </button>
        <button className="siteBtn" onClick={() => showType("RV")}>
          RVs
        </button>
        {maxMinEQ ? (
          <div style={{ display: "none" }}>equal</div>
        ) : (
          <div>
            <input
              type="range"
              id="guestSlider"
              name="guests"
              min={minVal}
              max={maxVal}
              step="1"
              onChange={(e) => {
                handleGuestsChange(e);
              }}
              value={currentVal}
            />
            <label htmlFor="guestSlider">Max Guests ({currentVal})</label>
          </div>
        )}
        <div>
          <input
            type="range"
            id="acres"
            name="acres"
            step="1"
            min={minAcres}
            max={maxAcres}
            onChange={(e) => {
              handleAcresChange(e);
            }}
            value={currentAcres}
          />
          <label htmlFor="acres">Max Acres ({currentAcres})</label>
        </div>
        {searchItem !== "" ? (
          <div>
            <p>Search: {searchItem}</p>
          </div>
        ) : (
          <div style={{ display: "none" }}></div>
        )}
        {petSearchTranslate !== "" ? (
          <div>
            <p>Pets Allowed: {petSearchTranslate}</p>
          </div>
        ) : (
          <div style={{ display: "none" }}></div>
        )}
        {maxMinEQ ? (
          <div>
            <p>Number of Guests: {maxVal}</p>
          </div>
        ) : (
          <div style={{ display: "none" }}></div>
        )}
      </div>
      <div id="siteListMainContainer">
        <div id="siteListMain">
          {currentSiteList.length === 0 ? (
            <div id="noDataContainer">
              <div id="noDataMsg">
                <p> No sites meet your search criteria. </p>
                <p>
                  {" "}
                  Please return to the{" "}
                  <Link to="/" className="noDataLink">
                    {" "}
                    main menu{" "}
                  </Link>{" "}
                  and try again.
                </p>
              </div>
            </div>
          ) : (
            currentSiteList.map((value, key) => {
              return (
                <Link
                  to={"/sites"}
                  className="noUnderline"
                  key={`link-${value.name}`}
                >
                  <MiniSite
                    name={value.name}
                    type={value.type}
                    acres={value.acres}
                    city={value.city}
                    state={value.state}
                    price={value.price}
                    rating={value.rating}
                    reviewNum={value.reviewNum}
                    fullSite={value}
                    url={value.url}
                    key={`key-miniSite-${value.name}`}
                  />
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SiteList;

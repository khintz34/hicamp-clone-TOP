import React, { useContext, useEffect, useState } from "react";
import "../../styles/SiteList.css";
import Header from "./Header";
import { db } from "../../utils/firebase";
import { ref, onValue } from "firebase/database";
import MiniSite from "../reuseableComps/MiniSite";
import { SiteContext } from "../../contexts/SiteContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { usePetStore } from "../../stores/petStore";
import { useSearchStore } from "../../stores/searchStore";

const SiteList = () => {
  const { currentSiteList, setCurrentSiteList } = useContext(SiteContext);
  const changePetSearch = usePetStore((state) => state.changePetSearch);
  const changeSearch = useSearchStore((state) => state.changeSearch);
  const searchItem = useSearchStore((state) => state.search);
  const petSearch = usePetStore((state) => state.petSearch);
  const [maxVal, setMaxVal] = useState(0);
  const [minVal, setMinVal] = useState(0);
  const [currentVal, setCurrentVal] = useState(maxVal);
  const [maxAcres, setMaxAcres] = useState(0);
  const [minAcres, setMinAcres] = useState(20);
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
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (fullList.length !== 0) {
      createList();
      setCreatedFlag(true);
    }
  }, [urlFlag, fullList]);

  useEffect(() => {
    findMaxMin();
    setCurrentSiteHolder(currentSiteList);
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
    let locateFlag = false;
    changeSearch(locationParam);
    if (whereParam === "location" && locationParam !== "") {
      let locationArray = locationParam.match(/\w+/g);
      fullList.map((value, key) => {
        if (value.state.toLowerCase() === locationParam) {
          newArray.push(value);
          locateFlag = true;
        } else if (value.park.toString().toLowerCase() === locationParam) {
          newArray.push(value);
          locateFlag = true;
        } else if (value.city.toLowerCase() === locationParam) {
          newArray.push(value);
          locateFlag = true;
        } else if (value.name.toLowerCase() === locationParam) {
          newArray.push(value);
          locateFlag = true;
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
              locateFlag = true;
            }
          });
          cityWords.map((word) => {
            matchArray.shift();
            matchArray.push(word);
            if (
              matchArray.every((val, index) => val === locationArray[index])
            ) {
              newArray.push(value);
              locateFlag = true;
            }
          });
          nameWords.map((word) => {
            matchArray.shift();
            matchArray.push(word);
            if (
              matchArray.every((val, index) => val === locationArray[index])
            ) {
              newArray.push(value);
              locateFlag = true;
            }
          });
        }
      });
    } else if (whereParam === "fires") {
      fullList.map((value, key) => {
        if (value.fires.toString() === fireParam) {
          newArray.push(value);
          locateFlag = true;
        }
      });
    } else if (whereParam === "lakes") {
      fullList.map((value, key) => {
        if (value.lake.toString() === lakeParam) {
          newArray.push(value);
          locateFlag = true;
        }
      });
    } else if (whereParam === "lodging") {
      fullList.map((value, key) => {
        value.type.map((value2, key2) => {
          if (value2 === locationParam) {
            newArray.push(value);
            locateFlag = true;
          }
        });
      });
    } else if (whereParam === "special") {
      fullList.map((value, key) => {
        if (value.special === locationParam) {
          newArray.push(value);
          locateFlag = true;
        }
      });
    }

    if (
      locateFlag === true ||
      (locateFlag === false && locationParam === "anywhere")
    ) {
      if (newArray.length > 0) {
        let arrayTwo = [];
        newArray.map((value, key) => {
          let newNum = Number(value.guests);
          if (newNum >= Number(guestParam)) {
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
        // setPetSearch(petParam);
        changePetSearch(petParam);

        if (newArray.length > 0) {
          let arrayTwo = [];
          newArray.map((value, key) => {
            if (value.pets.toString() === petParam.toString()) {
              arrayTwo.push(value);
            }
          });
          newArray = arrayTwo;
        } else {
          // setPetSearch(petParam);
          changePetSearch(petParam);
          fullList.map((value, key) => {
            if (value.pets.toString() === petParam.toString()) {
              newArray.push(value);
            }
          });
        }
      } else {
        // setPetSearch(petParam);
        changePetSearch(petParam);
      }
    }
    setCurrentSiteList(newArray);
  }

  async function getUserData() {
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
  }

  useEffect(() => {
    if (maxVal === minVal) {
      setMaxMinEQ(true);
    } else {
      setMaxMinEQ(false);
    }
  }, [maxVal, minVal]);

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
        {Number(guestParam) !== 0 ? (
          <div>
            <p>Number of Guests: {guestParam}</p>
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
                  to={`/sites/${value.name}`}
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

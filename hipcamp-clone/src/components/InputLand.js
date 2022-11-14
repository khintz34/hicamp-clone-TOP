import React, { useEffect, useState } from "react";
import "../styles/InputLand.css";
import Header from "./Header";
import OwnerImg from "../images/owners.jpeg";
import { push, ref, set } from "firebase/database";
import { db } from "../utils/firebase.js";
import LeftAlignInput from "./leftAlignInput";
import YesNoRadio from "./YesNoRadio";
import RadioDivHold from "./RadioDivHold";

//todo divide inputs into components
//todo add submitted info or some confirmation

const InputLand = (props) => {
  const [tentRadio, setTentRadio] = useState(false);
  const [rvRadio, setRVRadio] = useState(false);
  const [lodgingRadio, setLodgingRadio] = useState(false);
  const typeArray = [tentRadio, rvRadio, lodgingRadio];
  const [typeFinal, setTypeFinal] = useState([]);
  ////////////////////////
  const [climbingRadio, setClimbingRadio] = useState(false);
  const [hikingRadio, setHikingRadio] = useState(false);
  const [bikingRadio, setBikingRadio] = useState(false);
  const [fishingRadio, setFishingRadio] = useState(false);
  const [wildlifeRadio, setWildlifeRadio] = useState(false);
  const [paddlingRadio, setPaddlingRadio] = useState(false);
  const [swimmingRadio, setSwimmingRadio] = useState(false);
  const [windRadio, setWindRadio] = useState(false);
  const [yardRadio, setYardRadio] = useState(false);
  const [boatingRadio, setBoatingRadio] = useState(false);
  const [snowRadio, setSnowRadio] = useState(false);
  const [offRoadRadio, setOffroadRadio] = useState(false);
  const [whitewaterRadio, setWhitewaterRadio] = useState(false);
  const [horseRadio, setHorseRadio] = useState(false);

  const activityArray = [
    climbingRadio,
    hikingRadio,
    bikingRadio,
    fishingRadio,
    wildlifeRadio,
    paddlingRadio,
    swimmingRadio,
    windRadio,
    yardRadio,
    boatingRadio,
    snowRadio,
    offRoadRadio,
    whitewaterRadio,
    horseRadio,
  ];

  const [actFinal, setActFinal] = useState([]);
  //////////////////////
  const [forestRadio, setForestRadio] = useState(false);
  const [farmRadio, setFarmRadio] = useState(false);
  const [fieldRadio, setFieldRadio] = useState(false);
  const [mountainsRadio, setMountainsRadio] = useState(false);
  const [desertRadio, setDesertRadio] = useState(false);
  const [drivewayRadio, setDrivewayRadio] = useState(false);
  const [lakeRadio, setLakeRadio] = useState(false);
  const [riverRadio, setRiverRadio] = useState(false);
  const [swimmingHoleRadio, setSwimmingHoleRadio] = useState(false);
  const [waterfallRadio, setWaterfallRadio] = useState(false);
  const [canyonRadio, setCanyonRadio] = useState(false);
  const [ranchRadio, setRanchRadio] = useState(false);

  useEffect(() => {
    createArrays();
  }, [
    climbingRadio,
    hikingRadio,
    bikingRadio,
    fishingRadio,
    wildlifeRadio,
    paddlingRadio,
    swimmingRadio,
    windRadio,
    yardRadio,
    snowRadio,
    boatingRadio,
    offRoadRadio,
    whitewaterRadio,
    horseRadio,
    tentRadio,
    rvRadio,
    lodgingRadio,
    forestRadio,
    farmRadio,
    fieldRadio,
    mountainsRadio,
    desertRadio,
    drivewayRadio,
    lakeRadio,
    riverRadio,
    swimmingHoleRadio,
    waterfallRadio,
    canyonRadio,
    ranchRadio,
  ]);

  const featureArray = [
    forestRadio,
    farmRadio,
    fieldRadio,
    mountainsRadio,
    desertRadio,
    drivewayRadio,
    lakeRadio,
    riverRadio,
    swimmingHoleRadio,
    waterfallRadio,
    canyonRadio,
    ranchRadio,
  ];

  const [featureFinal, setFeatureFinal] = useState([]);
  ////////////////////////
  const [siteName, setSiteName] = useState("");
  const [siteGuests, setSiteGuests] = useState(4);
  const [siteCity, setSiteCity] = useState("");
  const [siteState, setSiteState] = useState("");
  const [siteAcres, setSiteAcres] = useState(0);
  const [siteSpecial, setSiteSpecial] = useState("none");
  const [sitePets, setSitePets] = useState("");
  const [siteFire, setSiteFire] = useState("");
  const [siteLake, setSiteLake] = useState("");
  const [sitePrice, setSitePrice] = useState(0);
  const [siteOverview, setSiteOverview] = useState("");
  const [siteParkNearby, setSiteParkNearby] = useState("false");
  const [siteParkName, setSiteParkName] = useState("");
  ////////////////////////

  const [disabledBtn, setDisabledBtn] = useState(true);

  const hiddenDiv = {
    display: "none",
  };
  const seenDiv = {
    display: "flex",
  };

  const YesNoPetArray = [
    {
      id: "sitePetsYes",
      value: "true",
      name: "petRadioStatus",
      setValue: { setSitePets },
      title: "Yes",
    },
    {
      id: "sitePetsno",
      value: "false",
      name: "petRadioStatus",
      setValue: { setSitePets },
      title: "No",
    },
  ];

  const YesNoFireArray = [
    {
      id: "siteFireYes",
      value: "true",
      name: "fireRadioStatus",
      setValue: { setSiteFire },
      title: "Yes",
    },
    {
      id: "siteFireNo",
      value: "false",
      name: "fireRadioStatus",
      setValue: { setSiteFire },
      title: "No",
    },
  ];

  const YesNoLakeArray = [
    {
      id: "siteLakeYes",
      value: "true",
      name: "lakeRadioStatus",
      setValue: { setSiteLake },
      title: "Yes",
    },
    {
      id: "siteLakeNo",
      value: "false",
      name: "lakeRadioStatus",
      setValue: { setSiteLake },
      title: "No",
    },
  ];

  const [parkDiv, setParkDiv] = useState(hiddenDiv);

  function checkRadioStatus(e, value, setValue) {
    if (value === false) {
      setValue(e.target.value);
    } else {
      setValue(false);
    }
  }

  function changeParkStatus(e) {
    setSiteParkNearby(e.target.value);

    if (siteParkNearby === "false") {
      setParkDiv(seenDiv);
    } else {
      setParkDiv(hiddenDiv);
    }
    if (!siteParkNearby) {
      setSiteParkName(false);
    }
  }
  /////////////////////////////
  function writeUserData(
    name,
    guests,
    acres,
    available,
    type,
    state,
    city,
    activities,
    features,
    park,
    special,
    pets,
    fires,
    lake,
    rating,
    reviewNum,
    price,
    info
  ) {
    const reference = ref(db, "SiteList/");

    const newItem = push(reference);
    console.log(newItem);

    set(newItem, {
      name: name,
      guests: guests,
      acres: acres,
      available: available,
      type: type,
      state: state,
      city: city,
      activities: activities,
      features: features,
      park: park,
      special: special,
      pets: pets,
      fires: fires,
      lake: lake,
      rating: rating,
      reviewNum: reviewNum,
      price: price,
      info: info,
    });
  }

  function createArrays() {
    const newAct = [];
    const newFeat = [];
    const newType = [];
    activityArray.map((value, key) => {
      if (value) {
        newAct.push(value);
      }
    });
    featureArray.map((value, key) => {
      if (value) {
        newFeat.push(value);
      }
    });
    typeArray.map((value, key) => {
      if (value) {
        newType.push(value);
      }
    });

    setActFinal(newAct);
    setFeatureFinal(newFeat);
    setTypeFinal(newType);
  }

  useEffect(() => {
    // console.log(siteName);
    // console.log(siteGuests);
    // console.log(siteAcres);
    // console.log(siteState);
    // console.log(siteCity);
    // console.log(sitePrice);
    // console.log(sitePets);
    // console.log(siteFire);
    // console.log(siteLake);
    // console.log(siteOverview);

    if (
      siteName === "" ||
      siteGuests === "0" ||
      siteAcres === "0" ||
      siteState === "" ||
      siteCity === "" ||
      sitePrice === "0" ||
      sitePets === "" ||
      siteFire === "" ||
      siteLake === "" ||
      siteOverview === ""
    ) {
      //   console.group("true");
      setDisabledBtn(true);
    } else {
      //   console.log("false");
      setDisabledBtn(false);
    }
  }, [
    siteName,
    siteGuests,
    siteAcres,
    siteState,
    siteCity,
    sitePrice,
    sitePets,
    siteFire,
    siteLake,
    siteOverview,
  ]);

  function writeAllData(e) {
    e.preventDefault();
    console.log("here");
    if (disabledBtn) {
      e.preventDefault();
      return;
    } else {
      writeUserData(
        siteName,
        siteGuests,
        siteAcres,
        true,
        typeFinal,
        siteState,
        siteCity,
        actFinal,
        featureFinal,
        siteParkName,
        siteSpecial,
        sitePets,
        siteFire,
        siteLake,
        "100%",
        20,
        sitePrice,
        siteOverview
      );
    }
  }

  return (
    <div className="InputLandContainer">
      <Header />
      <div id="inputLandMain">
        <div id="ILandImg">
          <img src={OwnerImg} alt="" id="ownerImage" />
        </div>
        <div id="inputFormContainer">
          <form action="">
            <h2>Want to host a Hipcamp site?</h2>
            <h4>Its simple. Just fill out the form below!</h4>
            <br />
            <LeftAlignInput
              id="siteNameInp"
              title="Site Name:"
              value={siteName}
              setVal={setSiteName}
              class="inputRight"
            />
            <br />
            <LeftAlignInput
              id="siteGuests"
              title="Maximum Guests:"
              value={siteGuests}
              setVal={setSiteGuests}
              class="numberInput"
            />
            <br />
            <div className="radioDivHold leftAlign">
              <p className="labelLeft">Type of Camping: </p>
              <div className="radioContainer">
                <input
                  type="checkbox"
                  id="tent"
                  value="Tent"
                  name="tentCamping"
                  checked={tentRadio}
                  onChange={(e) => {
                    checkRadioStatus(e, tentRadio, setTentRadio);
                  }}
                />
                <label htmlFor="tent">Tent Camping</label>
              </div>
              <div className="radioContainer">
                <input
                  type="checkbox"
                  id="rv"
                  value="RV"
                  name="rvCamping"
                  checked={rvRadio}
                  onChange={(e) => {
                    checkRadioStatus(e, rvRadio, setRVRadio);
                  }}
                />
                <label htmlFor="rv">RV Camping</label>
              </div>
              <div className="radioContainer">
                <input
                  type="checkbox"
                  id="lodging"
                  value="Lodging"
                  name="lodgingCamping"
                  checked={lodgingRadio}
                  onChange={(e) => {
                    checkRadioStatus(e, lodgingRadio, setLodgingRadio);
                  }}
                />
                <label htmlFor="lodging">Lodging</label>
              </div>
            </div>
            <br />
            <LeftAlignInput
              id="siteCity"
              title="City:"
              value={siteCity}
              setVal={setSiteCity}
              class="inputRight"
            />
            <br />
            <LeftAlignInput
              id="siteState"
              title="State:"
              value={siteState}
              setVal={setSiteState}
              class="inputRight"
            />
            <br />
            <LeftAlignInput
              id="siteAcres"
              title="Acres:"
              value={siteAcres}
              setVal={setSiteAcres}
              class="numberInput"
              min={0}
            />
            <br />
            <div className="leftAlign">
              <label htmlFor="special" className="labelLeft">
                Special ID:{" "}
              </label>
              <select
                name="special"
                id="special"
                style={{ width: "30ch" }}
                required
                value={siteSpecial}
                onChange={(e) => setSiteSpecial(e.target.value)}
              >
                <option value="none">None</option>
                <option value="monarchs">Project Monarch</option>
                <option value="cottage">Cottage Stays</option>
                <option value="hidden">Hidden Gems</option>
              </select>
            </div>
            <br />
            <div className="leftAlign">
              <label htmlFor="special" className="labelLeft">
                State/National Park nearby:{" "}
              </label>
              <select
                name="special"
                id="special"
                style={{ width: "30ch" }}
                required
                value={siteParkNearby}
                onChange={(e) => changeParkStatus(e)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <br />
            <div className="leftAlign" style={parkDiv}>
              <label htmlFor="special" className="labelLeft">
                Park name:{" "}
              </label>
              <input
                type="text"
                onChange={(e) => setSiteParkName(e.target.value)}
              />
            </div>
            <br />
            {/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&? */}
            <div className="radioVerticalHold multiContainer">
              <p className="radioHoldP">Activities (select all that apply): </p>

              <div className="largeCountRadio">
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="climbingID"
                    value="Climbing"
                    name="climbingActivity"
                    checked={climbingRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, climbingRadio, setClimbingRadio);
                    }}
                  />
                  <label htmlFor="climbingID">Climbing</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="hikingID"
                    value="Hiking"
                    name="hikingActivity"
                    checked={hikingRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, hikingRadio, setHikingRadio);
                    }}
                  />
                  <label htmlFor="bikingID">Hiking</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="bikingID"
                    value="Biking"
                    name="bikingActivity"
                    checked={bikingRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, bikingRadio, setBikingRadio);
                    }}
                  />
                  <label htmlFor="bikingID">Biking</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="fishingID"
                    value="Fishing"
                    name="fishingActivity"
                    checked={fishingRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, fishingRadio, setFishingRadio);
                    }}
                  />
                  <label htmlFor="fishingID">Fishing</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="wildlifeID"
                    value="Wildlife watching"
                    name="wildlifeActivity"
                    checked={wildlifeRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, wildlifeRadio, setWildlifeRadio);
                    }}
                  />
                  <label htmlFor="wildlifeID">Wildlife watching</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="paddlingID"
                    value="Paddling"
                    name="paddlingAct"
                    checked={paddlingRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, paddlingRadio, setPaddlingRadio);
                    }}
                  />
                  <label htmlFor="paddlingID">Paddling</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="swimmingID"
                    value="Swimming"
                    name="swimmingAct"
                    checked={swimmingRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, swimmingRadio, setSwimmingRadio);
                    }}
                  />
                  <label htmlFor="swimmingID">Swimming</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="windID"
                    value="Wind sports"
                    name="windAct"
                    checked={windRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, windRadio, setWindRadio);
                    }}
                  />
                  <label htmlFor="windID">Wind sports</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="yardID"
                    value="Yard Games"
                    name="yardAct"
                    checked={yardRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, yardRadio, setYardRadio);
                    }}
                  />
                  <label htmlFor="yardID">Yard games</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="boatingID"
                    value="Boating"
                    name="boatAct"
                    checked={boatingRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, boatingRadio, setBoatingRadio);
                    }}
                  />
                  <label htmlFor="boatingID">Boating</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="snowID"
                    value="Snow sports"
                    name="snowAct"
                    checked={snowRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, snowRadio, setSnowRadio);
                    }}
                  />
                  <label htmlFor="snowID">Snow sports</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="offID"
                    value="Off-roading"
                    name="offAct"
                    checked={offRoadRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, offRoadRadio, setOffroadRadio);
                    }}
                  />
                  <label htmlFor="offID">Off-roading</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="whiteID"
                    value="Whitewater paddling"
                    name="whiteAct"
                    checked={whitewaterRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, whitewaterRadio, setWhitewaterRadio);
                    }}
                  />
                  <label htmlFor="whiteID">Whitewater paddling</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="horseID"
                    value="Horseback riding"
                    name="horseAct"
                    checked={horseRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, horseRadio, setHorseRadio);
                    }}
                  />
                  <label htmlFor="horseID">Horseback riding</label>
                </div>
              </div>
            </div>
            {/* ! break between act and feat */}
            <br />
            <div className="radioVerticalHold multiContainer">
              <p className="radioHoldP">Features (select all that apply): </p>

              <div className="largeCountRadio">
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="ForestID"
                    value="Forest"
                    name="climbingFeat"
                    checked={forestRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, forestRadio, setForestRadio);
                    }}
                  />
                  <label htmlFor="ForestID">Forest</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="farmID"
                    value="Farm"
                    name="farmFeat"
                    checked={farmRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, farmRadio, setFarmRadio);
                    }}
                  />
                  <label htmlFor="farmID">Farm</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="fieldID"
                    value="Field"
                    name="fieldFeat"
                    checked={fieldRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, fieldRadio, setFieldRadio);
                    }}
                  />
                  <label htmlFor="fieldID">Field</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="mountainsID"
                    value="Mountains"
                    name="mountainsFeat"
                    checked={mountainsRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, mountainsRadio, setMountainsRadio);
                    }}
                  />
                  <label htmlFor="mountainsID">Mountains</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="desertID"
                    value="Desert"
                    name="desertFeat"
                    checked={desertRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, desertRadio, setDesertRadio);
                    }}
                  />
                  <label htmlFor="desertID">Desert</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="drivewayID"
                    value="Driveway"
                    name="drivewayFeat"
                    checked={drivewayRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, drivewayRadio, setDrivewayRadio);
                    }}
                  />
                  <label htmlFor="drivewayID">Driveway</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="lakeID"
                    value="Lake"
                    name="lakeFeat"
                    checked={lakeRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, lakeRadio, setLakeRadio);
                    }}
                  />
                  <label htmlFor="lakeID">Lake</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="riverID"
                    value="River/stream"
                    name="riverFeat"
                    checked={riverRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, riverRadio, setRiverRadio);
                    }}
                  />
                  <label htmlFor="riverID">River/stream</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="swimmingHoleID"
                    value="Swimming hole"
                    name="swimFeat"
                    checked={swimmingHoleRadio}
                    onChange={(e) => {
                      checkRadioStatus(
                        e,
                        swimmingHoleRadio,
                        setSwimmingHoleRadio
                      );
                    }}
                  />
                  <label htmlFor="swimmingHoleID">Swimming hole</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="waterfallID"
                    value="Waterfall"
                    name="waterfallFeat"
                    checked={waterfallRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, waterfallRadio, setWaterfallRadio);
                    }}
                  />
                  <label htmlFor="waterfallID">Waterfall</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="canyonID"
                    value="Canyon"
                    name="cayonFeat"
                    checked={canyonRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, canyonRadio, setCanyonRadio);
                    }}
                  />
                  <label htmlFor="canyonID">Canyon</label>
                </div>
                <div className="radioContainer">
                  <input
                    type="checkbox"
                    id="ranchID"
                    value="Ranch"
                    name="ranchFeat"
                    checked={ranchRadio}
                    onChange={(e) => {
                      checkRadioStatus(e, ranchRadio, setRanchRadio);
                    }}
                  />
                  <label htmlFor="ranchID">Ranch</label>
                </div>
              </div>
            </div>

            <br />
            {/* 
            <RadioDivHold title="Pets Allowed: " array={YesNoPetArray} />
            <RadioDivHold title="Campfires Allowed: " array={YesNoFireArray} />
            <RadioDivHold title="Lake Nearby: " array={YesNoLakeArray} /> */}

            <div className="radioDivHold leftAlign">
              <p className="labelLeft">Pets Allowed: </p>
              <YesNoRadio
                id="sitePetsYes"
                value="true"
                name="petRadioStatus"
                setValue={setSitePets}
                title="Yes"
              />
              <YesNoRadio
                id="sitePetsno"
                value="false"
                name="petRadioStatus"
                setValue={setSitePets}
                title="No"
              />
            </div>
            <div className="radioDivHold leftAlign">
              <p className="labelLeft">Campfires Allowed: </p>
              <YesNoRadio
                id="siteFireYes"
                value="true"
                name="fireRadioStatus"
                setValue={setSiteFire}
                title="Yes"
              />
              <YesNoRadio
                id="siteFireNo"
                value="false"
                name="fireRadioStatus"
                setValue={setSiteFire}
                title="No"
              />
            </div>
            <br />
            <div className="radioDivHold leftAlign">
              <p className="labelLeft">Lake Nearby: </p>
              <YesNoRadio
                id="siteLakeYes"
                value="true"
                name="lakeRadioStatus"
                setValue={setSiteLake}
                title="Yes"
              />
              <YesNoRadio
                id="siteLakeNo"
                value="false"
                name="lakeRadioStatus"
                setValue={setSiteLake}
                title="No"
              />
            </div>
            <br />
            <LeftAlignInput
              id="sitePrice"
              title="Price/night:"
              value={sitePrice}
              setVal={setSitePrice}
              class="numberInput"
            />
            <br />
            <div className="leftAlign">
              <label htmlFor="siteInfo" className="labelLeft">
                Overview of site:
              </label>
              <textarea
                id="infoTextArea"
                value={siteOverview}
                onChange={(e) => setSiteOverview(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="submitBtnContainer">
              <button
                type="submit"
                className="subBtn"
                onClick={(e) => writeAllData(e)}
                disabled={disabledBtn}
              >
                Start Hosting
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputLand;

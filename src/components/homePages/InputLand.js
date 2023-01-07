import React, { useEffect, useState, useContext } from "react";
import "../../styles/InputLand.css";
import Header from "./Header";
import OwnerImg from "../../images/owners.jpeg";
import { push, ref, set } from "firebase/database";
import { db } from "../../utils/firebase.js";
import LeftAlignInput from "../reuseableComps/leftAlignInput";
import YesNoRadio from "../reuseableComps/YesNoRadio";
import RadioDivHold from "../reuseableComps/RadioDivHold";
import Checkbox from "../reuseableComps/Checkbox";
import Select from "../reuseableComps/Select";
import SelectPark from "../reuseableComps/SelectPark";
import { Link } from "react-router-dom";
import { ref as ref2, uploadBytes } from "firebase/storage";
import { storage } from "../../utils/firebase.js";
import { AuthContext } from "../../contexts/AuthContext";
import Footer from "./Footer";

//todo clean up into more components

const InputLand = (props) => {
  const { currentAuth, setCurrentAuth } = useContext(AuthContext);
  const [tentRadio, setTentRadio] = useState(false);
  const [rvRadio, setRVRadio] = useState(false);
  const [lodgingRadio, setLodgingRadio] = useState(false);
  const typeArray = [tentRadio, rvRadio, lodgingRadio];
  const [typeFinal, setTypeFinal] = useState([]);
  const storageRef = ref2(storage);
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
  const [subClass, setSubClass] = useState("disableBtn");

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
  const [siteParkName, setSiteParkName] = useState("false");
  const [siteURL, setSiteURL] = useState("");
  const [siteImage, setSiteImage] = useState(null);
  ////////////////////////

  const [disabledBtn, setDisabledBtn] = useState(true);

  const hiddenDiv = {
    display: "none",
  };
  const seenDiv = {
    display: "flex",
  };

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setSiteImage(e.target.files[0]);
      setSiteURL(e.target.files[0]["name"]);
    }
  };

  const uploadImage = () => {
    const imageRef = ref2(storage, siteURL);
    uploadBytes(imageRef, siteImage)
      .then(() => {
        console.log(imageRef);
      })
      .catch((error) => {
        console.log(error);
      });
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
    url,
    info
  ) {
    const reference = ref(db, "SiteList/");

    const newItem = push(reference);

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
      url: url,
      info: info,
    });

    uploadImage();
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
      siteOverview === "" ||
      !currentAuth
    ) {
      setDisabledBtn(true);
      setSubClass("disableBtn");
    } else {
      setDisabledBtn(false);
      setSubClass("subBtn");
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
    currentAuth,
  ]);

  function writeAllData(e) {
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
        siteURL,
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
              <Checkbox
                id="tent"
                value="Tent"
                name="tentCamping"
                state={tentRadio}
                setState={setTentRadio}
                checkRadioStatus={checkRadioStatus}
                title="Tent Camping"
              />
              <Checkbox
                id="rv"
                value="RV"
                name="rvCamping"
                state={rvRadio}
                setState={setRVRadio}
                checkRadioStatus={checkRadioStatus}
                title="RV Camping"
              />
              <Checkbox
                id="lodging"
                value="Lodging"
                name="lodingCamping"
                state={lodgingRadio}
                setState={setLodgingRadio}
                checkRadioStatus={checkRadioStatus}
                title="Lodging"
              />
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
            <Select state={siteSpecial} setState={setSiteSpecial} />
            <br />
            <SelectPark
              state={siteParkNearby}
              setState={setSiteParkName}
              changeParkStatus={changeParkStatus}
              style={parkDiv}
            />
            <br />
            <div className="radioVerticalHold multiContainer">
              <p className="radioHoldP">Activities (select all that apply): </p>

              <div className="largeCountRadio">
                <Checkbox
                  id="bikingID"
                  value="Biking"
                  name="bikingActivity"
                  state={bikingRadio}
                  setState={setBikingRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="boatingID"
                  value="Boating"
                  name="boatActivity"
                  state={boatingRadio}
                  setState={setBoatingRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="climbingID"
                  value="Climbing"
                  name="climbingActivity"
                  state={climbingRadio}
                  setState={setClimbingRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="fishingID"
                  value="Fishing"
                  name="fishingActivity"
                  state={fishingRadio}
                  setState={setFishingRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="hikingID"
                  value="Hiking"
                  name="hikingActivity"
                  state={hikingRadio}
                  setState={setHikingRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="horseID"
                  value="Horseback riding"
                  name="horseAct"
                  state={horseRadio}
                  setState={setHorseRadio}
                  checkRadioStatus={checkRadioStatus}
                />

                <Checkbox
                  id="offID"
                  value="Off-roading"
                  name="offRoadActivity"
                  state={offRoadRadio}
                  setState={setOffroadRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="paddlingID"
                  value="Padding"
                  name="paddlingActivity"
                  state={paddlingRadio}
                  setState={setPaddlingRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="snowID"
                  value="Snow sports"
                  name="snowActivity"
                  state={snowRadio}
                  setState={setSnowRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="swimmingID"
                  value="Swimming"
                  name="swimmingActivity"
                  state={swimmingRadio}
                  setState={setSwimmingRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="whiteID"
                  value="Whitewater Paddling"
                  name="whiteAct"
                  state={whitewaterRadio}
                  setState={setWhitewaterRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="wildlifeID"
                  value="Wilidlife watching"
                  name="wildlifeActivity"
                  state={wildlifeRadio}
                  setState={setWildlifeRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="windID"
                  value="Wind sports"
                  name="windActivity"
                  state={windRadio}
                  setState={setWindRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="yardID"
                  value="Yard games"
                  name="yardActivity"
                  state={yardRadio}
                  setState={setYardRadio}
                  checkRadioStatus={checkRadioStatus}
                />
              </div>
            </div>
            <br />
            <div className="radioVerticalHold multiContainer">
              <p className="radioHoldP">Features (select all that apply): </p>

              <div className="largeCountRadio">
                <Checkbox
                  id="canyonID"
                  value="Canyon"
                  name="canyonFeat"
                  state={canyonRadio}
                  setState={setCanyonRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="desertID"
                  value="Desert"
                  name="desertFeat"
                  state={desertRadio}
                  setState={setDesertRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="drivewayID"
                  value="Driveway"
                  name="drivewayFeat"
                  state={drivewayRadio}
                  setState={setDrivewayRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="farmID"
                  value="Farm"
                  name="farmFeat"
                  state={farmRadio}
                  setState={setFarmRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="fieldID"
                  value="Field"
                  name="fieldFeat"
                  state={fieldRadio}
                  setState={setFieldRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="forestID"
                  value="Forest"
                  name="forestFeat"
                  state={forestRadio}
                  setState={setForestRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="lakeID"
                  value="Lake"
                  name="lakeFeat"
                  state={lakeRadio}
                  setState={setLakeRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="mountainsID"
                  value="Mountains"
                  name="mountainsFeat"
                  state={mountainsRadio}
                  setState={setMountainsRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="ranchID"
                  value="Ranch"
                  name="ranchFeat"
                  state={ranchRadio}
                  setState={setRanchRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="riverID"
                  value="River"
                  name="riverFeat"
                  state={riverRadio}
                  setState={setRiverRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="swimmingHoleID"
                  value="Swimming Hole"
                  name="swimFeat"
                  state={swimmingHoleRadio}
                  setState={setSwimmingHoleRadio}
                  checkRadioStatus={checkRadioStatus}
                />
                <Checkbox
                  id="waterfallID"
                  value="Waterfall"
                  name="waterfallFeat"
                  state={waterfallRadio}
                  setState={setWaterfallRadio}
                  checkRadioStatus={checkRadioStatus}
                />
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
              <label htmlFor="siteImg" className="labelLeft">
                Picture of Site:
              </label>
              <input type="file" onChange={handleImage} />
            </div>
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
            {currentAuth ? (
              <div style={{ display: "none" }}></div>
            ) : (
              <div style={{ marginTop: "10px" }}>
                Please sign in to submit your hosting site
              </div>
            )}
            <div className="submitBtnContainer">
              <Link to="/confirmation">
                <button
                  type="submit"
                  className={subClass}
                  onClick={(e) => writeAllData(e)}
                  disabled={disabledBtn}
                >
                  Start Hosting
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputLand;

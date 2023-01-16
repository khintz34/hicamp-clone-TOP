import React, { useContext, useState, useEffect } from "react";
import { SiteContext } from "../../contexts/SiteContext";
import "../../styles/Header.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { db } from "../../utils/firebase";
import { ref, onValue } from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { AuthContext } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavbarStore } from "../../stores/navbarStore";

const Header = () => {
  const [fullSiteList, setFullSiteList] = useState([]);
  const { currentSiteList, setCurrentSiteList } = useContext(SiteContext);
  const { currentAuth, setCurrentAuth } = useContext(AuthContext);
  const [signInLingo, setSignInLingo] = useState("Sign In");
  const navbarStatus = useNavbarStore((state) => state.navbarStatus);
  const changeStatus = useNavbarStore((state) => state.changeStatus);

  useEffect(() => {
    if (!currentAuth) {
      setCurrentAuth(false);
      setSignInLingo("Sign In");
    } else {
      setSignInLingo("Sign Out");
    }
  }, []);

  useEffect(() => {
    if (!currentAuth) {
      setSignInLingo("Sign In");
      console.log("signing out");
    } else {
      setSignInLingo("Sign Out");
      console.log("signing in");
    }
  }, [currentAuth]);

  const signUserIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    if (!currentAuth) {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          setCurrentAuth(true);
          // console.log(user);
          setSignInLingo("Sign Out");
          // ...
          closeMenu();
          console.log("signing in func");
        })
        .catch((error) => {});
    } else {
      auth.signOut().then(
        function () {
          setCurrentAuth(false);
          setSignInLingo("Sign In");
          console.log("signing out func");
        },
        function (error) {
          console.error("Sign Out Error", error);
        }
      );
    }
  };

  function getUserData() {
    const boardRef = ref(db, "SiteList/");
    let displayArray = [];
    onValue(
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
        return a.time - b.time;
      });
      setFullSiteList(displayArray);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  const handleCurrentList = () => {
    let newArray = [];

    fullSiteList.map((value, key) => {
      if (value.state === "Montana") {
        newArray.push(value);
      }
    });
    setCurrentSiteList(newArray);
  };

  const handleToggle = () => {
    if (navbarStatus === true) {
      changeStatus(false);
    } else {
      changeStatus(true);
    }
  };

  const closeMenu = () => {
    changeStatus(false);
  };

  return (
    <div id="headerDiv">
      <div id="logo-div">
        <Link to="/">
          <img src={logo} alt="" className="logo" />
        </Link>
      </div>
      <div id="header-btns">
        <div id="rightHeaderLarge">
          <div className="header-btn" onClick={handleCurrentList}>
            <Link
              to={"/siteList/montana/0/null/null/null/null/location"}
              className="noUnderline"
            >
              Near Me
            </Link>
          </div>
          <div className="header-btn">
            <Link className="noUnderline" to="/about">
              About
            </Link>
          </div>
          <div className="header-btn">
            <Link className="noUnderline" to="/owners">
              Start hosting{" "}
            </Link>
          </div>
          <button id="signUp-btn" onClick={signUserIn}>
            {signInLingo}
          </button>
        </div>

        <nav id="rightHeaderDropdown" className="navBar">
          {navbarStatus === false ? (
            <div onClick={handleToggle} id="rightHeaderSmall">
              <FontAwesomeIcon icon={faBars} className="iconWidth openBtn" />
            </div>
          ) : (
            <div onClick={handleToggle} className="xBtnContainer">
              <div className="iconWidth openBtn xBtn">X</div>
            </div>
          )}
        </nav>
      </div>
      <div id="sideNav" className="sideNav">
        <ul
          className={`menuNav ${
            navbarStatus === true ? " showMenu" : " hideNav"
          }`}
        >
          <button id="signUp-btn2" onClick={signUserIn}>
            {signInLingo}
          </button>
          <Link
            to={"/siteList/montana/0/null/null/null/null/location"}
            className=" whiteFont"
          >
            <li className="header-btn menuItem" onClick={closeMenu}>
              Near Me
            </li>
          </Link>

          <Link className="whiteFont " to="/about">
            <li className="header-btn menuItem" onClick={closeMenu}>
              About
            </li>
          </Link>
          <Link className=" whiteFont" to="/owners">
            <li className="header-btn menuItem" onClick={closeMenu}>
              Start hosting{" "}
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;

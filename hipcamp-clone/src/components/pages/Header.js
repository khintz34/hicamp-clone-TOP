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

const Header = () => {
  const [fullSiteList, setFullSiteList] = useState([]);
  const { currentSiteList, setCurrentSiteList } = useContext(SiteContext);
  const { currentAuth, setCurrentAuth } = useContext(AuthContext);
  const [signInLingo, setSignInLingo] = useState("Sign In");

  useEffect(() => {
    if (!currentAuth) {
      setCurrentAuth(false);
      setSignInLingo("Sign In");
    } else {
      setSignInLingo("Sign Out");
    }
  });

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
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    } else {
      auth.signOut().then(
        function () {
          setCurrentAuth(false);
          setSignInLingo("Sign In");
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

  return (
    <div id="headerDiv">
      <div id="logo-div">
        <Link to="/">
          <img src={logo} alt="" className="logo" />
        </Link>
      </div>
      <div id="header-btns">
        <div className="header-btn" onClick={handleCurrentList}>
          <Link to="/siteList" className="noUnderline">
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
    </div>
  );
};

export default Header;

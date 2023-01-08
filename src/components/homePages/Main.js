import React, { useEffect, useState } from "react";
import "../../styles/Main.css";
import Where from "../mainComps/Where";
import FullDiv from "../mainComps/FullDiv";
import VerticalDiv from "../mainComps/VerticalDiv";
import SquareDiv from "../mainComps/SquareDiv";
import CircleDiv from "../mainComps/CircleDiv";
import SquareDivWTag from "../mainComps/SquareDivWTag";
import SafetyDiv from "../mainComps/SafetyDiv";
import { usePetStore } from "../../stores/petStore";
import { useSearchStore } from "../../stores/searchStore";
import HalfDivPart from "../mainComps/HalfDivPart";
import WhereMobile from "../mainComps/WhereMobile";

const Main = () => {
  const [fullSiteList, setFullSiteList] = useState([]);
  const changePetSearch = usePetStore((state) => state.changePetSearch);
  const changeSearch = useSearchStore((state) => state.changeSearch);

  let size = window.innerWidth;

  window.onresize = () => {
    size = window.innerWidth;
  };

  useEffect(() => {
    changeSearch("");
    changePetSearch("");
  }, []);

  return (
    <div id="mainDiv">
      {size >= 1000 ? <Where list={fullSiteList} /> : <WhereMobile />}

      <HalfDivPart />
      <FullDiv />
      <VerticalDiv />
      <div id="discoverDiv">
        <h2>Discover top spots near you</h2>
      </div>
      <SquareDiv />
      <CircleDiv />
      <SquareDivWTag />
      <SafetyDiv />
    </div>
  );
};

export default Main;

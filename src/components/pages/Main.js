import React, { useContext, useEffect, useState } from "react";
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

const Main = () => {
  const [fullSiteList, setFullSiteList] = useState([]);
  const changePetSearch = usePetStore((state) => state.changePetSearch);
  const changeSearch = useSearchStore((state) => state.changeSearch);

  useEffect(() => {
    changeSearch("");
    changePetSearch("");
  }, []);

  return (
    <div id="mainDiv">
      <Where list={fullSiteList} />
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

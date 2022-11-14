import React from "react";
import RadioContainer from "./RadioContainer";
import YesNoRadio from "./YesNoRadio";

const RadioDivHold = (props) => {
  const newArray = props.array;

  return (
    <div className="radioDivHold leftAlign">
      <p className="labelLeft">{props.title} </p>
      {newArray.map((value, key) => {
        console.log(value);
        return (
          <YesNoRadio
            key={value.id}
            id={value.id}
            value={value.value}
            name={value.name}
            setValue={value.setValue}
            title={value.title}
          />
        );
      })}
    </div>
  );
};

export default RadioDivHold;

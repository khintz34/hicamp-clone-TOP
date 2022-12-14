import React from "react";

const YesNoRadio = (props) => {
  return (
    <div className="radioContainer">
      <input
        type="radio"
        id={props.id}
        value={props.value}
        name={props.name}
        onClick={() => {
          props.setValue(props.value);
        }}
        required
        className="radioClass"
      />
      <label htmlFor={props.id}>{props.title}</label>
    </div>
  );
};

export default YesNoRadio;

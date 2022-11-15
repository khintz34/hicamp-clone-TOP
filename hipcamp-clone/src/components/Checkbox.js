import React from "react";

const Checkbox = (props) => {
  return (
    <div className="radioContainer">
      <input
        type="checkbox"
        id={props.id}
        value={props.value}
        name={props.name}
        checked={props.state}
        onChange={(e) => {
          props.checkRadioStatus(e, props.state, props.setState);
        }}
      />
      <label htmlFor={props.id}>{props.value}</label>
    </div>
  );
};

export default Checkbox;

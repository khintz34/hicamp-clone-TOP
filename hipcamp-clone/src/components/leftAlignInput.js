import React from "react";

const LeftAlignInput = (props) => {
  let typeInp;
  if (props.class === "numberInput") {
    typeInp = "number";
  } else {
    typeInp = "text";
  }

  return (
    <div className={`leftAlign`}>
      <label htmlFor={props.id} className="labelLeft">
        {props.title}{" "}
      </label>
      <input
        type={typeInp}
        id={props.id}
        className={props.class}
        value={props.value}
        onChange={(e) => props.setVal(e.target.value)}
        required
        min={props.min}
        max={props.max}
      />
    </div>
  );
};

export default LeftAlignInput;

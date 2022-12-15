import React from "react";

const SelectPark = (props) => {
  return (
    <div>
      <div className="leftAlign">
        <label htmlFor="special" className="labelLeft">
          State/National Park nearby:{" "}
        </label>
        <select
          name="special"
          id="special"
          style={{ width: "30ch" }}
          required
          value={props.state}
          onChange={(e) => props.changeParkStatus(e)}
          className="selectClass"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <br />
      <div className="leftAlign" style={props.style}>
        <label htmlFor="special" className="labelLeft">
          Park name:{" "}
        </label>
        <input
          type="text"
          style={{ width: "40ch" }}
          onChange={(e) => props.setState(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SelectPark;

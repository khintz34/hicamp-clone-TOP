import React from "react";

const Select = (props) => {
  return (
    <div className="leftAlign">
      <label htmlFor="special" className="labelLeft">
        Special ID:{" "}
      </label>
      <select
        name="special"
        id="special"
        style={{ width: "30ch" }}
        required
        value={props.state}
        onChange={(e) => props.setState(e.target.value)}
      >
        <option value="none">None</option>
        <option value="monarchs">Project Monarch</option>
        <option value="cottage">Cottage Stays</option>
        <option value="hidden">Hidden Gems</option>
      </select>
    </div>
  );
};

export default Select;

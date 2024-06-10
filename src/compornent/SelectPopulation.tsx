import React from "react";
import { SelectPopulationProps } from "../types/type";
import "../style/SelectPopulation.css";
export const SelectPopulation = (props: SelectPopulationProps) => {
  const { selectedKey, handleChange, options } = props;
  return (
    <div className="select-population">
      <label htmlFor="population-dropdown">人口区分: </label>
      <select
        id="population-dropdown"
        value={selectedKey}
        onChange={handleChange}
        className="population-dropdown"
      >
        {Object.entries(options).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

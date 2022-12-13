import React from "react";
import FilterIcon from "../../../../assets/images/icons/Filter.svg";

export default function TableFilter({setFilterMode,filterMode}) {
  return (
    <div className="table-filter">
      <button onClick={() => setFilterMode(!filterMode)}>
        <img src={FilterIcon} />
      </button>
  
    </div>
  );
}

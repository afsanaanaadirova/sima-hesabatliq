import React from "react";
import TableSearch from "./table-search";
import "./table-header.scss";
import TableExport from "./table-export";
import TableFilter from "./table-filter";

export default function TableHeader({
  setSearchValue,
  searchValue,
  noFilter,
  setCurrentPage,
  placeholder,
  setFilterMode,
  filterMode,
}) {
  return (
    <div className="table-header">
      <TableSearch
        setSearchValue={setSearchValue}
        setCurrentPage={setCurrentPage}
        placeholder={placeholder}
        searchValue={searchValue}
      />
      {!noFilter ? (
        <TableFilter setFilterMode={setFilterMode} filterMode={filterMode} />
      ) : (
        <></>
      )}
      <TableExport />
    </div>
  );
}

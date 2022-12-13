import React from "react";
import { useEffect, useMemo, useState } from "react";
import TableComponent from "../../components/shared/table-component/table-component";
import TableHeader from "../../components/shared/table-component/table-header";
import Pagination from "../../components/shared/pagination/pagination";
import dayjs from "dayjs";
import {
  getallReportAppDetails,
} from "../../core/api";
import TableFilterDetail from "../../components/shared/table-component/table-header/table-filter-detail";

const ReportAppDetail = ({ setReturnedItemFunc, ...props }) => {
  const PageSize = process.env.REACT_APP_PAGE_SIZE;

  const isBetween = require("dayjs/plugin/isBetween");
  const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
  const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
  dayjs.extend(isSameOrBefore)
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isBetween);

  const excludedHeader = ["url", "id", "reportAppId", "reportId"];
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [reports, setReports] = useState([]);
  const [data, setData] = useState([]);
  const [noFilter, setNoFilter] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [filterMode, setFilterMode] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    transaction: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    getReportAppDetailByReportAppId(id);
  }, []);

  const getReportAppDetailByReportAppId = async (reportAppId) => {
    const response = await getallReportAppDetails(reportAppId);
    setReports(renderDate(response.data));
    setData(renderDate(response.data));
  };

  const renderDate = (currentData) => {
    currentData = currentData?.map((item) => ({
      ...item,
      date: dayjs(item?.date).format("MM.DD.YYYY"),
    }));

    return currentData;
  };

  const handleFilter = () => {
    setCurrentPage(1);
    let filteredData = data;
    filteredData = [
      ...filteredData.filter((item) => {
        if (filters.from === "" && filters.to === "" && filters.transaction === "") return item;
        if (filters.transaction === "") {
          if (
            filters.from === "" && dayjs(item.date).isSameOrBefore(dayjs(filters.to))

          ) return item;


          if (
            filters.to === "" &&
            dayjs(item.date).isSameOrAfter(dayjs(filters.from))
          )
            return item;
          else if (
            dayjs(item.date).isBetween(dayjs(filters.from), dayjs(filters.to))
          ) {
            return item;
          }
        } else {
          if (
            filters.from === "" && dayjs(item.date).isSameOrBefore(dayjs(filters.to)) && item.transaction === filters.transaction
          ) return item;
          if (
            filters.to === "" &&
            dayjs(item.date).isSameOrAfter(dayjs(filters.from)) &&
            item.transaction === filters.transaction
          )
            return item;
          else if (
            dayjs(item.date).isBetween(
              dayjs(filters.from),
              dayjs(filters.to)
            ) &&
            item.transaction === filters.transaction
          ) {
            return item;
          }
        }
      }),
    ];
    setReports(filteredData);
    setFilterData(filteredData)
  };
  const resetFilter = () => {
    setFilters({
      transaction: "",
      from: "",
      to: "",
    });
    setError(false)
    setReports(data);
  };

  const currentTableData = useMemo(() => {
    let filterData = reports;

    if (searchValue) {

      filterData = [
        ...filterData.filter((item) => {

          return item.fin?.toLowerCase().includes(searchValue?.toLowerCase());
        }),

      ];

    }
    setSearchData(filterData)
    setTotalCount(filterData.length);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filterData.slice(firstPageIndex, lastPageIndex);
  }, [reports, searchValue, currentPage]);

  console.log(filterData);

  return (
    <div className="container__page">
      <TableHeader
        setSearchValue={setSearchValue}
        setCurrentPage={setCurrentPage}
        placeholder={"FIN-ə görə axtar.."}
        searchValue={searchValue}
        noFilter={noFilter}
        setFilterMode={setFilterMode}
        filterMode={filterMode}

      />
      {filterMode ? (
        <TableFilterDetail
          handleFilter={handleFilter}
          setFilters={setFilters}
          resetFilter={resetFilter}
          filters={filters}
          error={error}
          setError={setError}
        />
      ) : (
        <> </>
      )}
      <TableComponent
        data={currentTableData}
        filterData={filterData}
        excluded={excludedHeader}
        searchData={searchData}
      ></TableComponent>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ReportAppDetail;

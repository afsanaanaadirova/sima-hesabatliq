import React from "react";
import { useEffect, useMemo, useState } from "react";
import TableComponent from "../../components/shared/table-component/table-component";
import TableHeader from "../../components/shared/table-component/table-header";
import Pagination from "../../components/shared/pagination/pagination";
import "./certificate.scss";
import dayjs from "dayjs";
import TableFilterDetail from "../../components/shared/table-component/table-header/table-filter-detail";
import { getallCertificates } from "../../core/api";

function Certificate() {
  const PageSize = process.env.REACT_APP_PAGE_SIZE;
  const filterType = "certificate";

  const isBetween = require("dayjs/plugin/isBetween");
  const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
  const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
  dayjs.extend(isSameOrBefore)
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isBetween);

  const excludedHeader = ["id"];
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [data, setData] = useState([]);
  const [filterMode, setFilterMode] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    timeType: "startDate",
  });

  useEffect(() => {
    getCertificates();
  }, []);

  const getCertificates = async () => {
    const response = await getallCertificates();
    setCertificates(response.data);
    setData(response.data);
  };

  const currentTableData = useMemo(() => {
    let filterData = certificates;

    if (searchValue) {
      filterData = [
        ...filterData.filter((item) => {
          return item.fin.toLowerCase().includes(searchValue.toLowerCase());
        }),
      ];
    }
    setSearchData(filterData)
    setTotalCount(filterData.length);

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filterData.slice(firstPageIndex, lastPageIndex);
  }, [certificates, searchValue, currentPage]);

  const handleFilter = () => {
    setCurrentPage(1);
    let filteredData = data;
    filteredData = [
      ...filteredData.filter((item) => {
        let filterTimeType =
          filters.timeType === "startDate" ? item.startDate : item.endDate;

        if (
          filters.to === "" &&
          dayjs(filterTimeType).isSameOrAfter(dayjs(filters.from))
        )
          return item;

        else if (filters.from === "" && dayjs(filterTimeType).isSameOrBefore(dayjs(filters.to))
        ) return item
        else if (
          dayjs(filterTimeType).isBetween(
            dayjs(filters.from),
            dayjs(filters.to)
          )
        ) {
          return item;
        }
        else if(filters.timeType==="" || filters.from==="" && filters.to===""){
          return item;
        }
      }),
    ];
    setCertificates(filteredData);
    setFilterData(filteredData)
  };

  const resetFilter = () => {
    setFilters({
      from: "",
      to: "",
      timeType: "",
    });
    setError(false)
    setCertificates(data);
  };

  const renderDate = (currentData) => {
    currentData = currentData?.map((item) => ({
      ...item,
      startDate: dayjs(item?.startDate).format("MM.DD.YYYY"),
      endDate: dayjs(item?.endDate).format("MM.DD.YYYY"),
    }));

    return currentData;
  };

  console.log(searchData);
  return (
    <div className="container__page">
      <div className="certificate">
        <div className="certificate__items pb__30">
          <div className="certificate__item">
            <div className="certificate__item--count">
              {" "}
              Total sertifikatlar: {certificates.length}
            </div>
          </div>
        </div>
      </div>
      <TableHeader
        setSearchValue={setSearchValue}
        setCurrentPage={setCurrentPage}
        placeholder={"FİN-ə görə axtar..."}
        filterMode={filterMode}
        setFilterMode={setFilterMode}
      />
      {filterMode ? (
        <TableFilterDetail
          handleFilter={handleFilter}
          setFilters={setFilters}
          resetFilter={resetFilter}
          filters={filters}
          filterType={filterType}
          error={error}
          setError={setError}
        />
      ) : (
        <> </>
      )}
      <TableComponent
        data={renderDate(currentTableData)}
        filterData={filterData}
        searchData={searchData}
        simpleData={true}
        redirectUri={"id"}
        excluded={excludedHeader}
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
}

export default Certificate;

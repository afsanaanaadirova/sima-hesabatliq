import React from "react";
import { useEffect, useMemo, useState } from "react";
import TableComponent from "../../components/shared/table-component/table-component";
import TableHeader from "../../components/shared/table-component/table-header";
import Pagination from "../../components/shared/pagination/pagination";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
import { getallReports } from "../../core/api";
import stroke from "../../assets/images/common/stroke.png";
import { useNavigate } from "react-router-dom";

const Report = ({ setReturnedItemFunc, ...props }) => {
  const PageSize = process.env.REACT_APP_PAGE_SIZE;
  let navigate = useNavigate();
  const isBetween = require("dayjs/plugin/isBetween");
  const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isBetween);

  const excludedHeader = ["url", "id", "reportAppId", "reportId"];
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [reports, setReports] = useState([]);
  const [noFilter, setNoFilter] = useState(true);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    getReports();
  }, []);

  const getReports = async () => {
    const response = await getallReports();
    setReports(
      response.data.map((dt) => ({
        ...dt,
        render: () => (
          <NavLink
            onClick={(e) => {
              e.preventDefault();
              navigate(`/report/app?id=${dt.id}`);
            }}
          >
            Keçid et <img src={stroke} />
          </NavLink>
        ),
      }))
    );
  };

  const currentTableData = useMemo(() => {
    let filterData = reports;

    if (searchValue) {
      filterData = [
        ...filterData.filter((item) => {
          return item.agency
            ?.toLowerCase()
            .includes(searchValue?.toLowerCase());
        }),
      ];
    }
    setSearchData(filterData)
    setTotalCount(filterData.length);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filterData.slice(firstPageIndex, lastPageIndex);
  }, [reports, searchValue, currentPage]);

  return (
    <div className="container__page">
      <TableHeader
        setSearchValue={setSearchValue}
        setCurrentPage={setCurrentPage}
        placeholder={"Qurum-a görə axtar..."}
        searchValue={searchValue}
        noFilter={noFilter}
      />
      <TableComponent
        data={currentTableData}
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

export default Report;

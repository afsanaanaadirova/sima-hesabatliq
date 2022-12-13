import React from "react";
import { useEffect, useMemo, useState } from "react";
import TableComponent from "../../components/shared/table-component/table-component";
import TableHeader from "../../components/shared/table-component/table-header";
import Pagination from "../../components/shared/pagination/pagination";
import { NavLink } from "react-router-dom";
import {
  getallReportApps,
} from "../../core/api";
import stroke from "../../assets/images/common/stroke.png";
import { useNavigate } from "react-router-dom";

const ReportApp = ({ setReturnedItemFunc, ...props }) => {
  const PageSize = process.env.REACT_APP_PAGE_SIZE;
  let navigate = useNavigate();
  const excludedHeader = ["url", "id", "reportAppId", "reportId"];
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [reports, setReports] = useState([]);
  const [noFilter, setNoFilter] = useState(true);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    getReportAppByReportId(id);
  }, []);

  const getReportAppByReportId = async (reportId) => {
    const response = await getallReportApps(reportId);
    setReports(
      response.data.map((dt) => ({
        ...dt,
        render: () => (
          <NavLink
            onClick={(e) => {
              e.preventDefault();
              navigate(`/report/app/detail?id=${dt.id}`);
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
          return item.serviceName
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
        placeholder={"Xidmət-ə görə axtar..."}
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

export default ReportApp;

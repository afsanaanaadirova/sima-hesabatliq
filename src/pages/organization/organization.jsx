import React from "react";
import { useEffect, useMemo, useState } from "react";
import TableComponent from "../../components/shared/table-component/table-component";
import TableHeader from "../../components/shared/table-component/table-header";
import Pagination from "../../components/shared/pagination/pagination";
import { getallOrganization } from "../../core/api";
import Submitbutton from "../../components/shared/button/submit-button";
import "./organization.scss";
import { useNavigate } from "react-router-dom";

function Organization() {
  const PageSize = process.env.REACT_APP_PAGE_SIZE;
  const excludedHeader = ["url", "id", "organizationAppId"];
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [organizations, setOrganizations] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    getOrganization();
  }, []);

  const getOrganization = async () => {
    const response = await getallOrganization();
    setOrganizations(response.data);
  };

  const currentTableData = useMemo(() => {
    let filterData = organizations;

    if (searchValue) {
      filterData = [
        ...filterData.filter((item) => {
          return item.agency_voen
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        }),
      ];
    }
    setSearchData(filterData)
    setTotalCount(filterData.length);

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filterData.slice(firstPageIndex, lastPageIndex);
  }, [organizations, searchValue, currentPage]);

  const history = useNavigate();
  const navigateHandler = () => {
    history("/add-organization");
  };
  return (
    <div className="container__page">
      <TableHeader
        setSearchValue={setSearchValue}
        setCurrentPage={setCurrentPage}
        placeholder={"VÖEN-ə görə axtar..."}
      />
      <div className="organization__table">
        <div className="organization__table--left">
          <TableComponent
            data={currentTableData}
            simpleData={true}
            redirectUri={"id"}
            excluded={excludedHeader}
            searchData={searchData}
          ></TableComponent>
        </div>
        <div className="organization__table--right">
          <Submitbutton onClick={navigateHandler}>Qurum əlavə et</Submitbutton>
        </div>
      </div>
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

export default Organization;

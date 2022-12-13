import React from "react";
import { Table } from "reactstrap";
import { useEffect, useState } from "react";
import "./table-component-style.scss";
import resources from "../../../db.json";
import { getallMessage } from "../../../core/api";

const TableComponent = ({ data,filterData,searchData, excluded, ...props }) => {
  const [translation, setTranslation] = useState(resources.translation);
  const [currentDataKeys, setCurrentDataKeys] = useState([]);
  const [currentData, setCurrentData] = useState(data);
  const [errorMessage, setErrorMessage] = useState("");
  const [filterErrorMessage, setFilterErrorMessage] = useState("");

  useEffect(() => {
    setCurrentData(data);
    getErrorData();
  }, [data]);

  useEffect(() => {
    if (currentData.length > 0) {
      setCurrentDataKeys(Object.keys(currentData[0]));
    }
  }, [currentData]);

  const getErrorData = async () => {
    const response_message = await getallMessage();
    setErrorMessage(response_message.data.noData);
    setFilterErrorMessage(response_message.data.filterErrorMessage)
  };

  function displayHeader(data) {
    return (
      <thead>
        <tr>
          {currentDataKeys?.length > 0
            ? currentDataKeys?.map((i) =>
              excluded.includes(i) ? null : (
                <th key={i} scope="row">
                  {translation[i]}
                </th>
              )
            )
            : null}
          {
            <th scope="row">
              <a href="#" style={{ fontWeight: 300, color: "green" }}></a>
            </th>
          }
        </tr>
      </thead>
    );
  }

  function displayData(data) {
    return (
      data.length > 0 ? <tbody>
        {data?.map((i) => (
          <tr key={i.id}>
            {Object.entries(i).map((k) =>
              excluded.includes(k[0]) ? null : <td key={k}>{k[1]}</td>
            )}
            {i.render && <td>{i.render()}</td>}
          </tr>
        ))}
      </tbody> :
        <tbody>
          <tr >
            <td className="noData" colSpan="100%">
              {filterData?.length<=0 || searchData?.length<=0 ? filterErrorMessage : errorMessage}
            </td>
          </tr>
        </tbody>
    );
  }

  return (
    <div className="tableComponent">
      <Table responsive>
        {displayHeader(currentData)}
        {displayData(currentData)}
      </Table>
    </div>
  );
};

export default TableComponent;

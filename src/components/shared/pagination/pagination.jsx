import React from "react";
import classnames from "classnames";
import { useState } from "react";
import { usePagination,DOTS } from "./use-pagination";
import { getallMessage } from "../../../core/api";
import "./pagination.scss";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const [errorMessage, setErrorMessage] = useState("");
  
  const getErrorData = async () => {
    const response_message = await getallMessage();
    setErrorMessage(response_message.data.noData);
  };

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    totalCount>0 ? <div className="table-footer">
    <ul className="pagination-right-side">
      <li>
        {currentPage}/{lastPage} səhifə
      </li>
    </ul>
    <ul
      className={classnames("pagination-container", {
        [className]: className,
      })}
    >
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li key={pageNumber} className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li key={pageNumber} 
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  </div> : ""
    
  );
};

export default Pagination;

import React from "react";
import "../navbar/navbar.scss";
import images from "../../../../../assets/images/common/profile.png";
import jwt_decode from "jwt-decode";

function navbar() {
  let userName = localStorage.getItem("dataKey");
  return (
    <>
      <div className="header">
        <div className="container__nav">
          <div className="container__profile">
            <p>{JSON.parse(userName)}</p>
            <img src={images} />
          </div>
        </div>
      </div>
    </>
  );
}

export default navbar;

import React from "react";
import Error from "../../assets/images/common/error.png";
import Search from "../../assets/images/common/searchs.png";
import { NavLink } from "react-router-dom";
import "./blogerror.scss";
function blogerror() {
  return (
    <div className="container__error">
      <div className="container__404">
        <div className="container__logo">
          <img src={Error} />
          <div className="container__search">
            <img src={Search} alt="" />
          </div>
        </div>
        <div className="container__textes">
          <h1>Page Not Found</h1>
          <h5>
            We're sorry , the page you requested could not be found <br />
            Please go back to the homapage
          </h5>
          <NavLink to="/">
            {" "}
            <button>Go Home</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default blogerror;

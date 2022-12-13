import React from "react";
import "../logout/logout.scss";
import Simalogo from "../../assets/images/common/SIMA.png";
import { NavLink } from "react-router-dom";
import Quite from "../../assets/images/common/quite.png";
import Subtract from "../../assets/images/common/Subtract.png";
function logout() {
  return (
    <div className="container__logout">
      <div className="container__blue">
        <img src={Subtract} />
      </div>
      <div className="container__boxs">
        <div className="container__boxes">
          <div className="container__simalogo">
            <img src={Simalogo} />
          </div>
          <div className="container__simaall">
            <div className="container__text">
              <h2> SIMA ilə daxil ol</h2>
              <div className="container__texts">
                <h4>
                  {" "}
                  <p>1</p>SİMA mobil tətbiqini açın.
                </h4>
                <h4>
                  {" "}
                  <p>2</p> Skan et düyməsini sıxın.
                </h4>
                <h4>
                  {" "}
                  <p>3</p>QR kodu skan edərək daxil olun.
                </h4>
              </div>
            </div>
            <div className="container__quick-response">
              <NavLink to="/report">
                <img src={Quite} />
              </NavLink>
              <p>
                QR yenilənmə: <span> 02:36</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default logout;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./menu.scss";
import { Menu } from "antd";
import Burger from "../../../../../assets/images/common/close.png";
import Side from "../../../../../assets/images/common/menu.png";
import { useDispatch } from "react-redux";
import { setReportMode } from "../../../../../core/store/report-reload-slice";

function Sidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <button
        className="mobile-menu-icon"
        onClick={() => setIsMobile(!isMobile)}
      >
        {isMobile ? <img src={Burger} /> : <img src={Side} />}
      </button>
      <div
        className={isMobile ? "menu__allmobile" : "menu__all"}
        onClick={() => setIsMobile(false)}
      >
        <h6>Menu</h6>
        <Menu
          defaultSelectedKeys={["/report"]}
          onClick={({ key }) => {
            if (key == "/report") {
              dispatch(setReportMode());
            }
            if (key == "/login") {
              localStorage.removeItem("dataKey");
              localStorage.removeItem("email");
            }
            navigate(key);
          }}
          items={[
            { label: "Hesabat", key: "/report" },
            { label: "Sertifikatlar", key: "/certificate" },
            { label: "Paketlər", key: "/packages" },
            { label: "Credentials", key: "/credentials" },
            { label: "Qurumlar", key: "/organization" },
            { label: "Çıxış", key: "/login" },
          ]}
        ></Menu>
      </div>
    </>
  );
}

export default Sidebar;

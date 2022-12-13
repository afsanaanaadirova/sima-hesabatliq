import React from "react";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/left-menu/menu";

function Layout({ children }) {
  return (
    <div>
      <div className="container__layout">
        <Navbar />
        <div className="container__display">
          <div className="menu__name">
            <Sidebar />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;

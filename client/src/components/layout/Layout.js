import React from "react";
import Header from "./Header";
import "../../styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">{children}</main>
    </div>
  );
};

export default Layout;

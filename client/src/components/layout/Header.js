import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setLoginUser(user);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-2">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
          📘 StudyHub
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          <ul className="navbar-nav align-items-center gap-3">
            <li className="nav-item d-flex align-items-center text-dark">
              <UserOutlined className="me-2" />
              <span className="fw-semibold">{loginUser?.name}</span>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-danger btn-sm d-flex align-items-center"
                onClick={logoutHandler}
              >
                <LogoutOutlined className="me-1" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

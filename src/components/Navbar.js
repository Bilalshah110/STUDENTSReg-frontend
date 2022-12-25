import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg my-bg sticky-top py-2 mb-3">
      <div className="container-fluid">
        <Link
          className="navbar-brand text-secondary fw-bold me-5"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
          to="/"
        >
          STUDENTSReg
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li
              className="nav-item"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              <NavLink className="nav-link" to="/">
                STUDENTS
              </NavLink>
            </li>
            <li
              className="nav-item"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              <NavLink className="nav-link" to="/about">
                ABOUT
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;

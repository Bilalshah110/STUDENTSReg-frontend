import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className=" navbar navbar-expand-lg topNav py-2 mb-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand nav-brand-font">
          STUDENTReg
        </Link>

        <div className="navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item ">
              <NavLink
                to="/"
                className="nav-NavLink nav-li-a"
                
              >
                Students
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-NavLink nav-li-a">
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;

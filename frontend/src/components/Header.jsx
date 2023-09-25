import React from "react";
import {Link} from "react-router-dom"

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="https://sumitcoder.in/" target="_sumit">
            Sumit Singh
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link
                exact="true"
                aria-current="page"
                className="nav-link"
                to="/"
              >
                Home
              </Link>
              <Link
                exact="true"
                aria-current="page"
                className="nav-link"
                to="/add-student"
              >
                Add Student
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

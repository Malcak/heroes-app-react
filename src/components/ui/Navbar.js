import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          COMICS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink
              activeClassName="active"
              className="nav-link"
              exact
              to="/dc"
            >
              DC
            </NavLink>
            <NavLink
              activeClassName="active"
              className="nav-link"
              exact
              to="/marvel"
            >
              Marvel
            </NavLink>
            <NavLink
              activeClassName="active"
              className="nav-link"
              exact
              to="/search"
            >
              Search
            </NavLink>
            <NavLink
              activeClassName="active"
              className="nav-link"
              exact
              to="/login"
            >
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

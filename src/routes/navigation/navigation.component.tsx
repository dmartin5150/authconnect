import React, { Fragment } from "react";
import { Outlet, NavLink} from "react-router-dom";
import "./navigation.css";


const Navigation = () => {

  return (
    <Fragment>
      <nav className="nav">
          <div className="nav__ascension-logo">
            <img src="Ascension.png" alt="Ascension logo" />
          </div>

        <div className="nav__seamless-logo">
              Auth-Connect Radiology
          </div>
        <div className="nav__links-container">
          <NavLink  className="nav__link"
            style={
              ({isActive}) => (
                isActive 
                ? {
                  textDecoration: 'none',
                  color: '#1b4297'
                  }
                :{}
                )}
            to="/" end>My Tasks</NavLink>
         <NavLink  
              style={
              ({isActive}) => (
                isActive 
                ? {
                  textDecoration: 'none',
                  color: '#1b4297'
                  }
                :{}
                )
              }
          to="/Admin" className="nav__link">
            Admin
          </NavLink>
          <NavLink  
              style={
              ({isActive}) => (
                isActive 
                ? {
                  textDecoration: 'none',
                  color: '#1b4297'
                  }
                :{}
                )
              }
          to="/Metrics" className="nav__link">
            Metrics
          </NavLink>
        </div> 
      </nav>
      <Outlet />
    </Fragment>
  );
  };
export default Navigation;

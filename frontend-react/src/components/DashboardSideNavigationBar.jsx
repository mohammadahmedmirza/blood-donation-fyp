import React from "react";
import { Link } from "react-router-dom";
import house from "../images/house.png";
import dashboard from "../images/dashboard.png";
import reporting from "../images/reporting.png";
import Vector from "../images/Vector.png";
import DashLogo from "../images/dashlogo.png";
import { useNavigate } from "react-router-dom";
function DashboardSideNavigationBar() {
  const url = window.location.pathname.split("/")[2];
  const navigate = useNavigate();
  const clearToken = () => {
      localStorage.clear()
      navigate("/home")
  }
  return (
    <div className="dash-side-header">
      <div className="dash-logo">
        <img src={DashLogo} alt="..." />
        {/* Thallasemic Foundation */}
      </div>
      <ul className="nav-side-links">
        <li>
          <Link to="/">
            <img src={house} alt="..." />
            Visit Site
          </Link>
        </li>
        <li>
          <Link to="/admin/user">
            <img src={Vector} alt="..." />
            <span className={`${url === "user" ? "bordered" : ""} `}>
              Users
            </span>
          </Link>
        </li>
        <li>
          <Link to="/admin/requests">
            <img src={dashboard} alt="..." />
            <span className={`${url === "requests" ? "bordered" : ""} `}>
              Requests
            </span>
          </Link>
        </li>
        <li>
          <Link to="/admin/events">
            <img src={dashboard} alt="..." />

            <span className={`${url === "events" ? "bordered" : ""} `}>
              Events
            </span>
          </Link>
        </li>
        {/* <li>
          <Link to="/admin/services">
            <img src={dashboard} alt="..." />

            <span className={`${url === "services" ? "bordered" : ""} `}>
              services
            </span>
          </Link>
        </li> */}
        
        <li>
          <Link onClick={clearToken}> 
            <img src={reporting} alt="..." />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default DashboardSideNavigationBar;

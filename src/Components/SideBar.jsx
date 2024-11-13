import React from "react";
import { NavLink } from "react-router-dom"; // Use NavLink instead of Link
import "../Styles/Sidebar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            activeClassName="active" // Automatically adds the "active" class
          >
            <i className="fas fa-home"></i> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" activeClassName="active">
            <i className="fas fa-user"></i> Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/categories" activeClassName="active">
            <i className="fas fa-list"></i> Categories
          </NavLink>
        </li>
        <li>
          <NavLink to="/addproduct" activeClassName="active">
            <i className="fas fa-box"></i> Products
          </NavLink>
          <li>
          <NavLink to="/add-store" activeClassName="active">
            <i className="fas fa-box"></i> Store
          </NavLink>
        </li>
        </li>
        <li>
          <NavLink to="/add-invoices" activeClassName="active">
            <i className="fas fa-file-invoice"></i> Invoices
          </NavLink>
        </li>
        <li>
          <NavLink to="/pending-invoices" activeClassName="active">
            <i className="fas fa-file-invoice"></i> Pending Invoices
          </NavLink>
        </li>
        <li>
          <NavLink to="/view-invoices" activeClassName="active">
            <i className="fas fa-file-invoice"></i> Invoices view
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

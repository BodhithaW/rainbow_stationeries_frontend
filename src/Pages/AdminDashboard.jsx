import React from "react";
import "../Styles/page.css";
import Sidebar from "../Components/SideBar";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="summary">
        <div className="card categories">
          <h3>90</h3>
          <p>Categories</p>
        </div>
        <div className="card invoices">
          <h3>50</h3>
          <p>Invoices</p>
        </div>
        <div className="card active-products">
          <h3>25</h3>
          <p>Active Products</p>
        </div>
        <div className="card inactive-products">
          <h3>5</h3>
          <p>Inactive Products</p>
        </div>
      </div>
      <div className="reports">
        <div className="report product-report">Product Report</div>
        <div className="report income-report">Monthly Income Report</div>
        <div className="report custom-report">Custom Report</div>
      </div>
    </div>
  );
};

export default Dashboard;

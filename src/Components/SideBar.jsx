// import React from "react";
// import { Link } from "react-router-dom";
// import "./Sidebar.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <h2>Admin Dashboard</h2>
//       <ul>
//         <li>
//           <Link to="/dashboard" className="active">
//             <i className="fas fa-home"></i> Dashboard
//           </Link>
//         </li>
//         <li>
//           <Link to="/register">
//             <i className="fas fa-user"></i> Users
//           </Link>
//         </li>
//         <li>
//           <Link to="/categories">
//             <i className="fas fa-list"></i> Categories
//           </Link>
//         </li>
//         <li>
//           <Link to="/addproduct">
//             <i className="fas fa-box"></i> Products
//           </Link>
//         </li>
//         <li>
//           <Link to="/invoices">
//             <i className="fas fa-file-invoice"></i> Invoices
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <Link to="/dashboard" className="active">
            <i className="fas fa-home"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/register">
            <i className="fas fa-user"></i> Users
          </Link>
        </li>
        <li>
          <Link to="/categories">
            <i className="fas fa-list"></i> Categories
          </Link>
        </li>
        <li>
          <Link to="/addproduct">
            <i className="fas fa-box"></i> Products
          </Link>
        </li>
        <li>
          <Link to="/invoices">
            <i className="fas fa-file-invoice"></i> Invoices
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

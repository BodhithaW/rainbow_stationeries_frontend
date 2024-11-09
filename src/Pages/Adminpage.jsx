// // AdminPage.js
// import React from "react";

// const AdminPage = () => {
//   return (
//     <div>
//       <nav className="navbar">
//         <div className="navbar-brand">Admin Dashboard</div>
//         <div className="navbar-links">
//           <a href="/register">Users</a>
//           <a href="/">Orders</a>
//         </div>
//       </nav>

//       <h1>Admin Dashboard</h1>
//       <h2>Hi, Admin</h2>
//       {/* Add more admin-specific features here */}
//     </div>
//   );
// };

// export default AdminPage;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const AdminPage = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="sidebar bg-dark text-white"
        style={{ width: "250px", height: "100vh", position: "fixed" }}
      >
        <h2 className="text-center py-3">Admin Dashboard</h2>
        <ul className="list-unstyled">
          <li>
            <a className="text-white p-3 d-block" href="/register">
              User Add
            </a>
          </li>
          <li>
            <a className="text-white p-3 d-block" href="/dashboard">
              Dashboard
            </a>
          </li>
          <li>
            <a className="text-white p-3 d-block" href="/settings">
              Settings
            </a>
          </li>
          <li>
            <a className="text-white p-3 d-block" href="/logout">
              Logout
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div
        className="content"
        style={{
          marginLeft: "250px",
          padding: "20px",
          width: "calc(100% - 250px)",
        }}
      >
        <h2>Hi, Admin</h2>
        <p>Welcome to the admin dashboard!</p>
        {/* Add more admin-specific features here */}
      </div>
    </div>
  );
};

export default AdminPage;

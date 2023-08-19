import React from "react";
import "./admin-dashboard.css";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <main className="dashboard-main">
      <h1>Admin DashBoard</h1>
      <Link to="/admin/products">
        <button className="dashboard-btn">Products</button>
      </Link>
      <Link to="/admin/users">
        <button className="dashboard-btn">Users</button>
      </Link>
      <Link to="/admin/orders">
        <button className="dashboard-btn">Orders</button>
      </Link>
    </main>
  );
};

export default AdminDashboard;

import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const history = useNavigate();
  return (
    <div className="card text-center">
      <div className="card-header">Dashboard</div>
      <div className="card-body">
        <h5 className="card-title">
          Welcome <span>{localStorage.getItem("username")}</span>
        </h5>
        <p className="card-text">Email: {localStorage.getItem("useremail")}</p>
        <a
          onClick={() => {
            history("/login");
            localStorage.clear();
          }}
          className="btn btn-primary"
        >
          Logout
        </a>
      </div>
      <div className="card-footer text-muted">@copyright:</div>
    </div>
  );
};

export default Dashboard;

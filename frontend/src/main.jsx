import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />``
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

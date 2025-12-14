import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./Login.css"; // reuse styles

export const AdminLogin = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (adminId === "admin" && password === "admin123") {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleAdminLogin} className="login-form">
        <h2>Admin Login</h2>

        <input
          type="text"
          placeholder="Admin ID"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login as Admin</button>
      </form>
    </div>
  );
};

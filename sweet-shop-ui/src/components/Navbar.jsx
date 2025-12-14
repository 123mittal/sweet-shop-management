import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();

  const hasLoggedIn = localStorage.getItem("hasLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("hasLoggedIn");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="brand-logo">
        <Link to="/">Sweet Shop</Link>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        {/* SHOW Admin only BEFORE login */}
        {!hasLoggedIn && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}

        {!hasLoggedIn ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

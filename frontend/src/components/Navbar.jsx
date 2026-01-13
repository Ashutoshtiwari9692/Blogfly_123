import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📝</span>
          BlogHub
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          {isLoggedIn && (
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          )}
          {!isLoggedIn ? (
            <div className="nav-buttons">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link signup-btn">
                Sign Up
              </Link>
            </div>
          ) : (
            <button onClick={handleLogout} className="nav-link logout-btn">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

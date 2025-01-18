import React from 'react';
import './index.css';
import decodeToken from '../../utils/decodeAccessToken';

const Navbar = () => {
  const token = decodeToken();
  const isAuthenticated = !!token;

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Logo</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">Sobre</a></li>
        <li><a href="/services">Serviços</a></li>
        <li><a href="/contact">Contato</a></li>
      </ul>
      <div className="navbar-menu">
        {isAuthenticated ? (
          <span className="welcome-text">Bem-vindo, {token.username}!</span>
        ) : (
          <a href="/login" className="login-btn">Login</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

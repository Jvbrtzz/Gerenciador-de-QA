import React from 'react';
import './index.css';
import decodeToken from '../../utils/decodeAccessToken';
import deleteToken from '../../utils/logout';

const Navbar = () => {
  const token = decodeToken();
  const isAuthenticated = !!token;

  const [isMenuActive, setIsMenuActive] = React.useState(false);

  function handleMouseOver() {
    setIsMenuActive(true);
  }

  function handleMouseLeave() {
    setIsMenuActive(false);
  }

return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Logo</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">Sobre</a></li>
        <li><a href="/services">Converse com a nossa IA</a></li>
        <li><a href="/users">Usuários</a></li>
      </ul>
      <div className="navbar-menu">
        {isAuthenticated ? (
          <div
            className={`menu ${isMenuActive ? 'menu-active' : ''}`}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            Menu
            <div className="menu-content">
              <span className="welcome-text">Bem-vindo,<br /> {token.username}!</span>
              <button className="logout-btn" onClick={deleteToken}>Logout</button>
            </div>
          </div>
        ) : (
          <a href="/login" className="login-btn">Login</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

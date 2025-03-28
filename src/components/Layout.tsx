import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/layout.css';

export default function Layout() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="logo"><a href="/">GitHub Dashboard</a></h1>
        <div className="header-right">
          <span className="page-name">
            {location.pathname.includes('/repo') ? 'Repository' :
             location.pathname.includes('/user') ? 'User Profile' :
             location.pathname.includes('/issues') ? 'Issues' : 'Search'}
          </span>
          <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

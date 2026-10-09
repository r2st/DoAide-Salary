import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/calculator', label: 'Calculator' },
    { to: '/compare', label: 'Compare Offers' },
    { to: '/hike', label: 'Hike Calculator' },
    { to: '/blog', label: 'Blog' },
  ];

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <span className="brand-accent">Salary</span>Decode
        </Link>
        <button
          className={`hamburger ${menuOpen ? 'hamburger-open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
        <ul className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={location.pathname === to ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

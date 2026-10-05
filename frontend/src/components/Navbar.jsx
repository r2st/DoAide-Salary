import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <span className="brand-accent">Salary</span>Decode
        </Link>
        <ul className="nav-links">
          <li><Link to="/calculator" className={location.pathname === '/calculator' ? 'active' : ''}>Calculator</Link></li>
          <li><Link to="/compare" className={location.pathname === '/compare' ? 'active' : ''}>Compare Offers</Link></li>
        </ul>
      </div>
    </nav>
  );
}

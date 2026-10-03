import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <span className="do">Do</span>Aide Salary
        </Link>
        <ul className="nav-links">
          <li><Link to="/calculator" className={location.pathname === '/calculator' ? 'active' : ''}>Calculator</Link></li>
          <li><Link to="/compare" className={location.pathname === '/compare' ? 'active' : ''}>Compare</Link></li>
          <li><Link to="/hra" className={location.pathname === '/hra' ? 'active' : ''}>HRA</Link></li>
          <li><Link to="/blog" className={location.pathname.startsWith('/blog') ? 'active' : ''}>Blog</Link></li>
        </ul>
      </div>
    </nav>
  );
}

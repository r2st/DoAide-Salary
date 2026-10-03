import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-links">
          <Link to="/calculator">CTC Calculator</Link>
          <Link to="/compare">Tax Comparator</Link>
          <Link to="/hra">HRA Calculator</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/embed">Embed</Link>
          <a href="https://doaide.com" target="_blank" rel="noopener noreferrer">DoAide Suite</a>
        </div>
        <p>&copy; {new Date().getFullYear()} DoAide. Free salary calculator for Indian professionals.</p>
        <p style={{ marginTop: '8px', fontSize: '12px' }}>
          Calculations are estimates. Consult a CA for tax filing.
        </p>
      </div>
    </footer>
  );
}

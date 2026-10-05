import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-links">
          <Link to="/calculator">CTC Calculator</Link>
          <Link to="/compare">Offer Comparator</Link>
          <a href="https://doaide.com" target="_blank" rel="noopener noreferrer">DoAide Suite</a>
        </div>
        <p>&copy; {new Date().getFullYear()} DoAide. Free salary calculator for Indian professionals.</p>
        <p style={{ marginTop: '8px', fontSize: '12px' }}>
          Calculations are estimates based on FY 2025-26 tax slabs. Consult a CA for tax filing.
        </p>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-col">
            <h4 className="footer-heading">Tools</h4>
            <Link to="/calculator">CTC Calculator</Link>
            <Link to="/compare">Offer Comparator</Link>
            <Link to="/hike">Hike Calculator</Link>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Resources</h4>
            <Link to="/blog">Blog</Link>
            <Link to="/blog/old-vs-new-tax-regime">Tax Regime Guide</Link>
            <Link to="/blog/hra-exemption-guide">HRA Guide</Link>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">About</h4>
            <a href="https://doaide.com" target="_blank" rel="noopener noreferrer">DoAide Suite</a>
            <span className="footer-text">Free for all Indian professionals</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} DoAide. Free salary calculator for Indian professionals.</p>
          <p className="footer-disclaimer">
            Calculations are estimates based on FY 2026-27 tax slabs. Consult a CA for tax filing.
          </p>
        </div>
      </div>
    </footer>
  );
}

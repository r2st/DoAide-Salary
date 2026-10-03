import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <>
      <SEO path="/" />
      <section className="hero">
        <h1>Calculate Your <span className="gold-text">Take-Home Salary</span> in 10 Seconds</h1>
        <p>Free CTC-to-in-hand calculator for Indian professionals. Compare old vs new tax regime, calculate HRA exemption, and discover tax-saving opportunities.</p>
        <Link to="/calculator" className="btn btn-primary" style={{ fontSize: '18px', padding: '16px 40px' }}>
          Calculate Now
        </Link>
      </section>

      <div className="features">
        <Link to="/calculator" className="feature-card" style={{ textDecoration: 'none' }}>
          <div className="feature-icon">&#8377;</div>
          <h3>CTC Breakdown</h3>
          <p>See your full salary structure — basic, HRA, PF, gratuity, special allowances, and take-home with one click.</p>
        </Link>
        <Link to="/compare" className="feature-card" style={{ textDecoration: 'none' }}>
          <div className="feature-icon">&#8596;</div>
          <h3>Old vs New Regime</h3>
          <p>Side-by-side comparison of both tax regimes. Find which one saves you more money.</p>
        </Link>
        <Link to="/hra" className="feature-card" style={{ textDecoration: 'none' }}>
          <div className="feature-icon">&#127968;</div>
          <h3>HRA Exemption</h3>
          <p>Calculate your HRA tax exemption based on rent paid, city, and basic salary.</p>
        </Link>
        <Link to="/calculator" className="feature-card" style={{ textDecoration: 'none' }}>
          <div className="feature-icon">&#129302;</div>
          <h3>AI Tax Tips</h3>
          <p>Get personalized tax-saving recommendations powered by AI. Maximize your savings.</p>
        </Link>
      </div>

      <div className="container" style={{ textAlign: 'center', paddingBottom: '60px' }}>
        <h2 className="section-title">Trusted by <span className="gold-text">10,000+</span> Indian Professionals</h2>
        <div className="grid-3" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--gold)' }}>100%</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Free Forever</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--gold)' }}>FY 2024-25</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Updated Tax Slabs</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--gold)' }}>Both</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Tax Regimes</div>
          </div>
        </div>
      </div>
    </>
  );
}

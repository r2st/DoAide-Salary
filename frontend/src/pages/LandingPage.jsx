import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-badge">Free for All Indian Professionals</div>
        <h1>Calculate Your <span className="accent-text">In-Hand Salary</span> from CTC in Seconds</h1>
        <p>
          Accurate CTC-to-take-home calculator with full breakdown — basic, HRA, PF, gratuity,
          income tax under both old and new regimes. No signup required.
        </p>
        <div className="hero-actions">
          <Link to="/calculator" className="btn btn-primary btn-lg">
            Calculate Now
          </Link>
          <Link to="/compare" className="btn btn-secondary btn-lg">
            Compare Offers
          </Link>
        </div>
      </section>

      <section className="features">
        <Link to="/calculator" className="feature-card" style={{ textDecoration: 'none' }}>
          <div className="feature-icon">&#8377;</div>
          <h3>CTC Breakdown</h3>
          <p>See your full salary structure — basic, HRA, PF, gratuity, special allowances, and monthly take-home with one click.</p>
        </Link>
        <Link to="/calculator" className="feature-card" style={{ textDecoration: 'none' }}>
          <div className="feature-icon">&#8596;</div>
          <h3>Old vs New Tax Regime</h3>
          <p>Side-by-side comparison of both tax regimes with slab-by-slab breakdown. Instantly see which saves you more.</p>
        </Link>
        <Link to="/compare" className="feature-card" style={{ textDecoration: 'none' }}>
          <div className="feature-icon">&#128200;</div>
          <h3>Offer Letter Comparator</h3>
          <p>Comparing multiple job offers? Enter each CTC and see real in-hand salary side by side. Pick the best offer.</p>
        </Link>
        <Link to="/calculator" className="feature-card" style={{ textDecoration: 'none' }}>
          <div className="feature-icon">&#128274;</div>
          <h3>No Login Required</h3>
          <p>100% free, no signup, no data stored. All calculations happen in your browser. Your salary data stays private.</p>
        </Link>
      </section>

      <section className="stats-section">
        <h2 className="section-title">Built for <span className="accent-text">Indian Professionals</span></h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">FY 2025-26</div>
            <div className="stat-label">Updated Tax Slabs</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">Both</div>
            <div className="stat-label">Tax Regimes Compared</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">100%</div>
            <div className="stat-label">Free Forever</div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="section-title">How It <span className="accent-text">Works</span></h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Enter Your CTC</h3>
            <p>Type in your annual CTC from the offer letter or payslip.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Select City Type</h3>
            <p>Choose Metro or Non-Metro to calculate correct HRA.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Get Full Breakdown</h3>
            <p>See monthly and yearly salary, tax under both regimes, and which regime is better for you.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-card">
          <h2>Ready to Calculate Your Take-Home Salary?</h2>
          <p>Join thousands of Indian professionals who use SalaryDecode to understand their real earnings.</p>
          <Link to="/calculator" className="btn btn-primary btn-lg">
            Start Calculating
          </Link>
        </div>
      </section>
    </>
  );
}

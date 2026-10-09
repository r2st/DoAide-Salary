import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function LandingPage() {
  return (
    <>
      <SEO
        path="/"
        description="Free CTC to take-home salary calculator for Indian professionals. Compare old vs new tax regime FY 2026-27, calculate HRA, salary hike impact, and compare job offers."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'SalaryDecode',
          url: 'https://salary.doaide.com',
          description: 'Free CTC to take-home salary calculator for Indian professionals',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://salary.doaide.com/calculator?ctc={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }}
      />
      <section className="hero">
        <div className="hero-badge">Updated for FY 2026-27 Tax Slabs</div>
        <h1>Calculate Your <span className="accent-text">In-Hand Salary</span> from CTC in Seconds</h1>
        <p>
          Accurate CTC-to-take-home calculator with full breakdown — basic, HRA, PF, gratuity,
          income tax (with surcharge) under both old and new regimes. No signup required.
        </p>
        <div className="hero-actions">
          <Link to="/calculator" className="btn btn-primary btn-lg">
            Calculate Now
          </Link>
          <Link to="/hike" className="btn btn-secondary btn-lg">
            Hike Calculator
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
          <p>Side-by-side comparison of both tax regimes with slab-by-slab breakdown including surcharge for high incomes.</p>
        </Link>
        <Link to="/hike" className="feature-card" style={{ textDecoration: 'none' }}>
          <div className="feature-icon">&#128200;</div>
          <h3>Salary Hike Calculator</h3>
          <p>Got a raise? See how much of your CTC hike actually reaches your bank account after tax and deductions.</p>
        </Link>
        <Link to="/compare" className="feature-card" style={{ textDecoration: 'none' }}>
          <div className="feature-icon">&#128203;</div>
          <h3>Offer Letter Comparator</h3>
          <p>Comparing multiple job offers? Enter each CTC and see real in-hand salary side by side. Pick the best offer.</p>
        </Link>
      </section>

      <section className="stats-section">
        <h2 className="section-title">Built for <span className="accent-text">Indian Professionals</span></h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">FY 2026-27</div>
            <div className="stat-label">Updated Tax Slabs</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">31</div>
            <div className="stat-label">States & UTs Covered</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">100%</div>
            <div className="stat-label">Free Forever</div>
          </div>
        </div>
      </section>

      <section className="tools-section">
        <h2 className="section-title">Free <span className="accent-text">Salary Tools</span></h2>
        <div className="tools-grid">
          <Link to="/calculator" className="tool-card" style={{ textDecoration: 'none' }}>
            <div className="tool-icon">&#8377;</div>
            <div className="tool-info">
              <h3>CTC to In-Hand Calculator</h3>
              <p>Full salary breakdown with tax under both regimes</p>
            </div>
            <span className="tool-arrow">&rarr;</span>
          </Link>
          <Link to="/hike" className="tool-card" style={{ textDecoration: 'none' }}>
            <div className="tool-icon">&#128200;</div>
            <div className="tool-info">
              <h3>Salary Hike Calculator</h3>
              <p>See real take-home increase after a salary raise</p>
            </div>
            <span className="tool-arrow">&rarr;</span>
          </Link>
          <Link to="/compare" className="tool-card" style={{ textDecoration: 'none' }}>
            <div className="tool-icon">&#128203;</div>
            <div className="tool-info">
              <h3>Offer Letter Comparator</h3>
              <p>Compare 2-3 job offers side by side</p>
            </div>
            <span className="tool-arrow">&rarr;</span>
          </Link>
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
            <h3>Select Your State</h3>
            <p>Choose your state for accurate professional tax and city type for HRA.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Get Full Breakdown</h3>
            <p>See monthly and yearly salary, tax under both regimes, surcharge, and which regime is better.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-card">
          <h2>Ready to Calculate Your Take-Home Salary?</h2>
          <p>Join thousands of Indian professionals who use SalaryDecode to understand their real earnings.</p>
          <div className="hero-actions">
            <Link to="/calculator" className="btn btn-primary btn-lg">
              Start Calculating
            </Link>
            <Link to="/blog" className="btn btn-secondary btn-lg">
              Read Guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

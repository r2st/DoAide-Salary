import { useState } from 'react';
import { calculateSalary, formatCurrency } from '../api';
import SEO from '../components/SEO';

export default function Embed() {
  const [isEmbedView] = useState(new URLSearchParams(window.location.search).get('widget') === 'true');

  if (isEmbedView) {
    return <EmbedWidget />;
  }

  return (
    <div className="page">
      <SEO
        title="Embed Calculator"
        description="Embed the DoAide Salary Calculator on your website. Free widget for salary comparison sites, HR blogs, and job portals."
        path="/embed"
      />
      <h1 className="page-title">Embed <span className="gold-text">Calculator</span></h1>
      <p className="page-subtitle">Add the salary calculator to your website for free</p>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto 24px' }}>
        <h3 style={{ marginBottom: '16px' }}>Copy this code to embed:</h3>
        <div style={{
          background: 'var(--bg-input)',
          borderRadius: '8px',
          padding: '16px',
          fontFamily: 'monospace',
          fontSize: '14px',
          overflowX: 'auto',
          wordBreak: 'break-all',
        }}>
          {`<iframe src="https://salary.doaide.com/embed?widget=true" width="100%" height="600" frameborder="0" style="border-radius:12px;border:1px solid #2a2a2a;"></iframe>`}
        </div>
        <button
          className="btn btn-primary"
          style={{ marginTop: '16px' }}
          onClick={() => {
            navigator.clipboard.writeText(`<iframe src="https://salary.doaide.com/embed?widget=true" width="100%" height="600" frameborder="0" style="border-radius:12px;border:1px solid #2a2a2a;"></iframe>`);
          }}
        >
          Copy Embed Code
        </button>
      </div>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h3 style={{ marginBottom: '16px' }}>Preview</h3>
        <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
          <EmbedWidget />
        </div>
      </div>
    </div>
  );
}

function EmbedWidget() {
  const [ctc, setCtc] = useState('');
  const [regime, setRegime] = useState('new');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalc = async () => {
    if (!ctc || parseFloat(ctc) <= 0) return;
    setLoading(true);
    try {
      const res = await calculateSalary({ annual_ctc: parseFloat(ctc), tax_regime: regime });
      setResult(res);
    } catch { /* ignore */ }
    setLoading(false);
  };

  return (
    <div className="embed-container" style={{ padding: '20px', background: 'var(--bg-card)' }}>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <strong style={{ fontSize: '18px' }}>Salary Calculator</strong>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>by DoAide</span>
      </div>

      <div className="input-group">
        <label>Annual CTC</label>
        <input type="number" placeholder="e.g. 1200000" value={ctc} onChange={(e) => setCtc(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Tax Regime</label>
        <select value={regime} onChange={(e) => setRegime(e.target.value)}>
          <option value="new">New Regime</option>
          <option value="old">Old Regime</option>
        </select>
      </div>

      <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleCalc} disabled={loading}>
        {loading ? 'Calculating...' : 'Calculate'}
      </button>

      {result && (
        <div style={{ marginTop: '16px' }}>
          <div className="result-highlight">
            <div className="sublabel">Monthly Take-Home</div>
            <div className="amount">{formatCurrency(result.monthly.take_home)}</div>
          </div>
          <div className="result-row"><span className="label">Annual Take-Home</span><span className="value">{formatCurrency(result.annual_take_home)}</span></div>
          <div className="result-row"><span className="label">Monthly Tax</span><span className="value">{formatCurrency(result.monthly.income_tax)}</span></div>
          <div className="result-row"><span className="label">Monthly PF</span><span className="value">{formatCurrency(result.monthly.employee_pf)}</span></div>
          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <a href="https://salary.doaide.com/calculator" target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px' }}>
              Full calculator at salary.doaide.com
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

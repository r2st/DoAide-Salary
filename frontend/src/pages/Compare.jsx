import { useState } from 'react';
import { compareRegimes, formatCurrency } from '../api';
import ShareButtons from '../components/ShareButtons';
import SEO from '../components/SEO';

export default function Compare() {
  const [form, setForm] = useState({
    annual_ctc: '',
    basic_salary_pct: 40,
    hra_pct_of_basic: 50,
    da_pct_of_basic: 0,
    employer_pf_pct: 12,
    include_gratuity: true,
    deductions_80c: 150000,
    deductions_80d: 25000,
    other_deductions: 0,
    hra_exemption: 0,
    rent_paid_annual: 0,
    metro_city: true,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.annual_ctc || parseFloat(form.annual_ctc) <= 0) {
      setError('Please enter a valid CTC');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = { ...form, annual_ctc: parseFloat(form.annual_ctc) };
      const res = await compareRegimes(data);
      setResult(res);
    } catch {
      setError('Comparison failed. Please try again.');
    }
    setLoading(false);
  };

  const shareText = result
    ? `Tax comparison: Old regime tax ${formatCurrency(result.comparison.old_regime_tax)} vs New regime ${formatCurrency(result.comparison.new_regime_tax)}. ${result.comparison.recommended_regime === 'new' ? 'New' : 'Old'} regime saves ${formatCurrency(result.comparison.annual_savings)}/year! Compare at https://salary.doaide.com/compare`
    : '';

  return (
    <div className="page">
      <SEO
        title="Old vs New Tax Regime Comparator"
        description="Compare old and new tax regime side by side. Find which regime saves you more tax based on your CTC and deductions."
        path="/compare"
      />
      <h1 className="page-title">Tax Regime <span className="gold-text">Comparator</span></h1>
      <p className="page-subtitle">Compare old vs new regime to find which saves you more</p>

      <form onSubmit={handleSubmit}>
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="grid-3">
            <div className="input-group">
              <label>Annual CTC (INR)</label>
              <input type="number" placeholder="e.g. 1500000" value={form.annual_ctc} onChange={(e) => setForm({ ...form, annual_ctc: e.target.value })} />
            </div>
            <div className="input-group">
              <label>80C Deductions (Old Regime)</label>
              <input type="number" value={form.deductions_80c} onChange={(e) => setForm({ ...form, deductions_80c: Number(e.target.value) })} />
            </div>
            <div className="input-group">
              <label>80D Health Insurance</label>
              <input type="number" value={form.deductions_80d} onChange={(e) => setForm({ ...form, deductions_80d: Number(e.target.value) })} />
            </div>
          </div>
          <div className="grid-2">
            <div className="input-group">
              <label>HRA Exemption (Old Regime)</label>
              <input type="number" value={form.hra_exemption} onChange={(e) => setForm({ ...form, hra_exemption: Number(e.target.value) })} />
            </div>
            <div className="input-group">
              <label>Other Deductions (Old Regime)</label>
              <input type="number" value={form.other_deductions} onChange={(e) => setForm({ ...form, other_deductions: Number(e.target.value) })} />
            </div>
          </div>
          {error && <p style={{ color: 'var(--danger)', marginBottom: '12px' }}>{error}</p>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Comparing...' : 'Compare Tax Regimes'}
          </button>
        </div>
      </form>

      {result && (
        <>
          <div className="result-highlight" style={{ marginBottom: '24px' }}>
            <div className="sublabel">
              {result.comparison.recommended_regime === 'new' ? 'New' : 'Old'} Regime Saves You
            </div>
            <div className="amount">{formatCurrency(result.comparison.annual_savings)}/year</div>
            <div className="sublabel">({formatCurrency(result.comparison.monthly_savings)}/month)</div>
          </div>

          <div className="comparison-grid">
            <div className={`regime-card regime-old ${result.comparison.recommended_regime === 'old' ? 'regime-winner' : ''}`}>
              <h3 style={{ marginBottom: '16px' }}>
                Old Regime
                {result.comparison.recommended_regime === 'old' && <span className="tag tag-low" style={{ marginLeft: '8px' }}>Recommended</span>}
              </h3>
              <div className="result-row"><span className="label">Gross Salary</span><span className="value">{formatCurrency(result.old_regime.gross_salary)}</span></div>
              <div className="result-row"><span className="label">Income Tax</span><span className="value" style={{ color: 'var(--danger)' }}>{formatCurrency(result.old_regime.deductions.income_tax)}</span></div>
              <div className="result-row"><span className="label">Employee PF</span><span className="value">{formatCurrency(result.old_regime.deductions.employee_pf)}</span></div>
              <div className="result-row"><span className="label">Prof. Tax</span><span className="value">{formatCurrency(result.old_regime.deductions.professional_tax)}</span></div>
              <div className="result-highlight" style={{ marginTop: '16px' }}>
                <div className="sublabel">Monthly Take-Home</div>
                <div className="amount" style={{ fontSize: '24px' }}>{formatCurrency(result.old_regime.monthly.take_home)}</div>
              </div>
            </div>

            <div className={`regime-card regime-new ${result.comparison.recommended_regime === 'new' ? 'regime-winner' : ''}`}>
              <h3 style={{ marginBottom: '16px' }}>
                New Regime
                {result.comparison.recommended_regime === 'new' && <span className="tag tag-low" style={{ marginLeft: '8px' }}>Recommended</span>}
              </h3>
              <div className="result-row"><span className="label">Gross Salary</span><span className="value">{formatCurrency(result.new_regime.gross_salary)}</span></div>
              <div className="result-row"><span className="label">Income Tax</span><span className="value" style={{ color: 'var(--danger)' }}>{formatCurrency(result.new_regime.deductions.income_tax)}</span></div>
              <div className="result-row"><span className="label">Employee PF</span><span className="value">{formatCurrency(result.new_regime.deductions.employee_pf)}</span></div>
              <div className="result-row"><span className="label">Prof. Tax</span><span className="value">{formatCurrency(result.new_regime.deductions.professional_tax)}</span></div>
              <div className="result-highlight" style={{ marginTop: '16px' }}>
                <div className="sublabel">Monthly Take-Home</div>
                <div className="amount" style={{ fontSize: '24px' }}>{formatCurrency(result.new_regime.monthly.take_home)}</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <ShareButtons text={shareText} />
          </div>
        </>
      )}
    </div>
  );
}

import { useState } from 'react';
import { calculateHRA, formatCurrency } from '../api';
import ShareButtons from '../components/ShareButtons';
import SEO from '../components/SEO';

export default function HRA() {
  const [form, setForm] = useState({
    basic_salary_annual: '',
    da_annual: 0,
    hra_received_annual: '',
    rent_paid_annual: '',
    metro_city: true,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.basic_salary_annual || !form.hra_received_annual || !form.rent_paid_annual) {
      setError('Please fill all required fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = {
        basic_salary_annual: parseFloat(form.basic_salary_annual),
        da_annual: parseFloat(form.da_annual) || 0,
        hra_received_annual: parseFloat(form.hra_received_annual),
        rent_paid_annual: parseFloat(form.rent_paid_annual),
        metro_city: form.metro_city,
      };
      const res = await calculateHRA(data);
      setResult(res);
    } catch {
      setError('Calculation failed. Please try again.');
    }
    setLoading(false);
  };

  const shareText = result
    ? `My HRA exemption is ${formatCurrency(result.hra_exemption)} out of ${formatCurrency(result.actual_hra_received)} HRA received. Calculate yours at https://salary.doaide.com/hra`
    : '';

  return (
    <div className="page">
      <SEO
        title="HRA Exemption Calculator"
        description="Calculate your HRA tax exemption. Enter basic salary, rent paid, and city to find out how much HRA is tax-free."
        path="/hra"
      />
      <h1 className="page-title">HRA <span className="gold-text">Calculator</span></h1>
      <p className="page-subtitle">Calculate your House Rent Allowance tax exemption</p>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="input-group">
              <label>Annual Basic Salary (INR)</label>
              <input type="number" placeholder="e.g. 480000" value={form.basic_salary_annual} onChange={(e) => setForm({ ...form, basic_salary_annual: e.target.value })} />
            </div>
            <div className="input-group">
              <label>Annual DA (INR)</label>
              <input type="number" value={form.da_annual} onChange={(e) => setForm({ ...form, da_annual: e.target.value })} />
            </div>
            <div className="input-group">
              <label>Annual HRA Received (INR)</label>
              <input type="number" placeholder="e.g. 240000" value={form.hra_received_annual} onChange={(e) => setForm({ ...form, hra_received_annual: e.target.value })} />
            </div>
            <div className="input-group">
              <label>Annual Rent Paid (INR)</label>
              <input type="number" placeholder="e.g. 300000" value={form.rent_paid_annual} onChange={(e) => setForm({ ...form, rent_paid_annual: e.target.value })} />
            </div>
            <div className="input-group">
              <label>City Type</label>
              <select value={form.metro_city ? 'metro' : 'non-metro'} onChange={(e) => setForm({ ...form, metro_city: e.target.value === 'metro' })}>
                <option value="metro">Metro (Delhi, Mumbai, Chennai, Kolkata)</option>
                <option value="non-metro">Non-Metro</option>
              </select>
            </div>
            {error && <p style={{ color: 'var(--danger)', marginBottom: '12px' }}>{error}</p>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Calculating...' : 'Calculate HRA Exemption'}
            </button>
          </div>
        </form>

        {result && (
          <div>
            <div className="result-highlight">
              <div className="sublabel">HRA Exempt from Tax</div>
              <div className="amount">{formatCurrency(result.hra_exemption)}</div>
            </div>

            <div className="card" style={{ marginBottom: '16px' }}>
              <h3 style={{ marginBottom: '16px' }}>HRA Exemption Calculation</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                HRA exemption is the minimum of the three values below:
              </p>
              <div className="result-row">
                <span className="label">1. Actual HRA Received</span>
                <span className="value">{formatCurrency(result.actual_hra_received)}</span>
              </div>
              <div className="result-row">
                <span className="label">2. {result.city_type === 'Metro' ? '50%' : '40%'} of Basic + DA</span>
                <span className="value">{formatCurrency(result.percent_of_basic_da)}</span>
              </div>
              <div className="result-row">
                <span className="label">3. Rent - 10% of Basic + DA</span>
                <span className="value">{formatCurrency(result.rent_minus_10pct_basic)}</span>
              </div>
              <div className="result-row" style={{ borderTop: '2px solid var(--gold)', paddingTop: '12px', marginTop: '8px' }}>
                <span className="label" style={{ fontWeight: '700' }}>HRA Exemption (Minimum)</span>
                <span className="value" style={{ color: 'var(--success)' }}>{formatCurrency(result.hra_exemption)}</span>
              </div>
              <div className="result-row">
                <span className="label">Taxable HRA</span>
                <span className="value" style={{ color: 'var(--danger)' }}>{formatCurrency(result.taxable_hra)}</span>
              </div>
            </div>

            <ShareButtons text={shareText} />
          </div>
        )}
      </div>
    </div>
  );
}

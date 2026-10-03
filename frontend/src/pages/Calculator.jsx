import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { calculateSalary, formatCurrency } from '../api';
import ShareButtons from '../components/ShareButtons';
import SEO from '../components/SEO';

const COLORS = ['#F0B429', '#60a5fa', '#34d399', '#f87171', '#a78bfa', '#fb923c'];

export default function Calculator() {
  const [form, setForm] = useState({
    annual_ctc: '',
    basic_salary_pct: 40,
    hra_pct_of_basic: 50,
    da_pct_of_basic: 0,
    employer_pf_pct: 12,
    include_gratuity: true,
    tax_regime: 'new',
    deductions_80c: 0,
    deductions_80d: 0,
    other_deductions: 0,
    hra_exemption: 0,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.annual_ctc || parseFloat(form.annual_ctc) <= 0) {
      setError('Please enter a valid CTC amount');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = { ...form, annual_ctc: parseFloat(form.annual_ctc) };
      const res = await calculateSalary(data);
      setResult(res);
    } catch {
      setError('Calculation failed. Please try again.');
    }
    setLoading(false);
  };

  const pieData = result ? [
    { name: 'Basic', value: result.components.basic_salary },
    { name: 'HRA', value: result.components.hra },
    { name: 'Special Allowance', value: result.components.special_allowance },
    { name: 'PF (Employer)', value: result.components.employer_pf },
    { name: 'Gratuity', value: result.components.gratuity },
    ...(result.components.dearness_allowance > 0 ? [{ name: 'DA', value: result.components.dearness_allowance }] : []),
  ].filter(d => d.value > 0) : [];

  const shareText = result
    ? `My CTC is ${formatCurrency(result.annual_ctc)} and my monthly take-home is ${formatCurrency(result.monthly.take_home)}. Calculate yours at https://salary.doaide.com`
    : '';

  return (
    <div className="page">
      <SEO
        title="CTC Calculator"
        description="Calculate your take-home salary from CTC. Full breakdown of basic, HRA, PF, gratuity, tax, and in-hand salary."
        path="/calculator"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'CTC to Take-Home Salary Calculator',
          url: 'https://salary.doaide.com/calculator',
          description: 'Free CTC to take-home salary calculator with full salary breakdown for Indian professionals.',
          applicationCategory: 'FinanceApplication',
        }}
      />
      <h1 className="page-title">CTC <span className="gold-text">Calculator</span></h1>
      <p className="page-subtitle">Enter your CTC to see your complete salary breakdown</p>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="input-group">
              <label>Annual CTC (INR)</label>
              <input
                type="number"
                placeholder="e.g. 1200000"
                value={form.annual_ctc}
                onChange={(e) => setForm({ ...form, annual_ctc: e.target.value })}
              />
            </div>

            <div className="grid-2">
              <div className="input-group">
                <label>Basic Salary %</label>
                <input type="number" value={form.basic_salary_pct} onChange={(e) => setForm({ ...form, basic_salary_pct: Number(e.target.value) })} />
              </div>
              <div className="input-group">
                <label>HRA % of Basic</label>
                <input type="number" value={form.hra_pct_of_basic} onChange={(e) => setForm({ ...form, hra_pct_of_basic: Number(e.target.value) })} />
              </div>
            </div>

            <div className="grid-2">
              <div className="input-group">
                <label>DA % of Basic</label>
                <input type="number" value={form.da_pct_of_basic} onChange={(e) => setForm({ ...form, da_pct_of_basic: Number(e.target.value) })} />
              </div>
              <div className="input-group">
                <label>Employer PF %</label>
                <input type="number" value={form.employer_pf_pct} onChange={(e) => setForm({ ...form, employer_pf_pct: Number(e.target.value) })} />
              </div>
            </div>

            <div className="input-group">
              <label>Tax Regime</label>
              <select value={form.tax_regime} onChange={(e) => setForm({ ...form, tax_regime: e.target.value })}>
                <option value="new">New Regime (FY 2024-25)</option>
                <option value="old">Old Regime</option>
              </select>
            </div>

            {form.tax_regime === 'old' && (
              <div className="grid-2">
                <div className="input-group">
                  <label>80C Deductions</label>
                  <input type="number" value={form.deductions_80c} onChange={(e) => setForm({ ...form, deductions_80c: Number(e.target.value) })} />
                </div>
                <div className="input-group">
                  <label>80D (Health Insurance)</label>
                  <input type="number" value={form.deductions_80d} onChange={(e) => setForm({ ...form, deductions_80d: Number(e.target.value) })} />
                </div>
              </div>
            )}

            <div className="checkbox-group">
              <input type="checkbox" checked={form.include_gratuity} onChange={(e) => setForm({ ...form, include_gratuity: e.target.checked })} />
              <label>Include Gratuity in CTC</label>
            </div>

            {error && <p style={{ color: 'var(--danger)', marginBottom: '12px' }}>{error}</p>}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Calculating...' : 'Calculate Take-Home'}
            </button>
          </div>
        </form>

        {result && (
          <div>
            <div className="result-highlight">
              <div className="sublabel">Monthly Take-Home</div>
              <div className="amount">{formatCurrency(result.monthly.take_home)}</div>
              <div className="sublabel">Annual: {formatCurrency(result.annual_take_home)}</div>
            </div>

            <div className="card" style={{ marginBottom: '16px' }}>
              <h3 style={{ marginBottom: '16px' }}>Salary Components (Annual)</h3>
              <div className="result-row"><span className="label">Basic Salary</span><span className="value">{formatCurrency(result.components.basic_salary)}</span></div>
              <div className="result-row"><span className="label">HRA</span><span className="value">{formatCurrency(result.components.hra)}</span></div>
              {result.components.dearness_allowance > 0 && <div className="result-row"><span className="label">Dearness Allowance</span><span className="value">{formatCurrency(result.components.dearness_allowance)}</span></div>}
              <div className="result-row"><span className="label">Special Allowance</span><span className="value">{formatCurrency(result.components.special_allowance)}</span></div>
              <div className="result-row"><span className="label">Employer PF</span><span className="value">{formatCurrency(result.components.employer_pf)}</span></div>
              {result.components.gratuity > 0 && <div className="result-row"><span className="label">Gratuity</span><span className="value">{formatCurrency(result.components.gratuity)}</span></div>}
              <div className="result-row" style={{ borderTop: '2px solid var(--gold)', paddingTop: '12px' }}>
                <span className="label" style={{ fontWeight: '700' }}>Gross Salary</span>
                <span className="value" style={{ color: 'var(--gold)' }}>{formatCurrency(result.gross_salary)}</span>
              </div>
            </div>

            <div className="card" style={{ marginBottom: '16px' }}>
              <h3 style={{ marginBottom: '16px' }}>Deductions (Annual)</h3>
              <div className="result-row"><span className="label">Employee PF</span><span className="value" style={{ color: 'var(--danger)' }}>-{formatCurrency(result.deductions.employee_pf)}</span></div>
              <div className="result-row"><span className="label">Professional Tax</span><span className="value" style={{ color: 'var(--danger)' }}>-{formatCurrency(result.deductions.professional_tax)}</span></div>
              <div className="result-row"><span className="label">Income Tax</span><span className="value" style={{ color: 'var(--danger)' }}>-{formatCurrency(result.deductions.income_tax)}</span></div>
              <div className="result-row" style={{ borderTop: '2px solid var(--danger)' }}>
                <span className="label" style={{ fontWeight: '700' }}>Total Deductions</span>
                <span className="value" style={{ color: 'var(--danger)' }}>-{formatCurrency(result.total_deductions)}</span>
              </div>
            </div>

            <div className="card" style={{ marginBottom: '16px' }}>
              <h3 style={{ marginBottom: '16px' }}>CTC Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => formatCurrency(v)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {result.tax_details?.slab_breakdown?.length > 0 && (
              <div className="card" style={{ marginBottom: '16px' }}>
                <h3 style={{ marginBottom: '16px' }}>Tax Slab Breakdown ({result.tax_regime === 'new' ? 'New' : 'Old'} Regime)</h3>
                {result.tax_details.slab_breakdown.map((slab, i) => (
                  <div className="result-row" key={i}>
                    <span className="label">{slab.slab} @ {slab.rate}</span>
                    <span className="value">{formatCurrency(slab.tax)}</span>
                  </div>
                ))}
                <div className="result-row"><span className="label">Cess (4%)</span><span className="value">{formatCurrency(result.tax_details.cess)}</span></div>
                <div className="result-row" style={{ fontWeight: '700', color: 'var(--gold)' }}>
                  <span>Total Tax</span><span>{formatCurrency(result.tax_details.total_tax)}</span>
                </div>
                <p style={{ marginTop: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  Effective tax rate: {result.effective_tax_rate}%
                </p>
              </div>
            )}

            <ShareButtons text={shareText} />
          </div>
        )}
      </div>
    </div>
  );
}

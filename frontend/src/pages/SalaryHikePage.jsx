import { useState } from 'react';
import { calculateSalaryHike, formatCurrency } from '../utils/taxCalculator';
import ShareButtons from '../components/ShareButtons';
import SEO from '../components/SEO';

export default function SalaryHikePage() {
  const [currentCTC, setCurrentCTC] = useState('');
  const [newCTC, setNewCTC] = useState('');
  const [cityType, setCityType] = useState('metro');
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const curr = parseFloat(currentCTC);
    const next = parseFloat(newCTC);
    if (!curr || curr <= 0 || !next || next <= 0) return;
    setResult(calculateSalaryHike(curr, next, cityType));
  };

  const shareText = result
    ? `Got a ${result.hikePct.toFixed(0)}% salary hike! But my real in-hand increase is only ${result.effectiveHikePct.toFixed(1)}% (${formatCurrency(result.monthlyIncrease)}/month more). Check your real hike at https://salary.doaide.com/hike`
    : '';

  return (
    <div className="page">
      <SEO
        title="Salary Hike Calculator"
        description="Calculate your real take-home increase after a salary hike. See how much of your CTC hike actually reaches your bank account after tax, PF, and deductions."
        path="/hike"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Salary Hike Calculator',
          url: 'https://salary.doaide.com/hike',
          description: 'Calculate your real in-hand salary increase after a hike. CTC vs take-home comparison.',
          applicationCategory: 'FinanceApplication',
        }}
      />
      <h1 className="page-title">Salary Hike <span className="accent-text">Calculator</span></h1>
      <p className="page-subtitle">See how much of your CTC hike actually reaches your bank account</p>

      <div className="calculator-layout">
        <form onSubmit={handleCalculate} className="calculator-form">
          <div className="card">
            <h3 className="card-title">Enter Salary Details</h3>
            <div className="input-group">
              <label htmlFor="current-ctc">Current Annual CTC (INR)</label>
              <input
                id="current-ctc"
                type="number"
                placeholder="e.g. 1200000"
                value={currentCTC}
                onChange={(e) => setCurrentCTC(e.target.value)}
                min="0"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="new-ctc">New Annual CTC (INR)</label>
              <input
                id="new-ctc"
                type="number"
                placeholder="e.g. 1500000"
                value={newCTC}
                onChange={(e) => setNewCTC(e.target.value)}
                min="0"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="hike-city">City Type</label>
              <select id="hike-city" value={cityType} onChange={(e) => setCityType(e.target.value)}>
                <option value="metro">Metro (50% HRA)</option>
                <option value="non-metro">Non-Metro (40% HRA)</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary btn-full">
              Calculate Real Hike
            </button>
          </div>
        </form>

        {result && (
          <div className="calculator-results">
            <div className="hike-summary">
              <div className="hike-stat">
                <div className="hike-stat-label">CTC Hike</div>
                <div className="hike-stat-value">{result.hikePct.toFixed(1)}%</div>
                <div className="hike-stat-sub">{formatCurrency(result.newCTC - result.currentCTC)}</div>
              </div>
              <div className="hike-arrow">→</div>
              <div className="hike-stat hike-stat-real">
                <div className="hike-stat-label">Real In-Hand Hike</div>
                <div className="hike-stat-value">{result.effectiveHikePct.toFixed(1)}%</div>
                <div className="hike-stat-sub">{formatCurrency(result.monthlyIncrease)}/month</div>
              </div>
            </div>

            <div className="savings-banner">
              Your monthly take-home increases by {formatCurrency(result.monthlyIncrease)} ({formatCurrency(result.annualIncrease)}/year)
            </div>

            <div className="comparison-grid">
              <div className="card">
                <h3 className="card-title">Current Salary</h3>
                <div className="result-row"><span className="label">CTC</span><span className="value">{formatCurrency(result.currentCTC)}</span></div>
                <div className="result-row"><span className="label">Gross Salary</span><span className="value">{formatCurrency(result.currentBreakdown.components.grossSalary)}</span></div>
                <div className="result-row"><span className="label">Income Tax (New)</span><span className="value danger">-{formatCurrency(result.currentBreakdown.newRegime.tax.totalTax)}</span></div>
                <div className="result-row"><span className="label">Employee PF</span><span className="value danger">-{formatCurrency(result.currentBreakdown.components.employeePF)}</span></div>
                <div className="result-row result-row-total">
                  <span className="label">Monthly Take-Home</span>
                  <span className="value accent-text">{formatCurrency(result.currentMonthlyTakeHome)}</span>
                </div>
              </div>

              <div className="card">
                <h3 className="card-title">New Salary</h3>
                <div className="result-row"><span className="label">CTC</span><span className="value">{formatCurrency(result.newCTC)}</span></div>
                <div className="result-row"><span className="label">Gross Salary</span><span className="value">{formatCurrency(result.newBreakdown.components.grossSalary)}</span></div>
                <div className="result-row"><span className="label">Income Tax (New)</span><span className="value danger">-{formatCurrency(result.newBreakdown.newRegime.tax.totalTax)}</span></div>
                <div className="result-row"><span className="label">Employee PF</span><span className="value danger">-{formatCurrency(result.newBreakdown.components.employeePF)}</span></div>
                <div className="result-row result-row-total">
                  <span className="label">Monthly Take-Home</span>
                  <span className="value accent-text">{formatCurrency(result.newMonthlyTakeHome)}</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Where Does Your Hike Go?</h3>
              <div className="hike-breakdown-bars">
                {(() => {
                  const ctcDiff = result.newCTC - result.currentCTC;
                  const taxDiff = result.newBreakdown.newRegime.tax.totalTax - result.currentBreakdown.newRegime.tax.totalTax;
                  const pfDiff = result.newBreakdown.components.employeePF - result.currentBreakdown.components.employeePF;
                  const epfDiff = result.newBreakdown.components.employerPF - result.currentBreakdown.components.employerPF;
                  const gratuityDiff = result.newBreakdown.components.gratuity - result.currentBreakdown.components.gratuity;
                  const takeHomeDiff = result.annualIncrease;
                  const items = [
                    { label: 'In-Hand Increase', amount: takeHomeDiff, color: 'var(--success)', pct: (takeHomeDiff / ctcDiff * 100) },
                    { label: 'Additional Tax', amount: taxDiff, color: 'var(--danger)', pct: (taxDiff / ctcDiff * 100) },
                    { label: 'PF (Employee)', amount: pfDiff, color: 'var(--info)', pct: (pfDiff / ctcDiff * 100) },
                    { label: 'PF (Employer)', amount: epfDiff, color: '#a78bfa', pct: (epfDiff / ctcDiff * 100) },
                    { label: 'Gratuity', amount: gratuityDiff, color: '#fb923c', pct: (gratuityDiff / ctcDiff * 100) },
                  ].filter(i => Math.abs(i.amount) > 0);

                  return items.map((item, idx) => (
                    <div className="hike-bar-row" key={idx}>
                      <div className="hike-bar-label">
                        <span>{item.label}</span>
                        <span>{formatCurrency(item.amount)} ({item.pct.toFixed(1)}%)</span>
                      </div>
                      <div className="hike-bar-track">
                        <div
                          className="hike-bar-fill"
                          style={{ width: `${Math.min(Math.abs(item.pct), 100)}%`, background: item.color }}
                        />
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>

            <ShareButtons text={shareText} />
          </div>
        )}
      </div>
    </div>
  );
}

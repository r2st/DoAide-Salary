import { useState } from 'react';
import { calculateFullBreakdown, formatCurrency } from '../utils/taxCalculator';
import ShareButtons from '../components/ShareButtons';

export default function CalculatorPage() {
  const [annualCTC, setAnnualCTC] = useState('');
  const [cityType, setCityType] = useState('metro');
  const [age, setAge] = useState('');
  const [deductions80C, setDeductions80C] = useState(150000);
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const ctc = parseFloat(annualCTC);
    if (!ctc || ctc <= 0) return;
    const breakdown = calculateFullBreakdown(ctc, cityType, parseInt(age) || 30, deductions80C);
    setResult(breakdown);
  };

  const shareText = result
    ? `My CTC is ${formatCurrency(result.annualCTC)} and my monthly take-home is ${formatCurrency(result.newRegime.monthlyTakeHome)} (New Regime). Calculate yours at https://salary.doaide.com`
    : '';

  return (
    <div className="page">
      <h1 className="page-title">CTC to In-Hand <span className="accent-text">Salary Calculator</span></h1>
      <p className="page-subtitle">Enter your CTC to see your complete salary breakdown with both tax regimes</p>

      <div className="calculator-layout">
        <form onSubmit={handleCalculate} className="calculator-form">
          <div className="card">
            <h3 className="card-title">Salary Details</h3>
            <div className="input-group">
              <label htmlFor="ctc">Annual CTC (INR)</label>
              <input
                id="ctc"
                type="number"
                placeholder="e.g. 1200000"
                value={annualCTC}
                onChange={(e) => setAnnualCTC(e.target.value)}
                min="0"
                required
              />
            </div>

            <div className="grid-2">
              <div className="input-group">
                <label htmlFor="city">City Type</label>
                <select id="city" value={cityType} onChange={(e) => setCityType(e.target.value)}>
                  <option value="metro">Metro (50% HRA)</option>
                  <option value="non-metro">Non-Metro (40% HRA)</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="age">Age</label>
                <input
                  id="age"
                  type="number"
                  placeholder="e.g. 28"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="18"
                  max="80"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="deductions80c">80C Deductions (Old Regime)</label>
              <input
                id="deductions80c"
                type="number"
                placeholder="Max 1,50,000"
                value={deductions80C}
                onChange={(e) => setDeductions80C(Number(e.target.value))}
                min="0"
                max="150000"
              />
              <span className="input-hint">EPF, ELSS, LIC, PPF etc. (max 1.5L)</span>
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Calculate Take-Home Salary
            </button>
          </div>
        </form>

        {result && (
          <div className="calculator-results">
            {/* Regime comparison highlight */}
            <div className="regime-comparison">
              <div className={`regime-box ${result.betterRegime === 'new' ? 'regime-winner' : ''}`}>
                <div className="regime-label">New Regime (FY 2025-26)</div>
                <div className="regime-amount">{formatCurrency(result.newRegime.monthlyTakeHome)}</div>
                <div className="regime-sublabel">per month</div>
                {result.betterRegime === 'new' && <span className="winner-badge">Better</span>}
              </div>
              <div className={`regime-box ${result.betterRegime === 'old' ? 'regime-winner' : ''}`}>
                <div className="regime-label">Old Regime</div>
                <div className="regime-amount">{formatCurrency(result.oldRegime.monthlyTakeHome)}</div>
                <div className="regime-sublabel">per month</div>
                {result.betterRegime === 'old' && <span className="winner-badge">Better</span>}
              </div>
            </div>

            <div className="savings-banner">
              You save {formatCurrency(result.annualSavings)}/year ({formatCurrency(result.monthlySavings)}/month) with the {result.betterRegime === 'new' ? 'New' : 'Old'} Regime
            </div>

            {/* Salary Components */}
            <div className="card">
              <h3 className="card-title">Salary Components (Annual)</h3>
              <div className="result-row"><span className="label">Basic Salary (40%)</span><span className="value">{formatCurrency(result.components.basic)}</span></div>
              <div className="result-row"><span className="label">HRA ({cityType === 'metro' ? '50' : '40'}% of Basic)</span><span className="value">{formatCurrency(result.components.hra)}</span></div>
              <div className="result-row"><span className="label">Special Allowance</span><span className="value">{formatCurrency(result.components.specialAllowance)}</span></div>
              <div className="result-row"><span className="label">Employer PF</span><span className="value">{formatCurrency(result.components.employerPF)}</span></div>
              <div className="result-row"><span className="label">Gratuity (4.81% of Basic)</span><span className="value">{formatCurrency(result.components.gratuity)}</span></div>
              <div className="result-row result-row-total"><span className="label">Gross Salary</span><span className="value accent-text">{formatCurrency(result.components.grossSalary)}</span></div>
            </div>

            {/* Breakdown Tables - Monthly & Yearly */}
            <div className="card">
              <h3 className="card-title">Monthly & Yearly Breakdown</h3>
              <div className="breakdown-table-wrapper">
                <table className="breakdown-table">
                  <thead>
                    <tr>
                      <th>Component</th>
                      <th>Monthly</th>
                      <th>Yearly</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Basic Salary</td>
                      <td>{formatCurrency(result.components.basic / 12)}</td>
                      <td>{formatCurrency(result.components.basic)}</td>
                    </tr>
                    <tr>
                      <td>HRA</td>
                      <td>{formatCurrency(result.components.hra / 12)}</td>
                      <td>{formatCurrency(result.components.hra)}</td>
                    </tr>
                    <tr>
                      <td>Special Allowance</td>
                      <td>{formatCurrency(result.components.specialAllowance / 12)}</td>
                      <td>{formatCurrency(result.components.specialAllowance)}</td>
                    </tr>
                    <tr className="deduction-row">
                      <td>Employee PF</td>
                      <td className="danger">-{formatCurrency(result.components.employeePF / 12)}</td>
                      <td className="danger">-{formatCurrency(result.components.employeePF)}</td>
                    </tr>
                    <tr className="deduction-row">
                      <td>Professional Tax</td>
                      <td className="danger">-{formatCurrency(200)}</td>
                      <td className="danger">-{formatCurrency(result.components.professionalTaxAnnual)}</td>
                    </tr>
                    <tr className="deduction-row">
                      <td>Income Tax (New Regime)</td>
                      <td className="danger">-{formatCurrency(result.newRegime.tax.totalTax / 12)}</td>
                      <td className="danger">-{formatCurrency(result.newRegime.tax.totalTax)}</td>
                    </tr>
                    <tr className="total-row">
                      <td>Take-Home (New Regime)</td>
                      <td className="accent-text">{formatCurrency(result.newRegime.monthlyTakeHome)}</td>
                      <td className="accent-text">{formatCurrency(result.newRegime.annualTakeHome)}</td>
                    </tr>
                    <tr className="deduction-row">
                      <td>Income Tax (Old Regime)</td>
                      <td className="danger">-{formatCurrency(result.oldRegime.tax.totalTax / 12)}</td>
                      <td className="danger">-{formatCurrency(result.oldRegime.tax.totalTax)}</td>
                    </tr>
                    <tr className="total-row">
                      <td>Take-Home (Old Regime)</td>
                      <td className="accent-text">{formatCurrency(result.oldRegime.monthlyTakeHome)}</td>
                      <td className="accent-text">{formatCurrency(result.oldRegime.annualTakeHome)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tax Slab Breakdowns */}
            <div className="comparison-grid">
              <div className="card">
                <h3 className="card-title">New Regime Tax Slabs</h3>
                <div className="result-row"><span className="label">Standard Deduction</span><span className="value">{formatCurrency(result.newRegime.tax.standardDeduction)}</span></div>
                <div className="result-row"><span className="label">Taxable Income</span><span className="value">{formatCurrency(result.newRegime.tax.taxableIncome)}</span></div>
                <hr className="divider" />
                {result.newRegime.tax.slabBreakdown.map((slab, i) => (
                  <div className="result-row" key={i}>
                    <span className="label">{slab.range} @ {slab.rate}</span>
                    <span className="value">{formatCurrency(slab.tax)}</span>
                  </div>
                ))}
                {result.newRegime.tax.rebateApplied > 0 && (
                  <div className="result-row"><span className="label success">Rebate u/s 87A</span><span className="value success">-{formatCurrency(result.newRegime.tax.rebateApplied)}</span></div>
                )}
                <div className="result-row"><span className="label">Cess (4%)</span><span className="value">{formatCurrency(result.newRegime.tax.cess)}</span></div>
                <div className="result-row result-row-total"><span className="label">Total Tax</span><span className="value accent-text">{formatCurrency(result.newRegime.tax.totalTax)}</span></div>
              </div>

              <div className="card">
                <h3 className="card-title">Old Regime Tax Slabs</h3>
                <div className="result-row"><span className="label">Standard Deduction</span><span className="value">{formatCurrency(result.oldRegime.tax.standardDeduction)}</span></div>
                <div className="result-row"><span className="label">80C Deductions</span><span className="value">{formatCurrency(result.oldRegime.tax.deductions80C)}</span></div>
                <div className="result-row"><span className="label">Taxable Income</span><span className="value">{formatCurrency(result.oldRegime.tax.taxableIncome)}</span></div>
                <hr className="divider" />
                {result.oldRegime.tax.slabBreakdown.map((slab, i) => (
                  <div className="result-row" key={i}>
                    <span className="label">{slab.range} @ {slab.rate}</span>
                    <span className="value">{formatCurrency(slab.tax)}</span>
                  </div>
                ))}
                {result.oldRegime.tax.rebateApplied > 0 && (
                  <div className="result-row"><span className="label success">Rebate u/s 87A</span><span className="value success">-{formatCurrency(result.oldRegime.tax.rebateApplied)}</span></div>
                )}
                <div className="result-row"><span className="label">Cess (4%)</span><span className="value">{formatCurrency(result.oldRegime.tax.cess)}</span></div>
                <div className="result-row result-row-total"><span className="label">Total Tax</span><span className="value accent-text">{formatCurrency(result.oldRegime.tax.totalTax)}</span></div>
              </div>
            </div>

            <ShareButtons text={shareText} />
          </div>
        )}
      </div>
    </div>
  );
}

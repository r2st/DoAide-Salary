import { useState } from 'react';
import { calculateFullBreakdown, formatCurrency } from '../utils/taxCalculator';
import ShareButtons from '../components/ShareButtons';

const emptyOffer = { name: '', ctc: '', cityType: 'metro' };

export default function ComparatorPage() {
  const [offers, setOffers] = useState([
    { ...emptyOffer, name: 'Offer A' },
    { ...emptyOffer, name: 'Offer B' },
  ]);
  const [results, setResults] = useState(null);

  const updateOffer = (index, field, value) => {
    const updated = [...offers];
    updated[index] = { ...updated[index], [field]: value };
    setOffers(updated);
  };

  const addOffer = () => {
    if (offers.length < 3) {
      setOffers([...offers, { ...emptyOffer, name: `Offer ${String.fromCharCode(65 + offers.length)}` }]);
    }
  };

  const removeOffer = (index) => {
    if (offers.length > 2) {
      setOffers(offers.filter((_, i) => i !== index));
    }
  };

  const handleCompare = (e) => {
    e.preventDefault();
    const computed = offers
      .filter((o) => o.ctc && parseFloat(o.ctc) > 0)
      .map((o) => ({
        ...o,
        breakdown: calculateFullBreakdown(parseFloat(o.ctc), o.cityType),
      }));

    if (computed.length < 2) return;
    setResults(computed);
  };

  const bestOffer = results
    ? results.reduce((best, curr) =>
        curr.breakdown.newRegime.monthlyTakeHome > best.breakdown.newRegime.monthlyTakeHome ? curr : best
      )
    : null;

  const shareText = results
    ? `Compared ${results.length} job offers: ${results.map((r) => `${r.name} ${formatCurrency(r.breakdown.newRegime.monthlyTakeHome)}/month`).join(' vs ')}. Compare yours at https://salary.doaide.com/compare`
    : '';

  return (
    <div className="page">
      <h1 className="page-title">Offer Letter <span className="accent-text">Comparator</span></h1>
      <p className="page-subtitle">Compare 2-3 job offers side by side to find the best in-hand salary</p>

      <form onSubmit={handleCompare}>
        <div className="offers-grid">
          {offers.map((offer, index) => (
            <div className="card offer-card" key={index}>
              <div className="offer-header">
                <input
                  type="text"
                  className="offer-name-input"
                  value={offer.name}
                  onChange={(e) => updateOffer(index, 'name', e.target.value)}
                  placeholder="Offer name"
                />
                {offers.length > 2 && (
                  <button type="button" className="btn-remove" onClick={() => removeOffer(index)} aria-label="Remove offer">
                    X
                  </button>
                )}
              </div>
              <div className="input-group">
                <label>Annual CTC (INR)</label>
                <input
                  type="number"
                  placeholder="e.g. 1500000"
                  value={offer.ctc}
                  onChange={(e) => updateOffer(index, 'ctc', e.target.value)}
                  min="0"
                  required
                />
              </div>
              <div className="input-group">
                <label>City Type</label>
                <select value={offer.cityType} onChange={(e) => updateOffer(index, 'cityType', e.target.value)}>
                  <option value="metro">Metro</option>
                  <option value="non-metro">Non-Metro</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="compare-actions">
          {offers.length < 3 && (
            <button type="button" className="btn btn-secondary" onClick={addOffer}>
              + Add Offer
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            Compare Offers
          </button>
        </div>
      </form>

      {results && (
        <div className="comparison-results">
          <div className="offers-grid">
            {results.map((r, index) => {
              const isBest = r === bestOffer;
              return (
                <div className={`card comparison-card ${isBest ? 'best-offer' : ''}`} key={index}>
                  {isBest && <div className="best-badge">Best Offer</div>}
                  <h3 className="offer-title">{r.name}</h3>
                  <div className="offer-ctc">{formatCurrency(parseFloat(r.ctc))} CTC</div>

                  <div className="offer-highlight">
                    <div className="offer-takehome-label">Monthly Take-Home</div>
                    <div className="offer-takehome">{formatCurrency(r.breakdown.newRegime.monthlyTakeHome)}</div>
                    <div className="offer-regime-note">New Regime</div>
                  </div>

                  <div className="result-row"><span className="label">Basic</span><span className="value">{formatCurrency(r.breakdown.components.basic)}</span></div>
                  <div className="result-row"><span className="label">HRA</span><span className="value">{formatCurrency(r.breakdown.components.hra)}</span></div>
                  <div className="result-row"><span className="label">Special Allowance</span><span className="value">{formatCurrency(r.breakdown.components.specialAllowance)}</span></div>
                  <div className="result-row"><span className="label">Employee PF</span><span className="value danger">-{formatCurrency(r.breakdown.components.employeePF)}</span></div>
                  <div className="result-row"><span className="label">Professional Tax</span><span className="value danger">-{formatCurrency(r.breakdown.components.professionalTaxAnnual)}</span></div>
                  <div className="result-row"><span className="label">Income Tax (New)</span><span className="value danger">-{formatCurrency(r.breakdown.newRegime.tax.totalTax)}</span></div>
                  <div className="result-row"><span className="label">Income Tax (Old)</span><span className="value danger">-{formatCurrency(r.breakdown.oldRegime.tax.totalTax)}</span></div>

                  <hr className="divider" />

                  <div className="result-row">
                    <span className="label">Annual Take-Home (New)</span>
                    <span className="value accent-text">{formatCurrency(r.breakdown.newRegime.annualTakeHome)}</span>
                  </div>
                  <div className="result-row">
                    <span className="label">Annual Take-Home (Old)</span>
                    <span className="value">{formatCurrency(r.breakdown.oldRegime.annualTakeHome)}</span>
                  </div>
                  <div className="result-row">
                    <span className="label">Better Regime</span>
                    <span className="value accent-text">{r.breakdown.betterRegime === 'new' ? 'New' : 'Old'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="savings-banner" style={{ marginTop: '24px' }}>
            {bestOffer.name} gives you the highest take-home of {formatCurrency(bestOffer.breakdown.newRegime.monthlyTakeHome)}/month
          </div>

          <ShareButtons text={shareText} />
        </div>
      )}
    </div>
  );
}

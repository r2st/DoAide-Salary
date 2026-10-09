import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatNumber,
  calculateSalaryComponents,
  calculateNewRegimeTax,
  calculateOldRegimeTax,
  calculateFullBreakdown,
  calculateHRAExemption,
  calculateSalaryHike,
  getProfessionalTax,
  PROFESSIONAL_TAX_BY_STATE,
} from './taxCalculator';

describe('formatCurrency', () => {
  it('formats number as INR currency', () => {
    expect(formatCurrency(1200000)).toBe('₹12,00,000');
  });

  it('rounds to nearest integer', () => {
    expect(formatCurrency(50000.7)).toBe('₹50,001');
  });

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('₹0');
  });
});

describe('formatNumber', () => {
  it('formats number with Indian grouping', () => {
    expect(formatNumber(1200000)).toBe('12,00,000');
  });
});

describe('getProfessionalTax', () => {
  it('returns correct PT for Karnataka', () => {
    expect(getProfessionalTax('karnataka', 1200000)).toBe(2400);
  });

  it('returns correct PT for Maharashtra', () => {
    expect(getProfessionalTax('maharashtra', 1200000)).toBe(2500);
  });

  it('returns zero PT for Delhi', () => {
    expect(getProfessionalTax('delhi', 1200000)).toBe(0);
  });

  it('returns zero PT for Uttar Pradesh', () => {
    expect(getProfessionalTax('uttar-pradesh', 1200000)).toBe(0);
  });

  it('returns zero PT for low salary', () => {
    expect(getProfessionalTax('karnataka', 150000)).toBe(0);
  });

  it('returns zero for unknown state', () => {
    expect(getProfessionalTax('unknown', 1200000)).toBe(0);
  });
});

describe('calculateSalaryComponents', () => {
  it('calculates components for 12 LPA metro', () => {
    const c = calculateSalaryComponents(1200000, 'metro');
    expect(c.basic).toBe(480000);
    expect(c.hra).toBe(240000);
    expect(c.employeePF).toBe(21600);
    expect(c.employerPF).toBe(21600);
    expect(c.gratuity).toBeCloseTo(23088, 0);
    expect(c.specialAllowance).toBeCloseTo(435312, 0);
    expect(c.grossSalary).toBeCloseTo(1155312, 0);
  });

  it('calculates HRA at 40% for non-metro', () => {
    const c = calculateSalaryComponents(1200000, 'non-metro');
    expect(c.hra).toBe(192000);
  });

  it('caps PF at 1800/month for high CTC', () => {
    const c = calculateSalaryComponents(5000000, 'metro');
    expect(c.employeePF).toBe(21600);
    expect(c.employerPF).toBe(21600);
  });

  it('does not cap PF for low CTC where 12% < 21600', () => {
    const c = calculateSalaryComponents(400000, 'metro');
    expect(c.employeePF).toBe(19200);
    expect(c.employerPF).toBe(19200);
  });

  it('handles zero CTC', () => {
    const c = calculateSalaryComponents(0, 'metro');
    expect(c.basic).toBe(0);
    expect(c.hra).toBe(0);
    expect(c.grossSalary).toBe(0);
  });
});

describe('calculateNewRegimeTax (FY 2026-27)', () => {
  it('returns zero tax for income under 4L after standard deduction', () => {
    const result = calculateNewRegimeTax(475000);
    expect(result.taxableIncome).toBe(400000);
    expect(result.totalTax).toBe(0);
  });

  it('applies rebate for income up to 12L taxable', () => {
    const result = calculateNewRegimeTax(1275000);
    expect(result.taxableIncome).toBe(1200000);
    expect(result.rebateApplied).toBe(60000);
    expect(result.totalTax).toBe(0);
  });

  it('does not apply rebate for income over 12L taxable', () => {
    const result = calculateNewRegimeTax(1375000);
    expect(result.taxableIncome).toBe(1300000);
    expect(result.rebateApplied).toBe(0);
    expect(result.taxBeforeCess).toBe(75000);
    expect(result.cess).toBe(3000);
    expect(result.totalTax).toBe(78000);
  });

  it('calculates correct tax for 20 LPA gross', () => {
    const result = calculateNewRegimeTax(2000000);
    expect(result.taxableIncome).toBe(1925000);
    const expectedTax = 0 + 20000 + 40000 + 60000 + 65000;
    expect(result.taxBeforeCess).toBe(expectedTax);
    expect(result.cess).toBeCloseTo(7400, 0);
    expect(result.totalTax).toBeCloseTo(192400, 0);
  });

  it('calculates correct tax for 30 LPA gross', () => {
    const result = calculateNewRegimeTax(3000000);
    expect(result.taxableIncome).toBe(2925000);
    const expectedTax = 0 + 20000 + 40000 + 60000 + 80000 + 100000 + 157500;
    expect(result.taxBeforeCess).toBe(expectedTax);
    expect(result.cess).toBeCloseTo(18300, 0);
    expect(result.totalTax).toBeCloseTo(475800, 0);
  });

  it('handles zero gross salary', () => {
    const result = calculateNewRegimeTax(0);
    expect(result.totalTax).toBe(0);
    expect(result.taxableIncome).toBe(0);
  });

  it('has zero surcharge for incomes under 50L taxable', () => {
    const result = calculateNewRegimeTax(3000000);
    expect(result.surcharge).toBe(0);
  });

  it('includes standard deduction of 75000', () => {
    const result = calculateNewRegimeTax(1000000);
    expect(result.standardDeduction).toBe(75000);
    expect(result.taxableIncome).toBe(925000);
  });
});

describe('calculateOldRegimeTax (FY 2026-27)', () => {
  it('returns zero tax for income under 2.5L after deductions', () => {
    const result = calculateOldRegimeTax(400000, 150000);
    expect(result.taxableIncome).toBe(200000);
    expect(result.totalTax).toBe(0);
  });

  it('applies rebate for taxable income up to 5L', () => {
    const result = calculateOldRegimeTax(700000, 150000);
    expect(result.taxableIncome).toBe(500000);
    expect(result.rebateApplied).toBe(12500);
    expect(result.totalTax).toBe(0);
  });

  it('does not apply rebate for taxable income over 5L', () => {
    const result = calculateOldRegimeTax(800000, 150000);
    expect(result.taxableIncome).toBe(600000);
    expect(result.rebateApplied).toBe(0);
    expect(result.taxBeforeCess).toBe(32500);
    expect(result.cess).toBe(1300);
    expect(result.totalTax).toBe(33800);
  });

  it('caps 80C at 1.5L even if higher input', () => {
    const result = calculateOldRegimeTax(800000, 300000);
    expect(result.deductions80C).toBe(150000);
    expect(result.taxableIncome).toBe(600000);
  });

  it('caps 80D at 1L', () => {
    const result = calculateOldRegimeTax(1500000, 150000, 200000);
    expect(result.deductions80D).toBe(100000);
  });

  it('includes NPS 80CCD deduction capped at 50K', () => {
    const result = calculateOldRegimeTax(1500000, 150000, 0, 80000);
    expect(result.npsDeduction).toBe(50000);
  });

  it('includes HRA exemption in deductions', () => {
    const result = calculateOldRegimeTax(1500000, 150000, 0, 0, 200000);
    expect(result.hraExemption).toBe(200000);
    expect(result.totalDeductions).toBe(50000 + 150000 + 200000);
  });

  it('calculates tax for 15 LPA gross', () => {
    const result = calculateOldRegimeTax(1500000, 150000);
    expect(result.taxableIncome).toBe(1300000);
    expect(result.taxBeforeCess).toBe(202500);
    expect(result.cess).toBe(8100);
    expect(result.totalTax).toBe(210600);
  });

  it('handles zero 80C deductions', () => {
    const result = calculateOldRegimeTax(800000, 0);
    expect(result.taxableIncome).toBe(750000);
    expect(result.taxBeforeCess).toBe(62500);
  });
});

describe('calculateHRAExemption', () => {
  it('calculates HRA exemption for metro', () => {
    const result = calculateHRAExemption(480000, 0, 240000, 300000, true);
    expect(result.actualHRA).toBe(240000);
    expect(result.pctOfBasic).toBe(240000);
    expect(result.rentMinus10Pct).toBe(252000);
    expect(result.exemption).toBe(240000);
  });

  it('calculates HRA exemption for non-metro', () => {
    const result = calculateHRAExemption(480000, 0, 192000, 200000, false);
    expect(result.pctOfBasic).toBe(192000);
    expect(result.rentMinus10Pct).toBe(152000);
    expect(result.exemption).toBe(152000);
  });

  it('includes DA in calculation', () => {
    const result = calculateHRAExemption(480000, 48000, 240000, 300000, true);
    expect(result.pctOfBasic).toBe(264000);
  });

  it('calculates taxable HRA correctly', () => {
    const result = calculateHRAExemption(480000, 0, 240000, 300000, true);
    expect(result.taxableHRA).toBe(0);
  });

  it('handles zero rent', () => {
    const result = calculateHRAExemption(480000, 0, 240000, 0, true);
    expect(result.exemption).toBe(0);
    expect(result.taxableHRA).toBe(240000);
  });
});

describe('calculateFullBreakdown', () => {
  it('returns complete breakdown for 12 LPA', () => {
    const result = calculateFullBreakdown(1200000, 'metro', 30, 150000);

    expect(result.annualCTC).toBe(1200000);
    expect(result.cityType).toBe('metro');
    expect(result.components.basic).toBe(480000);

    expect(result.newRegime.tax.totalTax).toBeGreaterThanOrEqual(0);
    expect(result.oldRegime.tax.totalTax).toBeGreaterThanOrEqual(0);

    expect(result.newRegime.annualTakeHome).toBeLessThan(1200000);
    expect(result.oldRegime.annualTakeHome).toBeLessThan(1200000);

    expect(result.newRegime.monthlyTakeHome).toBeCloseTo(result.newRegime.annualTakeHome / 12, 0);

    expect(['new', 'old']).toContain(result.betterRegime);
  });

  it('identifies correct better regime for low CTC', () => {
    const result = calculateFullBreakdown(600000, 'metro', 25, 150000);
    expect(result.betterRegime).toBe('new');
  });

  it('monthly take-home is annual divided by 12', () => {
    const result = calculateFullBreakdown(1500000, 'non-metro', 28, 150000);
    expect(result.newRegime.monthlyTakeHome).toBeCloseTo(result.newRegime.annualTakeHome / 12, 2);
    expect(result.oldRegime.monthlyTakeHome).toBeCloseTo(result.oldRegime.annualTakeHome / 12, 2);
  });

  it('savings equals absolute difference between regimes', () => {
    const result = calculateFullBreakdown(2000000, 'metro', 35, 150000);
    const diff = Math.abs(result.newRegime.annualTakeHome - result.oldRegime.annualTakeHome);
    expect(result.annualSavings).toBeCloseTo(diff, 0);
    expect(result.monthlySavings).toBeCloseTo(diff / 12, 0);
  });

  it('handles 50 LPA correctly', () => {
    const result = calculateFullBreakdown(5000000, 'metro', 40, 150000);
    expect(result.components.basic).toBe(2000000);
    expect(result.components.employeePF).toBe(21600);
    expect(result.newRegime.annualTakeHome).toBeGreaterThan(0);
    expect(result.newRegime.annualTakeHome).toBeLessThan(5000000);
  });

  it('non-metro gives different HRA allocation than metro', () => {
    const metro = calculateFullBreakdown(1200000, 'metro', 30, 150000);
    const nonMetro = calculateFullBreakdown(1200000, 'non-metro', 30, 150000);
    expect(nonMetro.components.hra).toBeLessThan(metro.components.hra);
    expect(nonMetro.components.specialAllowance).toBeGreaterThan(metro.components.specialAllowance);
  });

  it('uses state professional tax correctly', () => {
    const karnataka = calculateFullBreakdown(1200000, 'metro', 30, 150000, { state: 'karnataka' });
    const delhi = calculateFullBreakdown(1200000, 'metro', 30, 150000, { state: 'delhi' });
    expect(karnataka.components.professionalTaxAnnual).toBe(2400);
    expect(delhi.components.professionalTaxAnnual).toBe(0);
    expect(delhi.newRegime.annualTakeHome).toBeGreaterThan(karnataka.newRegime.annualTakeHome);
  });

  it('includes HRA details when rent is provided', () => {
    const result = calculateFullBreakdown(1200000, 'metro', 30, 150000, { rentPaidAnnual: 300000 });
    expect(result.hraDetails).not.toBeNull();
    expect(result.hraDetails.exemption).toBeGreaterThan(0);
  });

  it('old regime benefits from NPS deduction', () => {
    const withoutNPS = calculateFullBreakdown(1500000, 'metro', 30, 150000);
    const withNPS = calculateFullBreakdown(1500000, 'metro', 30, 150000, { npsDeduction: 50000 });
    expect(withNPS.oldRegime.tax.totalTax).toBeLessThan(withoutNPS.oldRegime.tax.totalTax);
  });

  it('old regime benefits from 80D deduction', () => {
    const without80D = calculateFullBreakdown(1500000, 'metro', 30, 150000);
    const with80D = calculateFullBreakdown(1500000, 'metro', 30, 150000, { deductions80D: 25000 });
    expect(with80D.oldRegime.tax.totalTax).toBeLessThan(without80D.oldRegime.tax.totalTax);
  });
});

describe('calculateSalaryHike', () => {
  it('calculates basic hike correctly', () => {
    const result = calculateSalaryHike(1200000, 1500000, 'metro');
    expect(result.currentCTC).toBe(1200000);
    expect(result.newCTC).toBe(1500000);
    expect(result.hikePct).toBeCloseTo(25, 0);
    expect(result.newMonthlyTakeHome).toBeGreaterThan(result.currentMonthlyTakeHome);
    expect(result.monthlyIncrease).toBeGreaterThan(0);
    expect(result.annualIncrease).toBeCloseTo(result.monthlyIncrease * 12, 0);
  });

  it('effective hike is less than CTC hike due to tax', () => {
    const result = calculateSalaryHike(1200000, 1500000, 'metro');
    expect(result.effectiveHikePct).toBeLessThan(result.hikePct);
  });

  it('handles same CTC (no hike)', () => {
    const result = calculateSalaryHike(1200000, 1200000, 'metro');
    expect(result.hikePct).toBe(0);
    expect(result.monthlyIncrease).toBeCloseTo(0, 0);
  });

  it('handles salary decrease', () => {
    const result = calculateSalaryHike(1500000, 1200000, 'metro');
    expect(result.hikePct).toBeLessThan(0);
    expect(result.monthlyIncrease).toBeLessThan(0);
  });

  it('includes breakdown objects', () => {
    const result = calculateSalaryHike(1200000, 1500000, 'metro');
    expect(result.currentBreakdown).toBeDefined();
    expect(result.newBreakdown).toBeDefined();
    expect(result.currentBreakdown.annualCTC).toBe(1200000);
    expect(result.newBreakdown.annualCTC).toBe(1500000);
  });

  it('large hike shows progressive tax impact', () => {
    const result = calculateSalaryHike(1000000, 3000000, 'metro');
    expect(result.hikePct).toBe(200);
    expect(result.effectiveHikePct).toBeLessThan(200);
    expect(result.effectiveHikePct).toBeGreaterThan(100);
  });
});

describe('PROFESSIONAL_TAX_BY_STATE', () => {
  it('has entries for major states', () => {
    expect(PROFESSIONAL_TAX_BY_STATE['maharashtra']).toBeDefined();
    expect(PROFESSIONAL_TAX_BY_STATE['karnataka']).toBeDefined();
    expect(PROFESSIONAL_TAX_BY_STATE['delhi']).toBeDefined();
    expect(PROFESSIONAL_TAX_BY_STATE['tamil-nadu']).toBeDefined();
  });

  it('no state exceeds constitutional max of 2500', () => {
    for (const [, data] of Object.entries(PROFESSIONAL_TAX_BY_STATE)) {
      expect(data.annual).toBeLessThanOrEqual(2500);
    }
  });

  it('states that dont levy PT have annual=0', () => {
    expect(PROFESSIONAL_TAX_BY_STATE['delhi'].annual).toBe(0);
    expect(PROFESSIONAL_TAX_BY_STATE['haryana'].annual).toBe(0);
    expect(PROFESSIONAL_TAX_BY_STATE['uttar-pradesh'].annual).toBe(0);
    expect(PROFESSIONAL_TAX_BY_STATE['rajasthan'].annual).toBe(0);
  });
});

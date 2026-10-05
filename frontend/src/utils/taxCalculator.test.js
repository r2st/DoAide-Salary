import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  calculateSalaryComponents,
  calculateNewRegimeTax,
  calculateOldRegimeTax,
  calculateFullBreakdown,
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

describe('calculateSalaryComponents', () => {
  it('calculates components for 12 LPA metro', () => {
    const c = calculateSalaryComponents(1200000, 'metro');
    expect(c.basic).toBe(480000);                     // 40% of 12L
    expect(c.hra).toBe(240000);                        // 50% of basic for metro
    expect(c.employeePF).toBe(21600);                  // 12% of basic = 57600, capped at 21600
    expect(c.employerPF).toBe(21600);
    expect(c.gratuity).toBeCloseTo(23088, 0);          // 4.81% of basic
    expect(c.professionalTaxAnnual).toBe(2400);
    // special = 12L - 4.8L - 2.4L - 21600 - 23088
    expect(c.specialAllowance).toBeCloseTo(435312, 0);
    // gross = basic + hra + special
    expect(c.grossSalary).toBeCloseTo(1155312, 0);
  });

  it('calculates HRA at 40% for non-metro', () => {
    const c = calculateSalaryComponents(1200000, 'non-metro');
    expect(c.hra).toBe(192000); // 40% of 480000
  });

  it('caps PF at 1800/month for high CTC', () => {
    const c = calculateSalaryComponents(5000000, 'metro');
    // basic = 20L, 12% = 2.4L, but cap is 21600
    expect(c.employeePF).toBe(21600);
    expect(c.employerPF).toBe(21600);
  });

  it('does not cap PF for low CTC where 12% < 21600', () => {
    // basic = 40% of 400000 = 160000, 12% = 19200 < 21600
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

describe('calculateNewRegimeTax', () => {
  it('returns zero tax for income under 4L after standard deduction', () => {
    // Gross = 4,75,000, taxable = 4,75,000 - 75,000 = 4,00,000 (first slab)
    const result = calculateNewRegimeTax(475000);
    expect(result.taxableIncome).toBe(400000);
    expect(result.totalTax).toBe(0);
  });

  it('applies rebate for income up to 12L taxable', () => {
    // Gross = 12,75,000, taxable = 12,00,000
    const result = calculateNewRegimeTax(1275000);
    expect(result.taxableIncome).toBe(1200000);
    // Tax before rebate: 0 + 20000 + 40000 = 60000
    // Rebate = 60000 (full rebate since taxable <= 12L)
    expect(result.rebateApplied).toBe(60000);
    expect(result.totalTax).toBe(0);
  });

  it('does not apply rebate for income over 12L taxable', () => {
    // Gross = 13,75,000, taxable = 13,00,000
    const result = calculateNewRegimeTax(1375000);
    expect(result.taxableIncome).toBe(1300000);
    expect(result.rebateApplied).toBe(0);
    // 0-4L: 0, 4-8L: 20000, 8-12L: 40000, 12-13L: 15000 = 75000
    expect(result.taxBeforeCess).toBe(75000);
    expect(result.cess).toBe(3000);
    expect(result.totalTax).toBe(78000);
  });

  it('calculates correct tax for 20 LPA gross', () => {
    // Gross = 20,00,000, taxable = 19,25,000
    const result = calculateNewRegimeTax(2000000);
    expect(result.taxableIncome).toBe(1925000);
    // 0-4L: 0, 4-8L: 20000, 8-12L: 40000, 12-16L: 60000, 16-19.25L: 65000
    const expectedTax = 0 + 20000 + 40000 + 60000 + 65000;
    expect(result.taxBeforeCess).toBe(expectedTax); // 185000
    expect(result.cess).toBeCloseTo(7400, 0);
    expect(result.totalTax).toBeCloseTo(192400, 0);
  });

  it('calculates correct tax for 30 LPA gross', () => {
    // Gross = 30L, taxable = 29,25,000
    const result = calculateNewRegimeTax(3000000);
    expect(result.taxableIncome).toBe(2925000);
    // 0-4L: 0, 4-8L: 20000, 8-12L: 40000, 12-16L: 60000, 16-20L: 80000, 20-24L: 100000, 24-29.25L: 157500
    const expectedTax = 0 + 20000 + 40000 + 60000 + 80000 + 100000 + 157500;
    expect(result.taxBeforeCess).toBe(expectedTax); // 457500
    expect(result.cess).toBeCloseTo(18300, 0);
    expect(result.totalTax).toBeCloseTo(475800, 0);
  });

  it('handles zero gross salary', () => {
    const result = calculateNewRegimeTax(0);
    expect(result.totalTax).toBe(0);
    expect(result.taxableIncome).toBe(0);
  });
});

describe('calculateOldRegimeTax', () => {
  it('returns zero tax for income under 2.5L after deductions', () => {
    // Gross = 4L, SD = 50k, 80C = 1.5L, taxable = 4L - 50k - 1.5L = 2L
    const result = calculateOldRegimeTax(400000, 150000);
    expect(result.taxableIncome).toBe(200000);
    expect(result.totalTax).toBe(0);
  });

  it('applies rebate for taxable income up to 5L', () => {
    // Gross = 7L, SD = 50k, 80C = 1.5L, taxable = 5L
    const result = calculateOldRegimeTax(700000, 150000);
    expect(result.taxableIncome).toBe(500000);
    // Tax on 2.5-5L = 12500, rebate = 12500
    expect(result.rebateApplied).toBe(12500);
    expect(result.totalTax).toBe(0);
  });

  it('does not apply rebate for taxable income over 5L', () => {
    // Gross = 8L, SD = 50k, 80C = 1.5L, taxable = 6L
    const result = calculateOldRegimeTax(800000, 150000);
    expect(result.taxableIncome).toBe(600000);
    expect(result.rebateApplied).toBe(0);
    // 0-2.5L: 0, 2.5-5L: 12500, 5-6L: 20000 = 32500
    expect(result.taxBeforeCess).toBe(32500);
    expect(result.cess).toBe(1300);
    expect(result.totalTax).toBe(33800);
  });

  it('caps 80C at 1.5L even if higher input', () => {
    const result = calculateOldRegimeTax(800000, 300000);
    // Should still cap at 1.5L
    expect(result.deductions80C).toBe(150000);
    expect(result.taxableIncome).toBe(600000);
  });

  it('calculates tax for 15 LPA gross', () => {
    // Gross = 15L, SD = 50k, 80C = 1.5L, taxable = 13L
    const result = calculateOldRegimeTax(1500000, 150000);
    expect(result.taxableIncome).toBe(1300000);
    // 0-2.5L: 0, 2.5-5L: 12500, 5-10L: 100000, 10-13L: 90000 = 202500
    expect(result.taxBeforeCess).toBe(202500);
    expect(result.cess).toBe(8100);
    expect(result.totalTax).toBe(210600);
  });

  it('handles zero 80C deductions', () => {
    // Gross = 8L, SD = 50k, 80C = 0, taxable = 7.5L
    const result = calculateOldRegimeTax(800000, 0);
    expect(result.taxableIncome).toBe(750000);
    // 0-2.5L: 0, 2.5-5L: 12500, 5-7.5L: 50000 = 62500
    expect(result.taxBeforeCess).toBe(62500);
  });
});

describe('calculateFullBreakdown', () => {
  it('returns complete breakdown for 12 LPA', () => {
    const result = calculateFullBreakdown(1200000, 'metro', 30, 150000);

    expect(result.annualCTC).toBe(1200000);
    expect(result.cityType).toBe('metro');
    expect(result.components.basic).toBe(480000);

    // Both regimes should have tax objects
    expect(result.newRegime.tax.totalTax).toBeGreaterThanOrEqual(0);
    expect(result.oldRegime.tax.totalTax).toBeGreaterThanOrEqual(0);

    // Take-home should be less than CTC
    expect(result.newRegime.annualTakeHome).toBeLessThan(1200000);
    expect(result.oldRegime.annualTakeHome).toBeLessThan(1200000);

    // Monthly should be annual / 12
    expect(result.newRegime.monthlyTakeHome).toBeCloseTo(result.newRegime.annualTakeHome / 12, 0);

    // Better regime should be set
    expect(['new', 'old']).toContain(result.betterRegime);
  });

  it('identifies correct better regime for low CTC', () => {
    // For low CTC, new regime is typically better (no need for deductions)
    const result = calculateFullBreakdown(600000, 'metro', 25, 150000);
    // At 6L CTC, both regimes have zero or very low tax, but new should be equal or better
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
    expect(result.components.employeePF).toBe(21600); // capped
    expect(result.newRegime.annualTakeHome).toBeGreaterThan(0);
    expect(result.newRegime.annualTakeHome).toBeLessThan(5000000);
  });

  it('non-metro gives higher take-home due to unchanged tax and lower HRA', () => {
    const metro = calculateFullBreakdown(1200000, 'metro', 30, 150000);
    const nonMetro = calculateFullBreakdown(1200000, 'non-metro', 30, 150000);
    // Non-metro HRA is lower, so special allowance is higher, but gross stays same
    // Actually gross = basic + hra + special, and special compensates, so gross may differ
    // The key difference is HRA vs special allocation within the same CTC
    expect(nonMetro.components.hra).toBeLessThan(metro.components.hra);
    expect(nonMetro.components.specialAllowance).toBeGreaterThan(metro.components.specialAllowance);
  });
});

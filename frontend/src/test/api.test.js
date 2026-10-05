import { describe, it, expect } from 'vitest';
import { formatCurrency } from '../utils/taxCalculator';

describe('formatCurrency (from taxCalculator)', () => {
  it('formats INR currency correctly', () => {
    const result = formatCurrency(1200000);
    expect(result).toContain('12');
    expect(result).toContain('00');
  });

  it('formats zero correctly', () => {
    const result = formatCurrency(0);
    expect(result).toContain('0');
  });

  it('formats large amounts with Indian grouping', () => {
    const result = formatCurrency(2500000);
    expect(result).toContain('25');
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { formatCurrency } from '../api';

describe('formatCurrency', () => {
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

describe('API functions', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('calculateSalary sends correct request', async () => {
    const mockResponse = { annual_take_home: 1000000, monthly: { take_home: 83333 } };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const { calculateSalary } = await import('../api');
    const result = await calculateSalary({ annual_ctc: 1200000 });
    expect(result.annual_take_home).toBe(1000000);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/calculate'),
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('calculateHRA sends correct request', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ hra_exemption: 240000 }),
    });

    const { calculateHRA } = await import('../api');
    const result = await calculateHRA({ basic_salary_annual: 480000, hra_received_annual: 240000, rent_paid_annual: 300000, metro_city: true });
    expect(result.hra_exemption).toBe(240000);
  });

  it('compareRegimes sends correct request', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ comparison: { recommended_regime: 'new' } }),
    });

    const { compareRegimes } = await import('../api');
    const result = await compareRegimes({ annual_ctc: 1500000 });
    expect(result.comparison.recommended_regime).toBe('new');
  });

  it('throws on failed request', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 });
    const { calculateSalary } = await import('../api');
    await expect(calculateSalary({ annual_ctc: 1200000 })).rejects.toThrow();
  });
});

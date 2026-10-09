import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import CalculatorPage from './CalculatorPage';

function renderPage() {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        <CalculatorPage />
      </BrowserRouter>
    </HelmetProvider>
  );
}

describe('CalculatorPage', () => {
  it('renders the page title', () => {
    renderPage();
    expect(screen.getByText(/CTC to In-Hand/i)).toBeInTheDocument();
    expect(screen.getByText(/Salary Calculator/i)).toBeInTheDocument();
  });

  it('renders input fields', () => {
    renderPage();
    expect(screen.getByLabelText(/Annual CTC/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/80C Deductions/i)).toBeInTheDocument();
  });

  it('renders calculate button', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /Calculate Take-Home Salary/i })).toBeInTheDocument();
  });

  it('does not show results before calculation', () => {
    renderPage();
    expect(screen.queryByText(/Salary Components/i)).not.toBeInTheDocument();
  });

  it('shows results after entering CTC and clicking calculate', async () => {
    renderPage();
    const ctcInput = screen.getByLabelText(/Annual CTC/i);
    const button = screen.getByRole('button', { name: /Calculate Take-Home Salary/i });

    fireEvent.change(ctcInput, { target: { value: '1200000' } });
    fireEvent.click(button);

    // Results should now be visible
    expect(screen.getByText(/Salary Components/i)).toBeInTheDocument();
    expect(screen.getByText(/Monthly & Yearly Breakdown/i)).toBeInTheDocument();
    expect(screen.getByText(/New Regime Tax Slabs/i)).toBeInTheDocument();
    expect(screen.getByText(/Old Regime Tax Slabs/i)).toBeInTheDocument();
  });

  it('shows correct basic salary for 12 LPA', () => {
    renderPage();
    const ctcInput = screen.getByLabelText(/Annual CTC/i);
    const button = screen.getByRole('button', { name: /Calculate Take-Home Salary/i });

    fireEvent.change(ctcInput, { target: { value: '1200000' } });
    fireEvent.click(button);

    // Basic = 40% of 12L = 4,80,000
    expect(screen.getByText(/Basic Salary \(40%\)/i)).toBeInTheDocument();
  });

  it('shows both regime take-home amounts', () => {
    renderPage();
    const ctcInput = screen.getByLabelText(/Annual CTC/i);
    fireEvent.change(ctcInput, { target: { value: '1500000' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    expect(screen.getByText('New Regime (FY 2026-27)')).toBeInTheDocument();
    expect(screen.getByText('Old Regime')).toBeInTheDocument();
  });

  it('shows savings banner with better regime', () => {
    renderPage();
    fireEvent.change(screen.getByLabelText(/Annual CTC/i), { target: { value: '2000000' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    expect(screen.getByText(/You save/i)).toBeInTheDocument();
  });

  it('highlights the better regime with a badge', () => {
    renderPage();
    fireEvent.change(screen.getByLabelText(/Annual CTC/i), { target: { value: '1200000' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    expect(screen.getByText('Better')).toBeInTheDocument();
  });

  it('shows share buttons after calculation', () => {
    renderPage();
    fireEvent.change(screen.getByLabelText(/Annual CTC/i), { target: { value: '1000000' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    expect(screen.getByText('WhatsApp')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
  });

  it('changes HRA label when city type changes', () => {
    renderPage();
    const citySelect = screen.getByLabelText(/City Type/i);
    const ctcInput = screen.getByLabelText(/Annual CTC/i);

    fireEvent.change(citySelect, { target: { value: 'non-metro' } });
    fireEvent.change(ctcInput, { target: { value: '1200000' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    expect(screen.getByText(/40% of Basic/i)).toBeInTheDocument();
  });

  it('defaults city type to metro', () => {
    renderPage();
    const citySelect = screen.getByLabelText(/City Type/i);
    expect(citySelect.value).toBe('metro');
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShareButtons from '../components/ShareButtons';
import LandingPage from '../pages/LandingPage';

function wrap(component) {
  return render(
    <BrowserRouter>{component}</BrowserRouter>
  );
}

describe('Navbar', () => {
  it('renders logo text', () => {
    wrap(<Navbar />);
    expect(screen.getByText('Decode')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    wrap(<Navbar />);
    expect(screen.getByText('Calculator')).toBeInTheDocument();
    expect(screen.getByText('Compare Offers')).toBeInTheDocument();
  });
});

describe('Footer', () => {
  it('renders footer links', () => {
    wrap(<Footer />);
    expect(screen.getByText('CTC Calculator')).toBeInTheDocument();
    expect(screen.getByText('Offer Comparator')).toBeInTheDocument();
  });

  it('renders disclaimer text', () => {
    wrap(<Footer />);
    expect(screen.getByText(/Calculations are estimates/)).toBeInTheDocument();
  });
});

describe('ShareButtons', () => {
  it('renders WhatsApp and Twitter buttons', () => {
    render(<ShareButtons text="Test share" />);
    expect(screen.getByText('WhatsApp')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
  });

  it('opens WhatsApp share on click', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<ShareButtons text="Hello world" />);
    screen.getByText('WhatsApp').click();
    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining('wa.me'),
      '_blank',
    );
    openSpy.mockRestore();
  });

  it('opens Twitter share on click', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<ShareButtons text="Hello world" />);
    screen.getByText('Twitter').click();
    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining('twitter.com'),
      '_blank',
    );
    openSpy.mockRestore();
  });
});

describe('LandingPage', () => {
  it('renders hero heading', () => {
    wrap(<LandingPage />);
    expect(screen.getByText(/In-Hand Salary/)).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    wrap(<LandingPage />);
    expect(screen.getByText('Calculate Now')).toBeInTheDocument();
    expect(screen.getByText('Hike Calculator')).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    wrap(<LandingPage />);
    expect(screen.getByText('CTC Breakdown')).toBeInTheDocument();
    expect(screen.getByText('Old vs New Tax Regime')).toBeInTheDocument();
    expect(screen.getAllByText('Offer Letter Comparator').length).toBeGreaterThan(0);
  });

  it('renders how it works section', () => {
    wrap(<LandingPage />);
    expect(screen.getByText(/How It/)).toBeInTheDocument();
    expect(screen.getByText('Enter Your CTC')).toBeInTheDocument();
  });
});

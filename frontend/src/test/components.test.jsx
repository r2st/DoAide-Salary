import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShareButtons from '../components/ShareButtons';
import Home from '../pages/Home';
import Blog from '../pages/Blog';

function wrap(component) {
  return render(
    <HelmetProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </HelmetProvider>
  );
}

describe('Navbar', () => {
  it('renders logo text', () => {
    wrap(<Navbar />);
    expect(screen.getByText('Aide Salary')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    wrap(<Navbar />);
    expect(screen.getByText('Calculator')).toBeInTheDocument();
    expect(screen.getByText('Compare')).toBeInTheDocument();
    expect(screen.getByText('HRA')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });
});

describe('Footer', () => {
  it('renders footer links', () => {
    wrap(<Footer />);
    expect(screen.getByText('CTC Calculator')).toBeInTheDocument();
    expect(screen.getByText('Tax Comparator')).toBeInTheDocument();
    expect(screen.getByText('Embed')).toBeInTheDocument();
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

describe('Home page', () => {
  it('renders hero heading', () => {
    wrap(<Home />);
    expect(screen.getByText(/Take-Home Salary/)).toBeInTheDocument();
  });

  it('renders CTA button', () => {
    wrap(<Home />);
    expect(screen.getByText('Calculate Now')).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    wrap(<Home />);
    expect(screen.getByText('CTC Breakdown')).toBeInTheDocument();
    expect(screen.getByText('Old vs New Regime')).toBeInTheDocument();
    expect(screen.getByText('HRA Exemption')).toBeInTheDocument();
  });
});

describe('Blog page', () => {
  it('renders all blog articles', () => {
    wrap(<Blog />);
    expect(screen.getByText(/Salary Negotiation Tips/)).toBeInTheDocument();
    expect(screen.getByText(/Old vs New Tax Regime/)).toBeInTheDocument();
    expect(screen.getByText(/HRA Exemption/)).toBeInTheDocument();
  });
});

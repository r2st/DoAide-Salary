import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import CalculatorPage from './pages/CalculatorPage';
import ComparatorPage from './pages/ComparatorPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 200px)' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/compare" element={<ComparatorPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

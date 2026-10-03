import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Compare from './pages/Compare';
import HRA from './pages/HRA';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import Embed from './pages/Embed';

export default function App() {
  const isEmbed = new URLSearchParams(window.location.search).get('widget') === 'true';

  if (isEmbed) {
    return (
      <HelmetProvider>
        <Embed />
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 200px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/hra" element={<HRA />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/embed" element={<Embed />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}

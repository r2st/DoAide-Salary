import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const articles = [
  {
    slug: 'salary-negotiation-tips',
    title: '10 Salary Negotiation Tips Every Indian Professional Should Know',
    excerpt: 'Master the art of salary negotiation with these proven strategies. From understanding your CTC structure to negotiating beyond base pay.',
    date: 'October 2024',
    readTime: '8 min read',
  },
  {
    slug: 'old-vs-new-tax-regime',
    title: 'Old vs New Tax Regime FY 2026-27: Complete Guide with Examples',
    excerpt: 'Detailed comparison of old and new income tax regime with real calculations. Find out which regime is better for your salary bracket.',
    date: 'Updated April 2026',
    readTime: '10 min read',
  },
  {
    slug: 'hra-exemption-guide',
    title: 'HRA Exemption: How to Calculate and Claim Maximum Tax Benefit',
    excerpt: 'Everything you need to know about HRA exemption — eligibility, calculation formula, required documents, and common mistakes to avoid.',
    date: 'October 2024',
    readTime: '7 min read',
  },
];

export { articles };

export default function Blog() {
  return (
    <div className="page">
      <SEO
        title="Salary & Tax Blog"
        description="Expert guides on salary negotiation, tax planning FY 2026-27, HRA exemption, and financial planning for Indian professionals."
        path="/blog"
      />
      <h1 className="page-title">Salary & Tax <span className="accent-text">Blog</span></h1>
      <p className="page-subtitle">Expert guides for Indian professionals</p>

      <div className="blog-list">
        {articles.map((article) => (
          <Link to={`/blog/${article.slug}`} key={article.slug} style={{ textDecoration: 'none' }}>
            <div className="blog-card">
              <div className="blog-meta">{article.date} &middot; {article.readTime}</div>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

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
  {
    slug: 'ctc-vs-in-hand-salary',
    title: 'CTC vs In-Hand Salary 2026: How to Calculate Your Take-Home Pay',
    excerpt: 'Understand the difference between CTC and in-hand salary with a step-by-step calculation guide. Learn which components reduce your take-home pay and how to maximize it.',
    date: 'October 2026',
    readTime: '9 min read',
  },
  {
    slug: 'salary-slip-components-explained',
    title: 'Salary Slip Components Explained: Basic, HRA, DA, and More',
    excerpt: 'A complete guide to every component on your salary slip — from basic pay and HRA to PF, professional tax, and gratuity. Know what each line item means for your finances.',
    date: 'October 2026',
    readTime: '10 min read',
  },
  {
    slug: 'income-tax-on-salary-2026-27',
    title: 'Income Tax on Salary 2026-27: Complete Calculation Guide',
    excerpt: 'Step-by-step guide to calculating income tax on your salary for FY 2026-27. Covers tax slabs, deductions, TDS, and filing tips under both old and new regimes.',
    date: 'October 2026',
    readTime: '11 min read',
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

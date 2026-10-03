import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { articles } from './Blog';

const content = {
  'salary-negotiation-tips': {
    title: '10 Salary Negotiation Tips Every Indian Professional Should Know',
    body: `
      <h2>Why Salary Negotiation Matters</h2>
      <p>Most Indian professionals leave money on the table by not negotiating their salary. According to surveys, over 60% of employees in India accept the first offer without negotiating. A single successful negotiation can compound to lakhs over your career.</p>

      <h2>1. Know Your Market Value</h2>
      <p>Before any negotiation, research what your role pays in your city and industry. Use platforms like Glassdoor, AmbitionBox, and LinkedIn Salary Insights. Know the range for your experience level — if the market pays ₹12-18 LPA for your role, you have a clear anchor.</p>

      <h2>2. Understand Your CTC Structure</h2>
      <p>CTC (Cost to Company) is not your take-home salary. It includes basic, HRA, PF, gratuity, bonuses, and sometimes even insurance premiums. When negotiating, focus on the components that directly impact your in-hand salary — basic salary and special allowances.</p>

      <h2>3. Negotiate Beyond Base Pay</h2>
      <p>If the company can't budge on base salary, negotiate on other fronts: joining bonus, stock options (ESOPs), flexible work arrangements, additional leave, learning budget, or a faster review cycle. These can be worth lakhs without changing the official CTC.</p>

      <h2>4. Time Your Negotiation Right</h2>
      <p>The best time to negotiate is after receiving the offer but before accepting. During appraisals, present your case 2-3 months in advance. Never negotiate when the company is going through layoffs or cost-cutting.</p>

      <h2>5. Use the "Silence" Technique</h2>
      <p>When the recruiter names a number, don't immediately respond. A brief pause signals that you're evaluating, and often prompts them to improve the offer. Let them fill the silence.</p>

      <h2>6. Always Give a Range</h2>
      <p>Instead of a single number, give a range with your target at the lower end. For example, if you want ₹15 LPA, say "I'm looking at ₹15-18 LPA based on my research." This gives room for negotiation while anchoring at your desired number.</p>

      <h2>7. Quantify Your Impact</h2>
      <p>Come prepared with specific achievements: "I increased deployment frequency by 40%" or "My campaign generated ₹2 Cr in pipeline." Numbers make your case concrete and hard to argue against.</p>

      <h2>8. Get It in Writing</h2>
      <p>Verbal promises mean nothing. Ensure every agreed component — base salary, variable pay, joining bonus, review timeline — is documented in the offer letter. If it's not on paper, it doesn't exist.</p>

      <h2>9. Don't Reveal Your Current Salary</h2>
      <p>Many Indian companies ask for your current CTC. You're not legally obligated to share it. Redirect to your expected compensation: "Based on my skills and market rates, I'm targeting ₹X." Some states are moving toward banning salary history questions.</p>

      <h2>10. Know When to Walk Away</h2>
      <p>Having alternatives gives you leverage. Always negotiate with at least one backup option. If the offer doesn't meet your minimum after negotiation, be prepared to respectfully decline. Sometimes the best deal is the one you don't take.</p>

      <h2>Bonus: Calculate Your Real Take-Home</h2>
      <p>Use our <a href="/calculator">CTC Calculator</a> to see exactly how a salary change affects your monthly take-home. A ₹2 LPA increase in CTC might only translate to ₹10,000/month in hand after PF and tax. Know the real numbers before negotiating.</p>
    `,
  },
  'old-vs-new-tax-regime': {
    title: 'Old vs New Tax Regime 2024-25: Complete Guide with Examples',
    body: `
      <h2>Overview</h2>
      <p>Starting FY 2024-25, the new tax regime is the default for all taxpayers. You can still opt for the old regime if it benefits you. This guide breaks down both regimes with real examples to help you decide.</p>

      <h2>New Regime Tax Slabs (FY 2024-25)</h2>
      <table>
        <tr><th>Income Slab</th><th>Tax Rate</th></tr>
        <tr><td>Up to ₹3,00,000</td><td>Nil</td></tr>
        <tr><td>₹3,00,001 - ₹7,00,000</td><td>5%</td></tr>
        <tr><td>₹7,00,001 - ₹10,00,000</td><td>10%</td></tr>
        <tr><td>₹10,00,001 - ₹12,00,000</td><td>15%</td></tr>
        <tr><td>₹12,00,001 - ₹15,00,000</td><td>20%</td></tr>
        <tr><td>Above ₹15,00,000</td><td>30%</td></tr>
      </table>

      <h2>Old Regime Tax Slabs</h2>
      <table>
        <tr><th>Income Slab</th><th>Tax Rate</th></tr>
        <tr><td>Up to ₹2,50,000</td><td>Nil</td></tr>
        <tr><td>₹2,50,001 - ₹5,00,000</td><td>5%</td></tr>
        <tr><td>₹5,00,001 - ₹10,00,000</td><td>20%</td></tr>
        <tr><td>Above ₹10,00,000</td><td>30%</td></tr>
      </table>

      <h2>Key Differences</h2>
      <ul>
        <li><strong>Standard Deduction:</strong> ₹75,000 in new regime vs ₹50,000 in old</li>
        <li><strong>80C/80D:</strong> Available only in old regime (up to ₹1.5L + ₹25K)</li>
        <li><strong>HRA Exemption:</strong> Available only in old regime</li>
        <li><strong>Rebate u/s 87A:</strong> ₹25,000 for income up to ₹7L (new) vs ₹12,500 for ₹5L (old)</li>
      </ul>

      <h2>Example 1: CTC ₹8 LPA (No Deductions)</h2>
      <p>For someone earning ₹8 LPA with no investments or HRA claims:</p>
      <ul>
        <li><strong>New Regime Tax:</strong> ~₹23,400 (after standard deduction of ₹75K)</li>
        <li><strong>Old Regime Tax:</strong> ~₹44,200 (only ₹50K standard deduction)</li>
        <li><strong>Winner:</strong> New regime saves ₹20,800/year</li>
      </ul>

      <h2>Example 2: CTC ₹15 LPA (With ₹3L Deductions)</h2>
      <p>For someone earning ₹15 LPA with ₹1.5L in 80C, ₹25K in 80D, ₹1L HRA exemption:</p>
      <ul>
        <li><strong>New Regime Tax:</strong> ~₹1,04,000</li>
        <li><strong>Old Regime Tax:</strong> ~₹93,600</li>
        <li><strong>Winner:</strong> Old regime saves ₹10,400/year</li>
      </ul>

      <h2>Example 3: CTC ₹25 LPA (With Maximum Deductions)</h2>
      <p>For someone earning ₹25 LPA with ₹1.5L 80C, ₹50K 80D, ₹2L HRA, ₹50K NPS:</p>
      <ul>
        <li><strong>New Regime Tax:</strong> ~₹2,96,400</li>
        <li><strong>Old Regime Tax:</strong> ~₹2,38,680</li>
        <li><strong>Winner:</strong> Old regime saves ₹57,720/year</li>
      </ul>

      <h2>When to Choose Which?</h2>
      <h3>Choose New Regime If:</h3>
      <ul>
        <li>Your total deductions are less than ₹1.5 lakh</li>
        <li>You don't pay rent or live in your own house</li>
        <li>You haven't made investments qualifying under 80C</li>
        <li>Your CTC is below ₹10 LPA</li>
      </ul>

      <h3>Choose Old Regime If:</h3>
      <ul>
        <li>You claim HRA exemption of ₹1L+ per year</li>
        <li>You invest the full ₹1.5L in 80C instruments</li>
        <li>You have a home loan (Section 24 interest deduction)</li>
        <li>Your total deductions exceed ₹3-4 lakhs</li>
      </ul>

      <p>Not sure? Use our <a href="/compare">Tax Regime Comparator</a> to see the exact numbers for your salary.</p>
    `,
  },
  'hra-exemption-guide': {
    title: 'HRA Exemption: How to Calculate and Claim Maximum Tax Benefit',
    body: `
      <h2>What is HRA Exemption?</h2>
      <p>House Rent Allowance (HRA) is a component of your salary given to cover rent expenses. Under Section 10(13A) of the Income Tax Act, a portion of HRA can be claimed as tax-exempt if you live in rented accommodation.</p>

      <h2>Who Can Claim HRA?</h2>
      <ul>
        <li>You must be a salaried employee receiving HRA as part of your salary</li>
        <li>You must be paying rent for your accommodation</li>
        <li>You must be living in the rented accommodation (not your own house)</li>
        <li>Available only under the old tax regime</li>
      </ul>

      <h2>HRA Exemption Formula</h2>
      <p>The exempt HRA is the <strong>minimum</strong> of these three amounts:</p>
      <ol>
        <li><strong>Actual HRA received</strong> from your employer</li>
        <li><strong>50% of basic salary + DA</strong> (if in Metro: Delhi, Mumbai, Chennai, Kolkata) or <strong>40%</strong> (if non-metro)</li>
        <li><strong>Rent paid minus 10% of basic salary + DA</strong></li>
      </ol>

      <h2>Calculation Example</h2>
      <p>Let's calculate for an employee in Mumbai:</p>
      <ul>
        <li>Basic Salary: ₹40,000/month (₹4,80,000/year)</li>
        <li>HRA Received: ₹20,000/month (₹2,40,000/year)</li>
        <li>Rent Paid: ₹25,000/month (₹3,00,000/year)</li>
      </ul>

      <table>
        <tr><th>Component</th><th>Amount (Annual)</th></tr>
        <tr><td>1. Actual HRA Received</td><td>₹2,40,000</td></tr>
        <tr><td>2. 50% of Basic (Metro)</td><td>₹2,40,000</td></tr>
        <tr><td>3. Rent - 10% of Basic</td><td>₹2,52,000</td></tr>
        <tr><td><strong>HRA Exemption (Minimum)</strong></td><td><strong>₹2,40,000</strong></td></tr>
      </table>

      <h2>Documents Required</h2>
      <ul>
        <li><strong>Rent receipts</strong> — monthly receipts signed by landlord with revenue stamp (for rent &gt; ₹5,000/month)</li>
        <li><strong>Rent agreement</strong> — registered or unregistered lease deed</li>
        <li><strong>Landlord's PAN</strong> — mandatory if annual rent exceeds ₹1,00,000</li>
      </ul>

      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li><strong>Paying rent to parents?</strong> You can claim HRA if paying rent to parents, but they must declare it as rental income</li>
        <li><strong>Both spouses claiming?</strong> Only one spouse can claim HRA for the same rented property</li>
        <li><strong>Own house in different city?</strong> You can claim both HRA and home loan interest if you work in a different city from your owned property</li>
        <li><strong>Forgetting PAN?</strong> Not providing landlord's PAN for rent above ₹1L/year can lead to HRA claim rejection</li>
      </ul>

      <h2>Maximizing Your HRA Benefit</h2>
      <ol>
        <li>Restructure your salary to increase basic+HRA (talk to HR)</li>
        <li>Keep all rent receipts and agreements organized</li>
        <li>If your rent is high, negotiate for a higher HRA component in your CTC</li>
        <li>Consider the old tax regime if your HRA exemption is substantial</li>
      </ol>

      <p>Use our <a href="/hra">HRA Calculator</a> to find your exact exemption amount.</p>
    `,
  },
};

export default function BlogArticle() {
  const { slug } = useParams();
  const article = content[slug];
  const meta = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="page" style={{ textAlign: 'center' }}>
        <h1>Article Not Found</h1>
        <Link to="/blog" className="btn btn-primary" style={{ marginTop: '20px' }}>Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <SEO
        title={article.title}
        description={meta?.excerpt}
        path={`/blog/${slug}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: meta?.excerpt,
          datePublished: '2024-10-01',
          author: { '@type': 'Organization', name: 'DoAide' },
          publisher: { '@type': 'Organization', name: 'DoAide' },
        }}
      />
      <div className="blog-content">
        <Link to="/blog" style={{ fontSize: '14px' }}>&larr; Back to Blog</Link>
        <h1 style={{ fontSize: '32px', marginTop: '16px', marginBottom: '8px' }}>{article.title}</h1>
        {meta && <p className="blog-meta">{meta.date} &middot; {meta.readTime}</p>}
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
      </div>
    </div>
  );
}

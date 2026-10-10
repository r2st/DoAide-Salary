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

      <p>Also try our <a href="/hike">Salary Hike Calculator</a> to see exactly how much of a raise actually reaches your bank account.</p>
    `,
  },
  'old-vs-new-tax-regime': {
    title: 'Old vs New Tax Regime FY 2026-27: Complete Guide with Examples',
    body: `
      <h2>Overview</h2>
      <p>For FY 2026-27 (AY 2027-28), the new tax regime remains the default for all taxpayers. The tax slabs announced in Union Budget 2025 continue unchanged — Budget 2026 did not modify the rates. You can still opt for the old regime if it benefits you. This guide breaks down both regimes with real examples.</p>

      <h2>New Regime Tax Slabs (FY 2026-27)</h2>
      <table>
        <tr><th>Income Slab</th><th>Tax Rate</th></tr>
        <tr><td>Up to ₹4,00,000</td><td>Nil</td></tr>
        <tr><td>₹4,00,001 - ₹8,00,000</td><td>5%</td></tr>
        <tr><td>₹8,00,001 - ₹12,00,000</td><td>10%</td></tr>
        <tr><td>₹12,00,001 - ₹16,00,000</td><td>15%</td></tr>
        <tr><td>₹16,00,001 - ₹20,00,000</td><td>20%</td></tr>
        <tr><td>₹20,00,001 - ₹24,00,000</td><td>25%</td></tr>
        <tr><td>Above ₹24,00,000</td><td>30%</td></tr>
      </table>
      <p><strong>Standard Deduction:</strong> ₹75,000 | <strong>Rebate u/s 87A:</strong> Up to ₹60,000 for taxable income ≤ ₹12L (zero tax up to ~₹12.75L)</p>

      <h2>Old Regime Tax Slabs</h2>
      <table>
        <tr><th>Income Slab</th><th>Tax Rate</th></tr>
        <tr><td>Up to ₹2,50,000</td><td>Nil</td></tr>
        <tr><td>₹2,50,001 - ₹5,00,000</td><td>5%</td></tr>
        <tr><td>₹5,00,001 - ₹10,00,000</td><td>20%</td></tr>
        <tr><td>Above ₹10,00,000</td><td>30%</td></tr>
      </table>

      <h2>Surcharge (Both Regimes)</h2>
      <p>For high incomes, a surcharge applies on the tax amount:</p>
      <table>
        <tr><th>Total Income</th><th>Surcharge Rate</th></tr>
        <tr><td>₹50L - ₹1Cr</td><td>10%</td></tr>
        <tr><td>₹1Cr - ₹2Cr</td><td>15%</td></tr>
        <tr><td>₹2Cr - ₹5Cr</td><td>25%</td></tr>
        <tr><td>Above ₹5Cr (New Regime)</td><td>25%</td></tr>
        <tr><td>Above ₹5Cr (Old Regime)</td><td>37%</td></tr>
      </table>
      <p>Plus 4% Health & Education Cess on tax + surcharge.</p>

      <h2>Key Differences</h2>
      <ul>
        <li><strong>Standard Deduction:</strong> ₹75,000 in new regime vs ₹50,000 in old</li>
        <li><strong>80C/80D:</strong> Available only in old regime (up to ₹1.5L + ₹1L)</li>
        <li><strong>NPS 80CCD(1B):</strong> Additional ₹50,000 only in old regime</li>
        <li><strong>HRA Exemption:</strong> Available only in old regime</li>
        <li><strong>Rebate u/s 87A:</strong> ₹60,000 for income up to ₹12L (new) vs ₹12,500 for ₹5L (old)</li>
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
        <li>You contribute to NPS (additional ₹50K under 80CCD)</li>
        <li>Your total deductions exceed ₹3-4 lakhs</li>
      </ul>

      <p>Not sure? Use our <a href="/calculator">CTC Calculator</a> to see the exact numbers for your salary under both regimes.</p>
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

      <p>Use our <a href="/calculator">CTC Calculator</a> with the rent field to see your exact HRA exemption and how it affects your take-home salary.</p>
    `,
  },
  'ctc-vs-in-hand-salary': {
    title: 'CTC vs In-Hand Salary 2026: How to Calculate Your Take-Home Pay',
    body: `
      <h2>What Is CTC (Cost to Company)?</h2>
      <p>CTC, or Cost to Company, is the total amount a company spends on an employee in a year. It includes every direct and indirect benefit — from your monthly salary to the employer's contribution to your provident fund, gratuity, insurance premiums, and even meal coupons. When a recruiter offers you ₹12 LPA, that figure is typically the CTC, not the amount you will receive in your bank account each month.</p>

      <p>Understanding CTC is crucial because the gap between CTC and in-hand salary can be surprisingly large. For a ₹12 LPA CTC, your actual monthly take-home might be anywhere between ₹72,000 and ₹85,000 depending on your salary structure, tax regime, and deductions. Many first-time job seekers are caught off guard when their first salary credit is significantly lower than expected.</p>

      <h2>CTC vs In-Hand Salary: The Key Difference</h2>
      <p>Your <strong>in-hand salary</strong> (also called take-home pay or net salary) is the amount that actually gets credited to your bank account each month. It is calculated by subtracting all deductions from your gross salary. The main deductions include:</p>
      <ul>
        <li><strong>Employee Provident Fund (EPF):</strong> 12% of your basic salary, deducted every month</li>
        <li><strong>Professional Tax:</strong> ₹200/month in most states (₹2,500/year maximum)</li>
        <li><strong>Income Tax (TDS):</strong> Deducted at source based on your estimated annual income</li>
        <li><strong>Employee State Insurance (ESI):</strong> 0.75% of gross salary if your monthly wages are below ₹21,000</li>
      </ul>

      <p>On the employer's side, components like employer PF contribution (12% of basic), gratuity (4.81% of basic), and group insurance are part of CTC but never appear in your bank account. This is why CTC is always higher than in-hand salary.</p>

      <h2>Step-by-Step: How to Calculate In-Hand Salary from CTC</h2>
      <p>Let us walk through a real example for a ₹10 LPA CTC under the new tax regime (FY 2026-27):</p>

      <h3>Step 1: Break Down the CTC</h3>
      <table>
        <tr><th>Component</th><th>Annual (₹)</th><th>Monthly (₹)</th></tr>
        <tr><td>Basic Salary (40% of CTC)</td><td>4,00,000</td><td>33,333</td></tr>
        <tr><td>HRA (50% of Basic)</td><td>2,00,000</td><td>16,667</td></tr>
        <tr><td>Special Allowance</td><td>1,51,200</td><td>12,600</td></tr>
        <tr><td>Employer PF (12% of Basic)</td><td>48,000</td><td>4,000</td></tr>
        <tr><td>Gratuity (4.81% of Basic)</td><td>19,240</td><td>1,603</td></tr>
        <tr><td>Insurance Premium</td><td>6,000</td><td>500</td></tr>
        <tr><td>Meal Coupons / Other Perks</td><td>75,560</td><td>6,297</td></tr>
        <tr><td><strong>Total CTC</strong></td><td><strong>10,00,000</strong></td><td><strong>83,333</strong></td></tr>
      </table>

      <h3>Step 2: Calculate Gross Salary</h3>
      <p>Gross salary = CTC minus employer-only costs (employer PF, gratuity, insurance):</p>
      <p><strong>Gross Salary = ₹10,00,000 - ₹48,000 - ₹19,240 - ₹6,000 = ₹9,26,760</strong></p>

      <h3>Step 3: Calculate Deductions</h3>
      <table>
        <tr><th>Deduction</th><th>Annual (₹)</th></tr>
        <tr><td>Employee PF (12% of Basic)</td><td>48,000</td></tr>
        <tr><td>Professional Tax</td><td>2,500</td></tr>
        <tr><td>Income Tax (New Regime, after ₹75K std deduction)</td><td>41,600</td></tr>
        <tr><td><strong>Total Deductions</strong></td><td><strong>92,100</strong></td></tr>
      </table>

      <h3>Step 4: Calculate In-Hand Salary</h3>
      <p><strong>Annual In-Hand = ₹9,26,760 - ₹92,100 = ₹8,34,660</strong></p>
      <p><strong>Monthly In-Hand ≈ ₹69,555</strong></p>
      <p>So for a ₹10 LPA CTC, your actual monthly take-home is approximately ₹69,555 — roughly 83% of your CTC. The remaining 17% goes to PF, tax, gratuity, and insurance.</p>

      <h2>Why Your CTC and In-Hand Gap May Be Larger</h2>
      <p>Several factors can widen the gap between your CTC and in-hand salary:</p>
      <ul>
        <li><strong>Higher Basic Salary:</strong> A higher basic means more goes to PF (both employee and employer), increasing the deduction from your take-home</li>
        <li><strong>Old Tax Regime Without Sufficient Deductions:</strong> If you are in the old regime but do not claim HRA, 80C, or other exemptions, your tax burden could be higher</li>
        <li><strong>Variable Pay / Bonuses:</strong> Performance bonuses included in CTC are not guaranteed — they depend on company and individual performance</li>
        <li><strong>Retention Bonuses / ESOPs:</strong> These vest over time and are counted in CTC but not received monthly</li>
      </ul>

      <h2>How to Maximize Your In-Hand Salary</h2>
      <p>Here are practical strategies to increase the amount that reaches your bank account:</p>
      <ol>
        <li><strong>Optimize salary structure:</strong> Request a lower basic and higher special allowance to reduce PF deduction (though this lowers your retirement corpus)</li>
        <li><strong>Choose the right tax regime:</strong> Use our <a href="/calculator">CTC Calculator</a> to compare old vs new regime for your specific salary</li>
        <li><strong>Claim all eligible exemptions:</strong> Under the old regime, claim HRA, 80C (PPF, ELSS, insurance), 80D (health insurance), and NPS deductions</li>
        <li><strong>Opt for tax-free perks:</strong> Meal coupons (up to ₹50/meal), fuel reimbursements, and telephone bill reimbursements can reduce taxable income</li>
        <li><strong>Declare investments early:</strong> Submit your investment declaration at the start of the financial year so TDS is spread evenly across months</li>
      </ol>

      <h2>CTC vs In-Hand for Different Salary Levels</h2>
      <p>Here is a quick reference table showing approximate in-hand salary under the new tax regime (FY 2026-27):</p>
      <table>
        <tr><th>Annual CTC</th><th>Approx. Monthly In-Hand</th><th>In-Hand % of CTC</th></tr>
        <tr><td>₹5 LPA</td><td>₹38,000 - ₹40,000</td><td>~91%</td></tr>
        <tr><td>₹8 LPA</td><td>₹56,000 - ₹60,000</td><td>~86%</td></tr>
        <tr><td>₹10 LPA</td><td>₹68,000 - ₹72,000</td><td>~84%</td></tr>
        <tr><td>₹15 LPA</td><td>₹95,000 - ₹1,02,000</td><td>~80%</td></tr>
        <tr><td>₹20 LPA</td><td>₹1,20,000 - ₹1,30,000</td><td>~76%</td></tr>
        <tr><td>₹30 LPA</td><td>₹1,70,000 - ₹1,85,000</td><td>~72%</td></tr>
        <tr><td>₹50 LPA</td><td>₹2,60,000 - ₹2,85,000</td><td>~66%</td></tr>
      </table>
      <p>As CTC increases, the in-hand percentage drops because of progressive tax rates and higher PF contributions.</p>

      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li><strong>Comparing offers by CTC alone:</strong> Always compare the in-hand salary and benefits. A ₹12 LPA CTC with high variable pay may give you less monthly than a ₹11 LPA CTC with a better structure</li>
        <li><strong>Ignoring employer PF contribution:</strong> This is part of your CTC but goes to your PF account — it is not lost money, just illiquid</li>
        <li><strong>Not accounting for bonuses:</strong> If your CTC includes a 15% variable component, your fixed monthly salary is based on only 85% of the CTC</li>
        <li><strong>Forgetting about perks:</strong> Meal coupons, cab allowances, and gym memberships are part of CTC but not cash in hand</li>
      </ul>

      <p>Use our <a href="/calculator">CTC to In-Hand Salary Calculator</a> for an instant, accurate breakdown of your take-home pay. Compare offers side-by-side with the <a href="/compare">Offer Comparator</a>, or see how a raise translates to real money with the <a href="/hike">Salary Hike Calculator</a>.</p>

      <h2>Frequently Asked Questions</h2>
      <h3>What percentage of CTC is in-hand salary?</h3>
      <p>For most Indian employees, in-hand salary ranges from 65% to 90% of CTC. Lower salaries have a higher in-hand percentage because of lower tax rates, while higher salaries see more deductions due to progressive taxation. For a ₹10 LPA CTC, expect approximately 82-85% as take-home.</p>

      <h3>Is PF part of CTC or in-hand salary?</h3>
      <p>Employee PF contribution (12% of basic) is deducted from your gross salary, reducing your in-hand pay. Employer PF contribution (another 12%) is part of CTC but not part of your gross or in-hand salary. Both go to your EPF account for retirement.</p>

      <h3>Does CTC include bonuses?</h3>
      <p>Yes, most companies include variable pay, performance bonuses, and annual bonuses in the CTC. However, these are not guaranteed and depend on individual and company performance. Always check what percentage of your CTC is fixed versus variable.</p>

      <h3>How is in-hand salary calculated for freshers?</h3>
      <p>Freshers typically fall in the zero-tax or low-tax bracket under the new regime. For a ₹4-5 LPA CTC, the main deductions are EPF and professional tax, resulting in an in-hand salary of about 88-91% of CTC. New graduates should use our calculator to understand their exact take-home before accepting an offer.</p>
    `,
    faqs: [
      { question: 'What percentage of CTC is in-hand salary?', answer: 'For most Indian employees, in-hand salary ranges from 65% to 90% of CTC. Lower salaries have a higher in-hand percentage because of lower tax rates, while higher salaries see more deductions due to progressive taxation. For a ₹10 LPA CTC, expect approximately 82-85% as take-home.' },
      { question: 'Is PF part of CTC or in-hand salary?', answer: 'Employee PF contribution (12% of basic) is deducted from your gross salary, reducing your in-hand pay. Employer PF contribution (another 12%) is part of CTC but not part of your gross or in-hand salary. Both go to your EPF account for retirement.' },
      { question: 'Does CTC include bonuses?', answer: 'Yes, most companies include variable pay, performance bonuses, and annual bonuses in the CTC. However, these are not guaranteed and depend on individual and company performance. Always check what percentage of your CTC is fixed versus variable.' },
      { question: 'How is in-hand salary calculated for freshers?', answer: 'Freshers typically fall in the zero-tax or low-tax bracket under the new regime. For a ₹4-5 LPA CTC, the main deductions are EPF and professional tax, resulting in an in-hand salary of about 88-91% of CTC.' },
    ],
  },
  'salary-slip-components-explained': {
    title: 'Salary Slip Components Explained: Basic, HRA, DA, and More',
    body: `
      <h2>What Is a Salary Slip?</h2>
      <p>A salary slip (also called a payslip or pay stub) is a document issued by your employer every month that details your earnings, deductions, and net pay. It serves as proof of income for loan applications, visa processing, and tax filing. Understanding each component of your salary slip is essential for financial planning and ensuring you are being compensated correctly.</p>

      <p>A typical Indian salary slip has two sections: <strong>earnings</strong> (credits) and <strong>deductions</strong> (debits). The difference between total earnings and total deductions is your <strong>net pay</strong> — the amount credited to your bank account.</p>

      <h2>Earnings Components</h2>

      <h3>1. Basic Salary</h3>
      <p>Basic salary is the core component of your pay, typically 30-50% of your CTC. It is the foundation on which many other components are calculated. A higher basic salary means:</p>
      <ul>
        <li>Higher PF contribution (good for retirement savings)</li>
        <li>Higher HRA (useful if you claim HRA exemption under the old regime)</li>
        <li>Higher gratuity payout when you leave</li>
        <li>Higher taxable income (since basic is fully taxable)</li>
      </ul>
      <p>Companies often keep basic low to reduce their PF liability, but this can hurt your long-term benefits. Always check how your basic compares to industry standards.</p>

      <h3>2. House Rent Allowance (HRA)</h3>
      <p>HRA is provided to help employees cover rental housing costs. It is usually 40-50% of basic salary (50% for metro cities, 40% for non-metros). Under the <strong>old tax regime</strong>, HRA can be partially or fully exempt from tax if you pay rent and submit proof.</p>
      <p>The exempt amount is the minimum of: actual HRA received, rent paid minus 10% of basic, and 50%/40% of basic (metro/non-metro). Under the new tax regime, HRA is fully taxable regardless of rent paid. Use our <a href="/calculator">CTC Calculator</a> to see how HRA exemption affects your take-home under both regimes.</p>

      <h3>3. Dearness Allowance (DA)</h3>
      <p>DA is a cost-of-living adjustment primarily seen in government and public-sector salaries. It is revised twice a year (January and July) based on the Consumer Price Index (CPI). As of 2026, DA for central government employees stands at 55% of basic pay. In the private sector, DA is rare — most companies roll cost-of-living adjustments into annual increments or special allowances instead.</p>

      <h3>4. Special Allowance</h3>
      <p>Special allowance is a flexible, fully taxable component used to bridge the gap between your CTC and the sum of structured components (basic, HRA, PF, etc.). It has no cap and no tax exemption. Companies use this as a balancing figure — if your CTC is ₹10 LPA and structured components account for ₹8 LPA, the remaining ₹2 LPA goes here.</p>

      <h3>5. Conveyance / Transport Allowance</h3>
      <p>Previously exempt up to ₹1,600/month (₹19,200/year), transport allowance lost its separate exemption after the ₹50,000 standard deduction was introduced. Under the new regime with the ₹75,000 standard deduction, it is fully taxable. Some companies still show it as a separate line item, but it no longer carries a tax advantage for most employees.</p>

      <h3>6. Medical Allowance</h3>
      <p>Earlier, up to ₹15,000/year in medical reimbursement was tax-exempt. This exemption was replaced by the standard deduction starting FY 2018-19. If your salary slip still shows a medical allowance, it is fully taxable. Do not confuse this with health insurance premiums, which qualify for Section 80D deduction under the old regime.</p>

      <h3>7. Leave Travel Allowance (LTA)</h3>
      <p>LTA covers domestic travel expenses for you and your family. Under the old regime, it is tax-exempt for two trips in a block of four calendar years (the current block is 2026-2029). Only travel fare is exempt — accommodation, food, and shopping expenses do not qualify. LTA is taxable under the new regime.</p>

      <h3>8. Performance / Variable Pay</h3>
      <p>Variable pay includes quarterly bonuses, annual performance incentives, and commission. It is fully taxable and may be included in your CTC but paid only upon meeting targets. Always clarify the variable component percentage when evaluating a job offer — a high variable means lower guaranteed monthly income.</p>

      <h2>Deduction Components</h2>

      <h3>1. Employee Provident Fund (EPF)</h3>
      <p>EPF deduction is 12% of your basic salary (plus DA, if applicable). Your employer contributes an additional 12%, but 8.33% of the employer's share goes to the Employee Pension Scheme (EPS), capped at ₹1,250/month (on basic of ₹15,000). EPF earns a government-set interest rate (currently 8.25% for FY 2025-26). Voluntary Provident Fund (VPF) lets you contribute more than 12%, but employer interest on EPF contributions above ₹2.5 lakh/year is now taxable.</p>

      <h3>2. Professional Tax</h3>
      <p>Professional tax is a state-level tax capped at ₹2,500 per year. It varies by state — Maharashtra charges ₹200/month (₹300 in February), Karnataka charges ₹200/month, while some states like Rajasthan and Delhi do not levy it. Professional tax is deductible from taxable income under both tax regimes.</p>

      <h3>3. Tax Deducted at Source (TDS)</h3>
      <p>TDS is the income tax your employer deducts from your salary each month and deposits with the government on your behalf. The amount depends on your declared investments, chosen tax regime, and estimated annual income. Submit your investment proofs (Form 12BB) before January to ensure accurate TDS and avoid a large deduction in March.</p>

      <h3>4. Employee State Insurance (ESI)</h3>
      <p>ESI applies if your monthly gross wages are ₹21,000 or below. The employee contributes 0.75% and the employer contributes 3.25% of gross wages. ESI provides medical, sickness, maternity, and disability benefits. Most salaried professionals earning above ₹21,000/month are not covered under ESI.</p>

      <h3>5. Loan / Advance Recovery</h3>
      <p>If you have taken a salary advance or a loan from your employer, the EMI is deducted from your monthly salary. This is a post-tax deduction and does not affect your taxable income calculation.</p>

      <h2>Employer-Only Components (Part of CTC, Not on Your Payslip)</h2>
      <ul>
        <li><strong>Employer PF Contribution:</strong> 12% of basic — goes to your EPF account but does not appear as an earning on your payslip</li>
        <li><strong>Gratuity:</strong> 4.81% of basic (calculated as 15/26 × basic × years of service). You receive this only after completing 5 years with the employer</li>
        <li><strong>Group Health Insurance:</strong> The premium your employer pays for group health coverage is part of CTC but not your in-hand salary</li>
        <li><strong>Group Life Insurance / Accident Cover:</strong> Similarly included in CTC but paid directly to the insurer</li>
      </ul>

      <h2>How to Read Your Salary Slip: A Checklist</h2>
      <ol>
        <li>Verify your <strong>basic salary</strong> matches your offer letter</li>
        <li>Check that <strong>PF deduction</strong> is exactly 12% of basic</li>
        <li>Confirm <strong>professional tax</strong> matches your state's rate</li>
        <li>Ensure <strong>TDS</strong> aligns with your chosen tax regime and declared investments</li>
        <li>Cross-check <strong>gross salary</strong> = sum of all earnings</li>
        <li>Verify <strong>net pay</strong> = gross salary minus all deductions</li>
        <li>If applicable, check that <strong>HRA</strong> is the correct percentage of basic</li>
      </ol>

      <p>Want to decode your exact salary structure? Use the <a href="/calculator">SalaryDecode CTC Calculator</a> to see a detailed month-by-month breakdown. Comparing two offers? The <a href="/compare">Offer Comparator</a> puts them side by side so you can see the real difference in take-home pay.</p>

      <h2>Frequently Asked Questions</h2>
      <h3>What is the ideal basic salary percentage?</h3>
      <p>A basic salary of 40-50% of CTC strikes a good balance. A higher basic increases PF and gratuity benefits but also raises taxable income. If you are in a high tax bracket and do not need a large PF corpus, a lower basic (30-35%) with higher special allowance may increase your in-hand pay.</p>

      <h3>Can I ask my employer to change my salary structure?</h3>
      <p>Yes, many employers allow you to choose a flexible salary structure during onboarding or at the start of a financial year. You can request changes to HRA, special allowance, and NPS contribution percentages. However, basic salary and PF percentages are usually fixed per company policy and statutory requirements.</p>

      <h3>Why is my in-hand salary different every month?</h3>
      <p>Monthly variations are usually caused by TDS adjustments (especially in March when employers reconcile), professional tax differences (some states charge more in certain months), or variable pay disbursements. Statutory bonus payments in November (Diwali bonus) and leave encashment can also cause fluctuations.</p>

      <h3>Is gratuity deducted from my salary?</h3>
      <p>No. Gratuity is entirely funded by the employer and is part of your CTC but not deducted from your earnings. You receive it as a lump sum when you leave the company after completing 5 years of service. Under the Payment of Gratuity Act, the current exemption limit is ₹20 lakh.</p>
    `,
    faqs: [
      { question: 'What is the ideal basic salary percentage?', answer: 'A basic salary of 40-50% of CTC strikes a good balance. A higher basic increases PF and gratuity benefits but also raises taxable income. If you are in a high tax bracket, a lower basic (30-35%) with higher special allowance may increase your in-hand pay.' },
      { question: 'Can I ask my employer to change my salary structure?', answer: 'Yes, many employers allow you to choose a flexible salary structure during onboarding or at the start of a financial year. You can request changes to HRA, special allowance, and NPS contribution percentages. However, basic salary and PF percentages are usually fixed per company policy.' },
      { question: 'Why is my in-hand salary different every month?', answer: 'Monthly variations are usually caused by TDS adjustments (especially in March when employers reconcile), professional tax differences, or variable pay disbursements. Statutory bonus payments and leave encashment can also cause fluctuations.' },
      { question: 'Is gratuity deducted from my salary?', answer: 'No. Gratuity is entirely funded by the employer and is part of your CTC but not deducted from your earnings. You receive it as a lump sum when you leave the company after completing 5 years of service.' },
    ],
  },
  'income-tax-on-salary-2026-27': {
    title: 'Income Tax on Salary 2026-27: Complete Calculation Guide',
    body: `
      <h2>Income Tax Basics for Salaried Employees</h2>
      <p>As a salaried employee in India, income tax is your single largest deduction after PF. For FY 2026-27 (Assessment Year 2027-28), the tax rules follow the Union Budget 2025 slabs, which remain unchanged in Budget 2026. Understanding how income tax is calculated on your salary helps you plan better, choose the right tax regime, and avoid surprises when filing your return.</p>

      <p>This guide walks through the entire process — from computing your gross taxable income to calculating the final tax payable — with real numbers and practical examples.</p>

      <h2>Step 1: Determine Your Gross Salary</h2>
      <p>Your gross salary is the total of all salary components before any deductions. It includes:</p>
      <ul>
        <li>Basic salary</li>
        <li>House Rent Allowance (HRA)</li>
        <li>Dearness Allowance (DA)</li>
        <li>Special allowances</li>
        <li>Leave Travel Allowance (LTA)</li>
        <li>Bonus and commission</li>
        <li>Any other taxable perquisites</li>
      </ul>
      <p>Note: Employer contributions to PF, gratuity provision, and group insurance are part of CTC but not your gross salary. Reimbursements (for bills, travel, etc.) with valid receipts are also excluded.</p>

      <h2>Step 2: Calculate Exemptions (Old Regime Only)</h2>
      <p>Under the <strong>old tax regime</strong>, several salary components can be claimed as exempt:</p>
      <table>
        <tr><th>Exemption</th><th>Section</th><th>Maximum Limit</th></tr>
        <tr><td>HRA Exemption</td><td>10(13A)</td><td>Based on formula (rent, basic, city)</td></tr>
        <tr><td>LTA</td><td>10(5)</td><td>Actual travel fare, 2 trips per block</td></tr>
        <tr><td>Standard Deduction</td><td>16(ia)</td><td>₹50,000</td></tr>
        <tr><td>Professional Tax</td><td>16(iii)</td><td>₹2,500 (actual paid)</td></tr>
      </table>
      <p>Under the <strong>new regime</strong>, you get a ₹75,000 standard deduction and professional tax deduction, but no HRA or LTA exemption.</p>

      <h2>Step 3: Apply Deductions Under Chapter VI-A (Old Regime Only)</h2>
      <p>These deductions further reduce your taxable income under the old regime:</p>

      <h3>Section 80C — Up to ₹1,50,000</h3>
      <ul>
        <li>EPF contribution (employee's share)</li>
        <li>PPF (Public Provident Fund)</li>
        <li>ELSS (tax-saving mutual funds, 3-year lock-in)</li>
        <li>Life insurance premiums</li>
        <li>NSC (National Savings Certificates)</li>
        <li>5-year tax-saving FD</li>
        <li>Home loan principal repayment</li>
        <li>Children's tuition fees (up to 2 children)</li>
      </ul>

      <h3>Section 80D — Health Insurance</h3>
      <ul>
        <li>₹25,000 for self and family</li>
        <li>Additional ₹25,000 for parents (₹50,000 if parents are senior citizens)</li>
        <li>Maximum total: ₹1,00,000 (if both you and parents are seniors)</li>
      </ul>

      <h3>Section 80CCD(1B) — NPS</h3>
      <p>Additional ₹50,000 deduction for contributions to the National Pension System, over and above the ₹1.5L limit of 80C. This is one of the most powerful deductions available exclusively in the old regime.</p>

      <h3>Section 24(b) — Home Loan Interest</h3>
      <p>Up to ₹2,00,000 deduction on interest paid for a self-occupied property. For a let-out property, the entire interest is deductible against rental income.</p>

      <h2>Step 4: Compute Taxable Income</h2>
      <p>Taxable Income = Gross Salary − Exemptions − Deductions</p>

      <h3>Example: ₹15 LPA CTC — Old Regime</h3>
      <table>
        <tr><th>Item</th><th>Amount (₹)</th></tr>
        <tr><td>Gross Salary</td><td>13,50,000</td></tr>
        <tr><td>Less: HRA Exemption</td><td>−1,80,000</td></tr>
        <tr><td>Less: Standard Deduction</td><td>−50,000</td></tr>
        <tr><td>Less: 80C (PF + PPF + ELSS)</td><td>−1,50,000</td></tr>
        <tr><td>Less: 80D (Health Insurance)</td><td>−25,000</td></tr>
        <tr><td>Less: 80CCD(1B) NPS</td><td>−50,000</td></tr>
        <tr><td><strong>Taxable Income</strong></td><td><strong>8,95,000</strong></td></tr>
      </table>

      <h3>Example: ₹15 LPA CTC — New Regime</h3>
      <table>
        <tr><th>Item</th><th>Amount (₹)</th></tr>
        <tr><td>Gross Salary</td><td>13,50,000</td></tr>
        <tr><td>Less: Standard Deduction</td><td>−75,000</td></tr>
        <tr><td><strong>Taxable Income</strong></td><td><strong>12,75,000</strong></td></tr>
      </table>

      <h2>Step 5: Apply Tax Slabs</h2>

      <h3>New Regime Calculation (₹12,75,000 taxable)</h3>
      <table>
        <tr><th>Slab</th><th>Rate</th><th>Tax (₹)</th></tr>
        <tr><td>Up to ₹4,00,000</td><td>0%</td><td>0</td></tr>
        <tr><td>₹4,00,001 − ₹8,00,000</td><td>5%</td><td>20,000</td></tr>
        <tr><td>₹8,00,001 − ₹12,00,000</td><td>10%</td><td>40,000</td></tr>
        <tr><td>₹12,00,001 − ₹12,75,000</td><td>15%</td><td>11,250</td></tr>
        <tr><td><strong>Total Tax</strong></td><td></td><td><strong>71,250</strong></td></tr>
        <tr><td>Less: Rebate u/s 87A</td><td></td><td>0 (income > ₹12L)</td></tr>
        <tr><td>Add: 4% Cess</td><td></td><td>2,850</td></tr>
        <tr><td><strong>Tax Payable</strong></td><td></td><td><strong>74,100</strong></td></tr>
      </table>

      <h3>Old Regime Calculation (₹8,95,000 taxable)</h3>
      <table>
        <tr><th>Slab</th><th>Rate</th><th>Tax (₹)</th></tr>
        <tr><td>Up to ₹2,50,000</td><td>0%</td><td>0</td></tr>
        <tr><td>₹2,50,001 − ₹5,00,000</td><td>5%</td><td>12,500</td></tr>
        <tr><td>₹5,00,001 − ₹8,95,000</td><td>20%</td><td>79,000</td></tr>
        <tr><td><strong>Total Tax</strong></td><td></td><td><strong>91,500</strong></td></tr>
        <tr><td>Add: 4% Cess</td><td></td><td>3,660</td></tr>
        <tr><td><strong>Tax Payable</strong></td><td></td><td><strong>95,160</strong></td></tr>
      </table>

      <p><strong>Verdict for ₹15 LPA:</strong> New regime saves ₹21,060 in this scenario. However, if your deductions exceed ₹4.5 lakhs (possible with a home loan), the old regime becomes better. Use our <a href="/calculator">CTC Calculator</a> to model your exact scenario.</p>

      <h2>Step 6: Understanding TDS on Salary</h2>
      <p>Your employer deducts TDS (Tax Deducted at Source) from your monthly salary based on your estimated annual income and declared investments. Here is how TDS works:</p>
      <ol>
        <li>At the start of the year, you submit an investment declaration (planned investments under 80C, 80D, etc.)</li>
        <li>Your employer computes estimated annual tax and divides it by 12 for monthly TDS</li>
        <li>By January-February, you submit actual investment proofs (Form 12BB)</li>
        <li>If actual investments are lower than declared, the shortfall is recovered in February-March TDS</li>
        <li>Your employer issues Form 16 by June 15 with the full TDS details</li>
      </ol>

      <p><strong>Pro tip:</strong> Declare investments conservatively at the start and update as you actually invest. Over-declaring leads to a massive March TDS deduction that can wipe out your bonus.</p>

      <h2>Step 7: Filing Your Income Tax Return</h2>
      <p>Even if your employer has deducted TDS correctly, you must file an ITR if your gross income exceeds ₹3 lakh (new regime) or ₹2.5 lakh (old regime). Key deadlines for FY 2026-27:</p>
      <ul>
        <li><strong>July 31, 2027:</strong> Last date for filing ITR without penalty</li>
        <li><strong>December 31, 2027:</strong> Belated return (₹5,000 penalty if income > ₹5L)</li>
        <li><strong>March 31, 2028:</strong> Last date for updated return (with additional tax)</li>
      </ul>

      <h2>Surcharge for High-Income Earners</h2>
      <p>If your total income exceeds ₹50 lakh, an additional surcharge applies on the tax amount:</p>
      <table>
        <tr><th>Total Income</th><th>Surcharge</th></tr>
        <tr><td>₹50L − ₹1Cr</td><td>10%</td></tr>
        <tr><td>₹1Cr − ₹2Cr</td><td>15%</td></tr>
        <tr><td>₹2Cr − ₹5Cr</td><td>25%</td></tr>
        <tr><td>Above ₹5Cr (New Regime)</td><td>25%</td></tr>
        <tr><td>Above ₹5Cr (Old Regime)</td><td>37%</td></tr>
      </table>
      <p>Plus 4% Health & Education Cess on tax + surcharge. A marginal relief provision ensures your post-tax income does not drop below what it would be at the threshold.</p>

      <h2>Tax-Saving Strategies for Salaried Employees</h2>
      <ol>
        <li><strong>Max out 80C:</strong> Invest ₹1.5L in ELSS, PPF, or pay towards home loan principal — your PF contribution already counts toward this</li>
        <li><strong>Get health insurance:</strong> ₹25K deduction under 80D for self and family, plus ₹25-50K for parents</li>
        <li><strong>Contribute to NPS:</strong> Extra ₹50K deduction under 80CCD(1B) in the old regime</li>
        <li><strong>Claim HRA:</strong> If you pay rent, this can save ₹30K-₹1L+ in tax under the old regime</li>
        <li><strong>Home loan interest:</strong> ₹2L deduction under Section 24(b) for self-occupied property</li>
        <li><strong>Choose the right regime:</strong> Do not default blindly — run the numbers for both using our <a href="/calculator">Calculator</a></li>
      </ol>

      <p>For a detailed, personalized tax estimate, use the <a href="/calculator">SalaryDecode CTC Calculator</a>. It computes your exact tax liability under both regimes, shows a month-by-month salary breakdown, and recommends the regime that saves you more money. Compare offers and their tax impact using the <a href="/compare">Offer Comparator</a>.</p>

      <h2>Frequently Asked Questions</h2>
      <h3>Which tax regime is better for a ₹10 LPA salary?</h3>
      <p>For ₹10 LPA, the new regime is usually better unless you have deductions exceeding ₹3.75 lakh (e.g., full 80C + HRA + NPS). Under the new regime, with the standard deduction and rebate, your tax liability could be as low as ₹23,400, whereas the old regime starts at ₹5% on income above ₹2.5 lakh.</p>

      <h3>How much tax do I save by investing in NPS?</h3>
      <p>Under the old regime, a ₹50,000 NPS contribution under 80CCD(1B) saves tax based on your top slab rate. If you are in the 30% bracket, you save approximately ₹15,600 (₹50,000 × 30% + 4% cess). This is over and above the ₹1.5L limit of 80C.</p>

      <h3>Can I change my tax regime mid-year?</h3>
      <p>Salaried employees can switch between old and new regime every financial year while filing their ITR. However, you must inform your employer about your chosen regime at the beginning of the year for accurate TDS calculation. You can switch at the time of filing if you find the other regime more beneficial.</p>

      <h3>What happens if I do not file my ITR?</h3>
      <p>If your income exceeds the basic exemption limit and you do not file, you face a penalty of up to ₹5,000 under Section 234F. You also lose the ability to carry forward losses, and the tax department may issue a notice. Filing on time also lets you claim any TDS refund you are owed.</p>
    `,
    faqs: [
      { question: 'Which tax regime is better for a ₹10 LPA salary?', answer: 'For ₹10 LPA, the new regime is usually better unless you have deductions exceeding ₹3.75 lakh. Under the new regime, with the standard deduction and rebate, your tax liability could be as low as ₹23,400.' },
      { question: 'How much tax do I save by investing in NPS?', answer: 'Under the old regime, a ₹50,000 NPS contribution under 80CCD(1B) saves tax based on your top slab rate. If you are in the 30% bracket, you save approximately ₹15,600 (₹50,000 × 30% + 4% cess). This is over and above the ₹1.5L limit of 80C.' },
      { question: 'Can I change my tax regime mid-year?', answer: 'Salaried employees can switch between old and new regime every financial year while filing their ITR. You must inform your employer about your chosen regime at the beginning of the year for accurate TDS calculation.' },
      { question: 'What happens if I do not file my ITR?', answer: 'You face a penalty of up to ₹5,000 under Section 234F. You also lose the ability to carry forward losses, and the tax department may issue a notice. Filing on time also lets you claim any TDS refund you are owed.' },
    ],
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

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: meta?.excerpt,
    datePublished: meta?.date?.includes('2026') ? '2026-10-01' : '2024-10-01',
    dateModified: '2026-10-01',
    author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
    publisher: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com', logo: { '@type': 'ImageObject', url: 'https://salary.doaide.com/favicon.svg' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://salary.doaide.com/blog/${slug}` },
    url: `https://salary.doaide.com/blog/${slug}`,
  };

  const faqSchema = article.faqs ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  } : null;

  return (
    <div className="page">
      <SEO
        title={article.title}
        description={meta?.excerpt}
        path={`/blog/${slug}`}
        schema={blogPostingSchema}
      />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <div className="blog-content">
        <Link to="/blog" style={{ fontSize: '14px' }}>&larr; Back to Blog</Link>
        <h1 style={{ fontSize: '32px', marginTop: '16px', marginBottom: '8px' }}>{article.title}</h1>
        {meta && <p className="blog-meta">{meta.date} &middot; {meta.readTime}</p>}
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
      </div>
    </div>
  );
}

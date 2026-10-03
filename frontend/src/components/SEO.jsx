import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, path = '', schema }) {
  const siteUrl = 'https://salary.doaide.com';
  const fullTitle = title ? `${title} | DoAide Salary Calculator` : 'DoAide Salary Calculator - CTC to Take-Home Calculator India';

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'DoAide Salary Calculator',
    url: siteUrl,
    description: 'Free CTC to take-home salary calculator for Indian professionals. Compare old vs new tax regime, calculate HRA exemption, and get AI tax-saving tips.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || 'Free CTC to take-home salary calculator for Indian professionals. Calculate your in-hand salary, compare tax regimes, and get tax-saving recommendations.'} />
      <link rel="canonical" href={`${siteUrl}${path}`} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || 'Calculate your take-home salary from CTC in 10 seconds.'} />
      <meta property="og:url" content={`${siteUrl}${path}`} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || 'Calculate your take-home salary from CTC in 10 seconds.'} />
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
}

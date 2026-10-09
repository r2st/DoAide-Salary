import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, path = '', schema }) {
  const siteUrl = 'https://salary.doaide.com';
  const fullTitle = title
    ? `${title} | SalaryDecode - Free Salary Calculator India`
    : 'SalaryDecode - CTC to Take-Home Salary Calculator India FY 2026-27';
  const desc = description || 'Free CTC to take-home salary calculator for Indian professionals. Calculate your in-hand salary, compare tax regimes (FY 2026-27), and get tax-saving recommendations.';

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'SalaryDecode - CTC Calculator',
    url: siteUrl,
    description: desc,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    creator: {
      '@type': 'Organization',
      name: 'DoAide',
      url: 'https://doaide.com',
    },
  };

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DoAide',
    url: 'https://doaide.com',
    logo: `${siteUrl}/favicon.svg`,
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={`${siteUrl}${path}`} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={`${siteUrl}${path}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="SalaryDecode" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />

      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#00d4ff" />

      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
      {path === '/' && (
        <script type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </script>
      )}
    </Helmet>
  );
}

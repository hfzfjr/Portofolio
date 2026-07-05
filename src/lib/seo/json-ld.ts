export function generateJsonLd() {
  const baseUrl = 'https://hafizfajar.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: 'Hafiz Fajar',
        jobTitle: 'Informatics Student',
        url: baseUrl,
        sameAs: [
          // Add your LinkedIn and GitHub URLs here
          // 'https://linkedin.com/in/yourusername',
          // 'https://github.com/yourusername',
        ],
      },
      {
        '@type': 'WebSite',
        name: 'Hafiz Fajar Portfolio',
        url: baseUrl,
        description: 'Portfolio of Hafiz Fajar, Informatics Student at Telkom University',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return JSON.stringify(jsonLd);
}

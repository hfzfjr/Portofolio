import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';

const baseUrl = 'https://hafizfajar.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/projects'];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((lang) => [lang, `${baseUrl}/${lang}${route}`])
          ),
        },
      });
    }
  }

  return sitemap;
}

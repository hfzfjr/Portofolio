import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';
import { getAllProjectSlugs } from '@/lib/data/projects';

const baseUrl = 'https://hafizfajar.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [''];
  const projectSlugs = getAllProjectSlugs();

  const sitemap: MetadataRoute.Sitemap = [];

  // Homepage
  for (const locale of locales) {
    sitemap.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((lang) => [lang, `${baseUrl}/${lang}`])
        ),
      },
    });
  }

  // Project detail pages
  for (const locale of locales) {
    for (const slug of projectSlugs) {
      sitemap.push({
        url: `${baseUrl}/${locale}/projects/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((lang) => [lang, `${baseUrl}/${lang}/projects/${slug}`])
          ),
        },
      });
    }
  }

  return sitemap;
}

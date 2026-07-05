import type { Metadata } from "next";
import { type Locale, locales, defaultLocale } from "@/lib/i18n/config";
import Navbar from "@/components/layout/Navbar";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { generateJsonLd } from "@/lib/seo/json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const baseUrl = 'https://hafizfajar.com';

  return {
    title: dict.hero.title,
    description: dict.hero.description,
    openGraph: {
      title: dict.hero.title,
      description: dict.hero.description,
      url: `${baseUrl}/${lang}`,
      siteName: 'Hafiz Fajar Portfolio',
      locale: lang,
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        'id': `${baseUrl}/id`,
        'en': `${baseUrl}/en`,
        'x-default': `${baseUrl}/${defaultLocale}`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateJsonLd() }}
      />
      <div className="flex flex-col flex-1">
        <Navbar lang={lang as Locale} />
        {children}
      </div>
    </>
  );
}

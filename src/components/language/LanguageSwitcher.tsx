'use client';

import { usePathname } from 'next/navigation';
import { locales, defaultLocale, type Locale } from '@/lib/i18n/config';

export default function LanguageSwitcher({ currentLang }: { currentLang: Locale }) {
  const pathname = usePathname();
  
  const switchLocale = (newLocale: Locale) => {
    // Remove current locale from pathname
    const pathnameWithoutLocale = pathname.replace(`/${currentLang}`, '') || '/';
    
    // Set cookie and redirect
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    window.location.href = `/${newLocale}${pathnameWithoutLocale}`;
  };

  return (
    <div className="flex gap-2">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            currentLang === locale
              ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
              : 'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

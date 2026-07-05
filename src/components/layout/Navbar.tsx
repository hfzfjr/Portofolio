'use client';

import Link from 'next/link';
import ThemeToggle from '@/components/theme/ThemeToggle';
import LanguageSwitcher from '@/components/language/LanguageSwitcher';
import { type Locale } from '@/lib/i18n/config';
import { usePathname } from 'next/navigation';

export default function Navbar({ lang }: { lang: Locale }) {
  const pathname = usePathname();

  const navItems = [
    { key: 'home', href: `/${lang}` },
    { key: 'about', href: `/${lang}/about` },
    { key: 'projects', href: `/${lang}/projects` },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={`/${lang}`} className="font-bold text-xl hover:opacity-80 transition-opacity">
            Hafiz Fajar
          </Link>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-gray-600 dark:hover:text-gray-300 ${pathname === item.href
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-400'
                    }`}
                >
                  {item.key.charAt(0).toUpperCase() + item.key.slice(1)}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher currentLang={lang} />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

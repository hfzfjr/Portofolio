import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, locales, type Locale } from '@/lib/i18n/config';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Check if there's a cookie with the preferred locale
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value as Locale;

    // If cookie exists and is valid, use it
    if (cookieLocale && locales.includes(cookieLocale)) {
      return NextResponse.redirect(
        new URL(`/${cookieLocale}${pathname}`, request.url)
      );
    }

    // Otherwise, check the Accept-Language header
    const acceptLanguage = request.headers.get('accept-language') || '';
    const preferredLocale = acceptLanguage
      .split(',')[0]
      .split('-')[0] as Locale;

    // Use preferred locale if it's supported, otherwise use default
    const locale = locales.includes(preferredLocale) ? preferredLocale : defaultLocale;

    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc.)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};

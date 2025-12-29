import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import "./globals.css";

const locales = ['en', 'id'];

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params ?? "en";

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

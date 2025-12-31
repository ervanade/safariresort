import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

const locales = ['en', 'id'];

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params ?? "en";

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
 
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
   
  );
}

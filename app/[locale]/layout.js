import Footer from '@/components/Footer';
import Header from '@/components/header/Header';
import { Toaster } from '@/components/ui/toaster';
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
          <Header />
          {children}
          <Footer />
          <Toaster />
        </NextIntlClientProvider>
   
  );
}

import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/toaster";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import parse from "html-react-parser";
const HTMLDecoderEncoder = require("html-encoder-decoder");
const locales = ["en", "id"];

async function getData(lang) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/v1/web-settings?lang=${lang ?? "en"}`,
    {
      // cache: 'no-store',
      next: { revalidate: 3600 * 24 },
      method: "GET",
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_APP_X_API_KEY,
      },
    },
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = (await params) ?? "en";
  const { settings, navigation } = await getData(locale);
  const headScript = settings?.before_close_head || ``;
  const bodyScript = settings?.before_close_body || ``;

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale}>
      {settings?.before_close_head && (
        <>{parse(HTMLDecoderEncoder.decode(headScript))}</>
      )}

      <Header navigation={navigation || []} />
      {children}
      <Footer />
      <Toaster />
      {settings?.before_close_body && (
        <>{parse(HTMLDecoderEncoder.decode(bodyScript))}</>
      )}
    </NextIntlClientProvider>
  );
}

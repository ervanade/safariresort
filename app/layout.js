import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <link
  rel="stylesheet"
  href="//websdk.fastbooking-services.com/widgets/app.css"
/>

      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

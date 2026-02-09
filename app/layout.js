import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

      </head>
      <body>
      <NextTopLoader 
        color="#F06934"
        
      />
        {children}
      </body>
    </html>
  );
}

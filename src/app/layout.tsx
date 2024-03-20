import Link from 'next/link';
import { MyProviders } from './Providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body suppressHydrationWarning={true}>
        <MyProviders>
          <Link href="/">Home</Link>
          {children}
        </MyProviders>
      </body>
    </html>
  );
}

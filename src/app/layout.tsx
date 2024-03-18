import { MyProviders } from './Providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body suppressHydrationWarning={true}>
        <MyProviders>{children}</MyProviders>
      </body>
    </html>
  );
}

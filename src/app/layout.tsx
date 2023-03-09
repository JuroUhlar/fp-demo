import { MyFpjsProvider } from '../components/FpjsProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body>
        <MyFpjsProvider>{children}</MyFpjsProvider>
      </body>
    </html>
  );
}

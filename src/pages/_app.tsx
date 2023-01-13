import "../styles/globals.css";
import type { AppProps } from "next/app";
import { FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FpjsProvider
      loadOptions={{
        apiKey: "2UZgp3skqLzfJpFUGUrw",
        region: "eu",
        endpoint: "https://fp.jurajuhlar.eu",
      }}
    >
      <Component {...pageProps} />
    </FpjsProvider>
  );
}

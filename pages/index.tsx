import Head from "next/head";
import VisitorData from "../components/visitorData";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fingerprint Demo</title>
        <meta name="description" content="Demo for FingerprintJS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <a
          href="onePager.html"
          className="text-blue-600 underline hover:text-blue-400"
        >
          Pure HTML page demo
        </a>
      </header>
      <main className="flex items-center justify-center h-[90vh]">
        <div>
          <h1 className="text-3xl mb-4">Fingerprint JS Demo</h1>

          <div>
            <VisitorData />
          </div>
        </div>
      </main>
    </>
  );
}

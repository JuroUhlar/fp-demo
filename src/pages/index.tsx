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
        <ul className="p-10">
          <li>
            <a
              href="simple/index.html"
              className="text-blue-600 underline hover:text-blue-400"
            >
              Simple HTML demo
            </a>
          </li>
          <li>
            <a
              href="gtm/index.html"
              className="text-blue-600 underline hover:text-blue-400"
            >
              Google Tag Manager Demo
            </a>
          </li>
          <li>
            <a
              href="cloudfront/index.html"
              className="text-blue-600 underline hover:text-blue-400"
            >
              Cloudfront Demo
            </a>
          </li>
          <li>
            <a
              href="opensource/index.html"
              className="text-blue-600 underline hover:text-blue-400"
            >
              Open Source FingerprintJS Demo
            </a>
          </li>
          <li>
            <a
              href="default/index.html"
              className="text-blue-600 underline hover:text-blue-400"
            >
              Simple HTML with default domain
            </a>
          </li>
        </ul>
      </header>
      <main className="m-10">
        <div>
          <h1 className="text-3xl mb-4">Fingerprint Pro Demo</h1>
          <div>
            <VisitorData />
          </div>
        </div>
      </main>
    </>
  );
}

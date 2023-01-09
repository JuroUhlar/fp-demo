import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Fingerprint Demo</title>
        <meta name="description" content="Demo for FingerprintJS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center justify-center h-[100vh]">
        <div>
          <h1 className="text-3xl mb-4">Fingerprint JS Demo</h1>
          <p>
            <a
              href="onePager.html"
              className="text-blue-600 underline hover:text-blue-400"
            >
              Pure HTML page demo
            </a>
          </p>
        </div>
      </main>
    </>
  );
}

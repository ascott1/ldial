import Head from "next/head";
import "../styles/globals.css";
import { Inconsolata } from "@next/font/google";

const inconsolata = Inconsolata({
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ldial</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📻</text></svg>"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fff" />
      </Head>
      <main className={inconsolata.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;

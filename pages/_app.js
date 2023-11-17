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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inconsolata.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;

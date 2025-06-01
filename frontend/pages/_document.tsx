import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" type="image/png" />
      </Head>
      <title>XSocial</title>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

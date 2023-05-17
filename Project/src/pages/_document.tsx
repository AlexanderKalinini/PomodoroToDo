import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{ minWidth: "400px" }}>
        <Main />
        <div id="dialog-root"></div>
        <NextScript />
      </body>
    </Html>
  );
}

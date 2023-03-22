import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,900&display=swap"
          rel="stylesheet"
        />

        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </Head>

      <body className="bg-[#121214] font-SourceSansPro">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

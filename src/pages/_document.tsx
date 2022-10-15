import { ColorModeScript } from "@chakra-ui/react"
import { MEDUSA_BACKEND_URL } from "@lib/config"
import Document, { Head, Html, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    const uri = MEDUSA_BACKEND_URL
    const { hostname } = new URL(uri)

    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href={`//${hostname}`} crossOrigin="true" />
          <link rel="dns-prefetch" href={`//${hostname}`} />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Catamaran:wght@900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik:wght@800&display=swap"
            rel="stylesheet"
          />
          <ColorModeScript initialColorMode="dark" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

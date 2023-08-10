import "../styles/normalize.css"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import LanguageProvider from "../provider/language"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  )
}

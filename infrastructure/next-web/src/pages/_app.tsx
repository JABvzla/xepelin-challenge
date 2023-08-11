import "../axios.config"
import "../styles/normalize.css"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import LanguageProvider from "../provider/language-context"
import AuthProvider from "../provider/auth-context"
import LoaderProvider from "../provider/loader-context"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoaderProvider>
      <LanguageProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </LanguageProvider>
    </LoaderProvider>
  )
}

import "../axios.config"
import "../styles/normalize.css"
import "../styles/globals.css"
import "react-toastify/dist/ReactToastify.css"
import type { AppProps } from "next/app"
import LanguageProvider from "../provider/language-context"
import AuthProvider from "../provider/auth-context"
import LoaderProvider from "../provider/loader-context"
import { ToastContainer } from "react-toastify"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <LoaderProvider>
        <AuthProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </AuthProvider>
      </LoaderProvider>
    </LanguageProvider>
  )
}

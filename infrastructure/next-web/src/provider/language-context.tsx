import { useRouter } from "next/router"
import { createContext, useContext } from "react"
import en from "../i18n/en"
import es from "../i18n/es"

export type Language = | "es" | "en"
interface LanguageValue {
  language: Language
  setLanguage: (l: Language) => void
}
const LanguageContext = createContext<LanguageValue>({ language: "es", setLanguage: () => {} })

interface Props extends React.PropsWithChildren {}
export default function LanguageProvider(props: Props) {
  const router = useRouter()
  const { lang } = router.query
  const language: Language = ({ es: "es", en: "en" }[lang as string] as Language) || "es"
  const setLanguage = (lang: Language) => {
    if (lang === language) return
    if (lang !== "es" && lang !== "en") return
    router.query.lang = lang
    router.push(router)
  }
  const value = { language, setLanguage }
  return <LanguageContext.Provider value={value}>{props.children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)
export const useT = () => {
  const { language } = useLanguage()
  const lang = { es, en }[language]
  type LangAtribute = keyof typeof es
  return (name: LangAtribute) => lang[name] || ''
}

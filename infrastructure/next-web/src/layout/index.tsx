import Image from "next/image"
import styles from "./layout.module.css"
import { useLanguage, useT } from "@/provider/language-context"
import Link from "next/link";
import { useAuth } from "@/provider/auth-context";

interface Props extends React.PropsWithChildren {}
export default function Layout(props: Props) {
  const { language, setLanguage } = useLanguage();
  const t = useT();
  const { logout, isLoggedIn } = useAuth()
  const toggleLanguage = () => setLanguage(language === 'es'? 'en' : 'es'); 
  return (
    <div>
      <div className={styles.background}>
        <Image src="/assets/background.png" alt="background-image" fill placeholder="empty" objectFit="cover" />
      </div>
      <main className={styles.content}>
        <div>
          <Link href={'/'} className="none">
          <p className="fw-b fs-xxl fc-white">XEPELIN</p>
          <span className="fc-white">{t('title')}</span>
          </Link>
          {isLoggedIn && <button onClick={logout} className={styles.logout}>{t('logout')}</button>}
          <button onClick={toggleLanguage} className={styles.language}>{language}</button>
        </div>
        <div>
          {props.children}
        </div>
      </main>
    </div>
  )
}

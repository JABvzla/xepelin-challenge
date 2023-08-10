import Image from "next/image"
import styles from "./layout.module.css"
import { useLanguage, useT } from "@/provider/language"
import Link from "next/link";

interface Props extends React.PropsWithChildren {}
export default function Layout(props: Props) {
  const { language, setLanguage } = useLanguage();
  const t = useT();
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
          <button onClick={toggleLanguage} className={styles.language}>{language}</button>
        </div>
        <div>
          {props.children}
        </div>
      </main>
    </div>
  )
}

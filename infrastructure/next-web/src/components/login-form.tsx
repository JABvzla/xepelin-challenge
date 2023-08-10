import { useT } from "@/provider/language"
import Link from "next/link"

const LoginForm = () => {
  const t = useT()
  return (
    <div className="form">
      <label>
        {t('username')}
        <input type="text" placeholder={t('username')} name="username" />
      </label>
      <label>
        {t('password')}
        <input type="password" placeholder={t('password')} name="password" />
      </label>
      <input type="button" value={t("login")} />
      <Link href='/register'>{t('not_registered')}</Link>
    </div>
  )
}
export default LoginForm

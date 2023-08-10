import { useT } from "@/provider/language"
import Link from "next/link"

const RegisterForm = () => {
  const t = useT()
  return (
    <div className="form">
      <label>
        {t('name')}
        <input type="text" placeholder={t('name')} name="name" />
      </label>
      <label>
        {t('username')}
        <input type="text" placeholder={t('username')} name="username" />
      </label>
      <label>
        {t('password')}
        <input type="password" placeholder={t('password')} name="password" />
      </label>
      <label>
        {t('password-repeat')}
        <input type="password" placeholder={t('password-repeat')} name="password-repeat" />
      </label>
      <input type="button" value={t("register")} />
      <Link href='/login'>{t('yes-registered')}</Link>
    </div>
  )
}
export default RegisterForm

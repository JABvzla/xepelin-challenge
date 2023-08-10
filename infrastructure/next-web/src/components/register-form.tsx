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
        {t('password_repeat')}
        <input type="password" placeholder={t('password_repeat')} name="password_repeat" />
      </label>
      <input type="button" value={t("register")} />
      <Link href='/login'>{t('yes_registered')}</Link>
    </div>
  )
}
export default RegisterForm

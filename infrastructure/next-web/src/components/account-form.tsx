import { useT } from "@/provider/language"

const AccountForm = () => {
  const t = useT()
  return (
    <div className="form">
      <p className="fs-m warning">
        {t('register_account_disclaimer')}
      </p>
      <label>
        {t('account_name')}
        <input type="text" placeholder={t('account_name')} name="name" />
      </label>
      <label>
        {t('account_number')}
        <input type="number" placeholder={t('account_number')} name="number" />
      </label>
      <label>
        {t('account_balance')}
        <input type="number" placeholder={t('account_balance')} name="number" />
      </label>
      <input type="button" value={t("register_account")} />
    </div>
  )
}
export default AccountForm

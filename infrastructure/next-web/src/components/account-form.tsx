import axios from "axios"
import { useRouter } from "next/router"
import { Account } from "../../../../domain/account"
import getFormValue from "../helper/get-form-value"
import { useT } from "../provider/language-context"


interface AccountForm {
  name: Account["name"]
  number: Account["number"]
  balance: Account["balance"]
}

const AccountForm = () => {
  const t = useT()
  const router = useRouter()
  const handleRegisterAccount = async () => {
    const fields = ["name", "number", "balance"]
    const body = getFormValue<AccountForm>(fields);
    if (Object.keys(body).length !== fields.length) {
      console.log("%c⧭", "color: #aa00ff", "Todos los campos son requeridos")
      // TODO message
      return
    }
    const response = await axios.post("/account", body)
    if(response.data && response?.data) {
      router.push('/')
    }    
  }
  return (
    <div className="form">
      <p className="fs-m warning">
        {t('register_account_disclaimer')}
      </p>
      <label>
        {t('account_name')}
        <input type="text" placeholder={t('account_name')} id="name" />
      </label>
      <label>
        {t('account_number')}
        <input type="number" placeholder={t('account_number')} id="number" />
      </label>
      <label>
        {t('account_balance')}
        <input type="number" placeholder={t('account_balance')} id="balance" />
      </label>
      <input type="button" value={t("register_account")} onClick={handleRegisterAccount} />
    </div>
  )
}
export default AccountForm

import axios from "axios"
import getFormValue from "../helper/get-form-value"
import { showError, showWarning } from "../helper/toast"
import { useT } from "../provider/language-context"
import { useLoader } from "../provider/loader-context"
import { useUserDetail } from "../provider/user-detail-context"
import { Account } from "../../../../domain/account"


interface AccountForm {
  name: Account["name"]
  number: Account["number"]
  balance: Account["balance"]
}

const AccountForm = () => {
  const t = useT()
  const { hide } = useLoader()
  const { userDetail, fetchUserDetail } = useUserDetail()
  const handleRegisterAccount = async () => {
    const fields = ["name", "number", "balance"]
    const body = getFormValue<AccountForm>(fields);
    if (Object.keys(body).length !== fields.length) {
      showWarning(t("field_required"))
      return
    }
    const response = await axios.post("/account", body)
    if(response.data && response?.data) {
      fetchUserDetail()
      return;
    }
    if(response?.data?.message) {
      showError(t(response?.data?.message))
    }
    hide() 
  }
  if(!userDetail) return <></>
  if(userDetail?.account) return <></>
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

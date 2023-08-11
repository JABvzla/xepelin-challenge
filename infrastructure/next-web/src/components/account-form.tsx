import axios from "axios"
import { useRouter } from "next/router"
import { Account } from "../../../../domain/account"
import getFormValue from "../helper/get-form-value"
import { useT } from "../provider/language-context"
import { showWarning } from "../helper/toast"
import { useLoader } from "../provider/loader-context"
import { useUserDetail } from "../provider/user-detail-context"


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

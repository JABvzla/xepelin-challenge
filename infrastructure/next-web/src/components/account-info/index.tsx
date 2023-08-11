import Link from "next/link"
import { useT } from "../../provider/language-context"
import styles from "./account-info.module.css"
import { useUserDetail } from "../../provider/user-detail-context"

const AccountInfo = () => {
  const t = useT()
  const { userDetail } = useUserDetail()
  if(!userDetail?.account) return <></>
  const accountName = userDetail.account.name
  const accountNumber = userDetail.account.number
  return (
    <div className={styles.accountInfo}>
      <label>
        {t("account_name")}
        <br />
        <span className="fw-b fs-l">{accountName}</span>
      </label>
      <label>
        Nº
        <br />
        <span className="fw-b fs-l ff-serif">{accountNumber}</span>
      </label>
      <div className={styles.action}>
        <Link href="/transaction?op=deposit" className="none">
          <input type="button" value={t("transaction_deposit")} />
        </Link>
        <Link href="/transaction?op=withdraw" className="none">
          <input type="button" value={t("transaction_withdraw")} />
        </Link>
      </div>
    </div>
  )
}
export default AccountInfo

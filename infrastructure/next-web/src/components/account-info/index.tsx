import Link from "next/link"
import { useT } from "../../provider/language"
import styles from "./account-info.module.css"

const AccountInfo = () => {
  const t = useT()
  const accountName = "José Antonio Bonito de Jesús"
  const accountNumber = "12345678910112"
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
        <Link href="/deposit" className="none">
          <input type="button" value={t("account_info_deposit")} />
        </Link>
        <Link href="/withdraw" className="none">
          <input type="button" value={t("account_info_withdraw")} />
        </Link>
      </div>
    </div>
  )
}
export default AccountInfo

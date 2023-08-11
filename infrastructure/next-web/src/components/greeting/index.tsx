import { useUserDetail } from "../../provider/user-detail-context"
import { useT } from "../../provider/language-context"
import styles from "./greeting.module.css"

const Greeting = () => {
  const t = useT()
  const { userDetail } = useUserDetail()
  const balance = userDetail?.account?.balance
  const name = userDetail?.name
  if(!userDetail) return <></>
  return (
    <div className={styles.greeting}>
      <span className="fw-n fs-xl">
        {t("greeting")} {name}!
      </span>
      {Boolean(balance) && <label className="fw-b fs-m">
        {t("balance")}
        <br />
        <span className="fw-b fs-xl ff-serif">{balance}$</span>
      </label>}
    </div>
  )
}

export default Greeting

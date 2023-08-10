import { useT } from "../../provider/language"
import styles from "./greeting.module.css"

const Greeting = () => {
  const t = useT()
  const name = "Jose Bonito" // TODO: connect this
  const balance = 1000000 // TODO: connect this

  return (
    <div className={styles.greeting}>
      <span className="fw-n fs-xl">
        {t("greeting")} {name}!
      </span>
      {Boolean(balance) && <label className="fw-b fs-m">
        {t("balance")}
        <br />
        <span className="fw-b fs-xl">{balance}$</span>
      </label>}
    </div>
  )
}

export default Greeting

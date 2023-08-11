import Link from "next/link"
import { useT } from "../../provider/language-context"
import styles from "./transaction-list.module.css"
import { useUserDetail } from "../../provider/user-detail-context"
import { formatDate } from "../../helper/date-formater"

const TransactionList = () => {
  const t = useT()
  const { userDetail } = useUserDetail()
  if (!userDetail?.account) return <></>
  const { transactions } = userDetail.account
  return (
    <>
      {transactions.map((transaction, i) => (
        <div
          className={styles.transactionList}
          key={`${transaction.createdAt}${i}`}
          style={{
            backgroundColor: transaction.type === "DEPOSIT" ? "#ccc0476b" : "#ff8ac46b",
          }}
        >
          <div>
            <label className="fs-m">
              Nº<span className="fw-b ff-serif"> {transaction.id}</span>
            </label>
            <label className="fs-lg">
              {t("transaction_date")}:<span className="fw-b ff-serif"> {formatDate(transaction.createdAt)}</span>
            </label>
          </div>
          <Link href={`/transaction?op=${transaction.type}&amount=${transaction.amount}`} className={styles.repeat}>
            {t("transaction_repeat")}
          </Link>
          <label className="fs-lg">
            {t("transaction_amount")}
            <br />
            <span className="fw-b fs-xxl ff-serif">
              {transaction.type === "WITHDRAW" && "-"}
              {transaction.amount}$
            </span>
          </label>
        </div>
      ))}
    </>
  )
}
export default TransactionList

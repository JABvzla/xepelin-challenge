import { useT } from "../../provider/language"
import styles from "./transaction-list.module.css"

const transactions = [
  { id: "12378789123123789", amount: 2500, type: "DEPOSIT", date: "10-08-2023" },
  { id: "12378789123123789", amount: 1500, type: "DEPOSIT", date: "09-08-2023" },
  { id: "51231231231251567", amount: 400, type: "WITHDRAW", date: "06-08-2023" },
  { id: "51231231231251567", amount: 1000400, type: "WITHDRAW", date: "06-08-2023" },
  { id: "12378789128912355", amount: 300, type: "DEPOSIT", date: "05-08-2023"  },
  { id: "12378789123123789", amount: 425, type: "WITHDRAW", date: "05-08-2023" },
  { id: "15123123125111231", amount: 425, type: "WITHDRAW", date: "01-08-2023" },
]

const TransactionList = () => {
  const t = useT()
  return (
    <>
      {transactions.map((transaction, i) => (
        <div
          className={styles.transactionList}
          key={`${transaction.date}${i}`}
          style={{
            backgroundColor: transaction.type === "DEPOSIT" ? "#ccc0476b" : "#ff8ac46b",
          }}
        >
          <div>
            <label className="fs-m">
              Nº<span className="fw-b ff-serif">  {transaction.id}</span>
            </label>
            <label className="fs-lg">
              {t("transaction_date")}:<span className="fw-b ff-serif"> {transaction.date}</span>
            </label>
          </div>
          <label className="fs-lg">
            {t("transaction_amount")}
            <br />
            <span className="fw-b fs-xxl ff-serif">{transaction.type === 'WITHDRAW' && '-'}{transaction.amount}$</span>
          </label>
        </div>
      ))}
    </>
  )
}
export default TransactionList

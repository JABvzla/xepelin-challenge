import { useRouter } from "next/router"
import { useState } from "react"
import { TransactionType } from "../../../../domain/transaction"
import { useT } from "../provider/language-context"
import axios from "axios"

const TransactionForm = () => {
  const t = useT()
  const router = useRouter()
  const { op, amount } = router.query
  const type = typeof op === "string" ? op.toUpperCase() : "DEPOSIT"
  const initialAmount = typeof amount === "string" && !isNaN(+amount) ? +amount : 0
  const initialType: TransactionType = type === "DEPOSIT" || type === "WITHDRAWAL" ? type : "DEPOSIT"
  const [transactionAmount, setTransactionAmount] = useState<number>(initialAmount)
  const [transactionType, setTransactionType] = useState<TransactionType>(initialType)
  const onTypeChange = (e: any) => {
    setTransactionType(e.target.value)
  }
  const onAmountChange = (e: any) => {
    const newAmount = e.target.value
    if (isNaN(newAmount)) return
    setTransactionAmount(newAmount)
  }

  const handleTransaction = async () => {
    const body = { amount: transactionAmount, type: transactionType }
    const response = await axios.post("/transaction", body)
    if (response.data && response?.data) {
      // TODO SOMETHING
      console.log("%c⧭", "color: #917399", response?.data)
    }
  }

  return (
    <div className="form">
      <label>
        {t("transaction_type")}
        <select name="type" onChange={onTypeChange}>
          <option selected={transactionType === "WITHDRAWAL"} value="WITHDRAWAL">
            {t("transaction_withdrawal")}
          </option>
          <option selected={transactionType === "DEPOSIT"} value="DEPOSIT">
            {t("transaction_deposit")}
          </option>
        </select>
      </label>
      <label>
        {t("transaction_amount")}
        <input
          type="number"
          placeholder={t("transaction_amount")}
          name="amount"
          onChange={onAmountChange}
          value={transactionAmount}
        />
      </label>
      <input
        type="button"
        value={t(`transaction_${transactionType.toLocaleLowerCase()}` as any)}
        onClick={handleTransaction}
      />
    </div>
  )
}
export default TransactionForm
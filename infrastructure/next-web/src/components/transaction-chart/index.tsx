import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"
import { Line } from "react-chartjs-2"
import styles from "./transaction-chart.module.css"
import { useUserDetail } from "../../provider/user-detail-context"
import { formatDate } from "../../helper/date-formater"
import { useT } from "@/provider/language-context"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function TransactionChart() {
  const t = useT();
  const { userDetail } = useUserDetail()
  if (!userDetail?.account) return
  if (!userDetail.account.transactions?.length) return

  const { transactions } = userDetail.account
  const data = {
    labels: transactions.map((transaction) => formatDate(transaction.createdAt)),
    datasets: [
      {
        label: t('chart_title'),
        data: transactions.map((transaction) => transaction.amount),
        fill: false,
        borderColor: "#111D4A",
        backgroundColor: "#111D4A",
      },
    ],
  }

  return (
    <div className={styles.transactionChart} style={{}}>
      <Line data={data} />
    </div>
  )
}
export default TransactionChart

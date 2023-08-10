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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function TransactionChart() {
  const labels = ["January", "February", "March", "April", "May", "June", "July"]
  const data = {
    labels,
    datasets: [
      {
        label: "Cierre Mensual",
        data: labels.map(() => Math.ceil(Math.random() * 100)),
        borderColor: "#ccc047",
        backgroundColor: "#ccc047",
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

import TransactionChart from "@/components/transaction-chart"
import AccountForm from "../components/account-form"
import AccountInfo from "../components/account-info"
import Greeting from "../components/greeting"
import Layout from "../layout"
import TransactionList from "../components/transaction-list"


export default function Home() {
  const withAccount = true
  const withTransactions = true
  return (
    <>
      <Layout>
        <Greeting />
        {!withAccount && <AccountForm />}
        {withAccount && <AccountInfo />}
        {withTransactions && <TransactionChart />}
        {withTransactions && <TransactionList />}
      </Layout>
    </>
  )
}


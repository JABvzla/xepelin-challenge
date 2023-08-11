import TransactionChart from "@/components/transaction-chart"
import UserDetailProvider from "@/provider/user-detail-context"
import AccountForm from "../components/account-form"
import AccountInfo from "../components/account-info"
import Greeting from "../components/greeting"
import TransactionList from "../components/transaction-list"
import Layout from "../layout"

export default function Page() {
  return (
    <UserDetailProvider>
      <Layout>
        <Greeting  />
        <AccountForm />
        <AccountInfo />
        <TransactionChart />
        <TransactionList />
      </Layout>
    </UserDetailProvider>
  )
}
